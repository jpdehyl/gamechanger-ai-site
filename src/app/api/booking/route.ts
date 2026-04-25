import { site } from "@/content/site";

export const runtime = "nodejs";

type Body = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  pain?: unknown;
  systems?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RECIPIENTS = (process.env.BOOKING_RECIPIENTS ?? site.email)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const FROM =
  process.env.BOOKING_FROM_ADDRESS ?? "GameChanger AI <hello@gamechanger-ai.dev>";

function isString(value: unknown, min: number): value is string {
  return typeof value === "string" && value.trim().length >= min;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Submission = {
  name: string;
  email: string;
  company: string;
  pain: string;
  systems: string;
};

function renderEmail(s: Submission) {
  const subject = `New working session request — ${s.company} (${s.name})`;
  const lines = [
    `Name:    ${s.name}`,
    `Email:   ${s.email}`,
    `Company: ${s.company}`,
    "",
    "Primary pain",
    s.pain,
    "",
    "Systems in play",
    s.systems,
  ];
  const text = lines.join("\n");
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f0f0f; max-width: 560px;">
      <div style="font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: #5a5a55; padding-bottom: 12px; border-bottom: 1px solid #d6d1c2;">
        Booking · Working session request
      </div>
      <table style="border-collapse: collapse; width: 100%; margin-top: 18px;">
        <tr><td style="padding: 8px 0; color: #5a5a55; width: 110px; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;">Name</td><td style="padding: 8px 0;">${escapeHtml(s.name)}</td></tr>
        <tr><td style="padding: 8px 0; color: #5a5a55; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(s.email)}" style="color: #1749ff;">${escapeHtml(s.email)}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #5a5a55; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;">Company</td><td style="padding: 8px 0;">${escapeHtml(s.company)}</td></tr>
      </table>
      <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #d6d1c2;">
        <div style="font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: #1749ff;">Primary pain</div>
        <p style="margin: 10px 0 0; line-height: 1.55; white-space: pre-wrap;">${escapeHtml(s.pain)}</p>
      </div>
      <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #d6d1c2;">
        <div style="font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: #1749ff;">Systems in play</div>
        <p style="margin: 10px 0 0; line-height: 1.55; white-space: pre-wrap;">${escapeHtml(s.systems)}</p>
      </div>
      <p style="margin-top: 32px; font-size: 12px; color: #5a5a55;">Reply within 1 business day with two or three time options.</p>
    </div>
  `.trim();
  return { subject, text, html };
}

async function sendViaResend(s: Submission): Promise<{ ok: boolean; detail?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, detail: "no-api-key" };
  const { subject, text, html } = renderEmail(s);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: RECIPIENTS,
      reply_to: s.email,
      subject,
      text,
      html,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => res.statusText);
    return { ok: false, detail: detail.slice(0, 400) };
  }
  return { ok: true };
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ ok: false, error: "bad-json" }, { status: 400 });
  }

  if (
    !isString(body.name, 2) ||
    !isString(body.company, 2) ||
    typeof body.email !== "string" ||
    !EMAIL_RE.test(body.email.trim()) ||
    !isString(body.pain, 8) ||
    !isString(body.systems, 3)
  ) {
    return Response.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const submission: Submission = {
    name: body.name.trim(),
    email: body.email.trim(),
    company: body.company.trim(),
    pain: body.pain.trim(),
    systems: body.systems.trim(),
  };

  const sent = await sendViaResend(submission);
  if (!sent.ok) {
    // Don't block the user — log so the team still sees it server-side.
    console.warn(
      "[booking] email send skipped/failed:",
      sent.detail ?? "unknown",
      "submission:",
      submission
    );
  } else {
    console.log("[booking] email sent for", submission.email);
  }

  return Response.json({ ok: true });
}
