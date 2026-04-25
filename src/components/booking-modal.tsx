"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

type NumericStep = 1 | 2;
type Step = NumericStep | "confirm";
type FormField = "name" | "email" | "company" | "pain" | "systems";

const TOTAL = 2;

const STEPS: Array<{ step: NumericStep; label: string }> = [
  { step: 1, label: "You" },
  { step: 2, label: "The work" },
];

const INITIAL_FORM: Record<FormField, string> = {
  name: "",
  email: "",
  company: "",
  pain: "",
  systems: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<Record<FormField, string>>(INITIAL_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<FormField, string>>
  >({});
  const bodyRef = useRef<HTMLDivElement>(null);

  // Any element with `data-booker` opens the modal
  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = e.target as Element | null;
      const trigger = target?.closest("[data-booker]");
      if (!trigger) return;
      e.preventDefault();
      setOpen(true);
      setStep(1);
      setErrors({});
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Body scroll lock + ESC to close
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Focus the first input of the active step
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      const input = bodyRef.current?.querySelector<
        HTMLInputElement | HTMLTextAreaElement
      >(".onb-step.active input, .onb-step.active textarea");
      input?.focus();
    }, 200);
    return () => window.clearTimeout(t);
  }, [open, step]);

  const updateField = (key: FormField, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = useCallback(
    (n: NumericStep): boolean => {
      const next: Partial<Record<FormField, string>> = {};
      if (n === 1) {
        if (form.name.trim().length < 2) next.name = "Name required";
        if (form.company.trim().length < 2) next.company = "Company required";
        if (!EMAIL_RE.test(form.email.trim())) next.email = "Valid email required";
      }
      if (n === 2) {
        if (form.pain.trim().length < 8) next.pain = "A sentence or two, please";
        if (form.systems.trim().length < 3)
          next.systems = "At least one system";
      }
      setErrors(next);
      return Object.keys(next).length === 0;
    },
    [form]
  );

  const handleNext = () => {
    if (typeof step !== "number") return;
    if (!validate(step)) return;
    if (step === TOTAL) setStep("confirm");
    else setStep((step + 1) as NumericStep);
  };

  const handleBack = () => {
    if (typeof step === "number" && step > 1) {
      setStep((step - 1) as NumericStep);
    }
  };

  const handleSkip = () => {
    if (typeof step !== "number" || step < 2) return;
    if (!validate(1)) {
      setStep(1);
      return;
    }
    setForm((prev) => ({
      ...prev,
      pain: prev.pain.trim() || "(to discuss on call)",
      systems: prev.systems.trim() || "(to discuss on call)",
    }));
    setStep("confirm");
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT") {
      e.preventDefault();
      handleNext();
    } else if (target.tagName === "TEXTAREA" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleNext();
    }
  };

  const downloadICS = () => {
    const start = new Date();
    start.setDate(start.getDate() + 1);
    while (start.getDay() === 0 || start.getDay() === 6) {
      start.setDate(start.getDate() + 1);
    }
    start.setHours(10, 0, 0, 0);
    const end = new Date(start.getTime() + 45 * 60_000);
    const fmt = (dt: Date) =>
      dt.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const uid = `gc-${Date.now()}@gamechanger-ai.dev`;
    const descLines = [
      "Working session with GameChanger AI.",
      "",
      "Submitted:",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Pain: ${form.pain}`,
      `Systems: ${form.systems}`,
    ];
    const desc = descLines.join("\\n");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//GameChanger AI//Booking//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:REQUEST",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      "SUMMARY:GameChanger AI — Working session",
      `DESCRIPTION:${desc}`,
      "LOCATION:Video call (link to follow)",
      "ORGANIZER;CN=GameChanger AI:mailto:hello@gamechanger-ai.dev",
      `ATTENDEE;CN=${form.name};RSVP=TRUE:mailto:${form.email}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gamechanger-working-session.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(() => URL.revokeObjectURL(url), 2_000);
  };

  if (!open) return null;

  const currentNum = step === "confirm" ? null : step;
  const stepLabel =
    step === "confirm"
      ? "Review & book"
      : `Step ${String(step).padStart(2, "0")} / 0${TOTAL}`;

  return (
    <div
      className="onboarding open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onb-q-active"
      onKeyDown={handleKeyDown}
    >
      <div className="onb-head">
        <span className="onb-brand">GameChanger AI · Booking</span>
        <button
          type="button"
          className="onb-close"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          Close ×
        </button>
      </div>

      <div className="onb-progress">
        {STEPS.map((s) => {
          const isActive = currentNum === s.step;
          const isDone =
            step === "confirm" || (currentNum !== null && s.step < currentNum);
          return (
            <div
              key={s.step}
              className={`cell${isActive ? " active" : ""}${
                isDone ? " done" : ""
              }`}
            >
              <span>{s.label}</span>
              <span className="num">
                0{s.step} / 0{TOTAL}
              </span>
            </div>
          );
        })}
      </div>

      <div className="onb-body" ref={bodyRef}>
        <div className={`onb-step${step === 1 ? " active" : ""}`}>
          <span className="onb-eyebrow">Step 01 / 02 · Introductions</span>
          <h2 className="onb-q" id={step === 1 ? "onb-q-active" : undefined}>
            Who is this for, and where should the invite land?
          </h2>
          <div className="onb-stack">
            <div className="onb-field">
              <label className="onb-label">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="First and last name"
                autoComplete="name"
              />
              {errors.name && <div className="onb-err">{errors.name}</div>}
            </div>
            <div className="onb-field">
              <label className="onb-label">Company</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="Company name"
                autoComplete="organization"
              />
              {errors.company && (
                <div className="onb-err">{errors.company}</div>
              )}
            </div>
            <div className="onb-field">
              <label className="onb-label">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
              />
              {errors.email && <div className="onb-err">{errors.email}</div>}
            </div>
          </div>
        </div>

        <div className={`onb-step${step === 2 ? " active" : ""}`}>
          <span className="onb-eyebrow">Step 02 / 02 · The work</span>
          <h2 className="onb-q" id={step === 2 ? "onb-q-active" : undefined}>
            Where is the operation hurting, and what systems does it live in?
          </h2>
          <p className="onb-help">
            One or two sentences each — the real constraint, not a polished
            statement.
          </p>
          <div className="onb-stack">
            <div className="onb-field">
              <label className="onb-label">Primary pain</label>
              <textarea
                value={form.pain}
                onChange={(e) => updateField("pain", e.target.value)}
                placeholder="The thing that keeps costing time, visibility, or accuracy…"
              />
              {errors.pain && <div className="onb-err">{errors.pain}</div>}
            </div>
            <div className="onb-field">
              <label className="onb-label">Systems in play</label>
              <textarea
                value={form.systems}
                onChange={(e) => updateField("systems", e.target.value)}
                placeholder="ERP, CRM, spreadsheets, shared inboxes, internal tools — what the team actually opens daily."
              />
              {errors.systems && (
                <div className="onb-err">{errors.systems}</div>
              )}
            </div>
          </div>
        </div>

        <div className={`onb-step${step === "confirm" ? " active" : ""}`}>
          <span className="onb-eyebrow">Confirmed · Ready to book</span>
          <h2
            className="onb-q"
            id={step === "confirm" ? "onb-q-active" : undefined}
          >
            Here is what we have. Add the 45-min working session to your
            calendar.
          </h2>
          <div className="onb-confirm">
            <div className="summary">
              <div>
                <span className="k">Name</span>
                <span className="v">{form.name}</span>
              </div>
              <div>
                <span className="k">Email</span>
                <span className="v">{form.email}</span>
              </div>
              <div>
                <span className="k">Company</span>
                <span className="v">{form.company}</span>
              </div>
              <div>
                <span className="k">Pain</span>
                <span className="v">{form.pain}</span>
              </div>
              <div>
                <span className="k">Systems</span>
                <span className="v">{form.systems}</span>
              </div>
            </div>
            <button type="button" className="ics-btn" onClick={downloadICS}>
              Download .ics invite <span aria-hidden="true">↓</span>
            </button>
            <p className="onb-help">
              The invite schedules a 45-minute working session for the next
              business day at 10:00 local time. We will confirm by email within
              2 business days and adjust the time if needed.
            </p>
          </div>
        </div>
      </div>

      <div className="onb-foot">
        <div className="onb-foot-left">
          <span>{stepLabel}</span>
          {typeof step === "number" && step >= 2 && (
            <button type="button" className="onb-skip" onClick={handleSkip}>
              Skip to booking →
            </button>
          )}
        </div>
        {step !== "confirm" && (
          <div className="onb-nav">
            <button
              type="button"
              className="onb-back"
              onClick={handleBack}
              disabled={step === 1}
            >
              ← Back
            </button>
            <button type="button" className="onb-next" onClick={handleNext}>
              {step === TOTAL ? "Review →" : "Continue →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
