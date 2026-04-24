import Anthropic from "@anthropic-ai/sdk";

export const revalidate = 21600; // 6 hours (only successful responses cache)

const PROMPT = `You are a newswire editor for an AI-operations consultancy. Write 8 one-line headlines about recent AI news relevant to operations, enterprise deployment, AI tooling, and AI adoption in companies with legacy systems. Each headline must be:
- under 70 characters
- factual in tone, no marketing language
- no emoji, no quotation marks
- format: "VENDOR OR SUBJECT · what happened" (e.g. "ANTHROPIC · ships Claude tool-use v2")
- vary vendors (Anthropic, OpenAI, Google, Microsoft, Meta, enterprise, open-source)
- focus on operations/enterprise relevance, not consumer

Return ONLY a JSON array of 8 strings, no prose, no code fences.`;

const MODEL = "claude-haiku-4-5";

function errorResponse(reason: string, detail?: string, status = 500) {
  // Non-2xx status so Next.js doesn't cache the failure.
  return Response.json({ items: [], reason, detail }, { status });
}

export async function GET() {
  if (!process.env.ANTHROPIC_API_KEY) {
    return errorResponse("no-api-key", undefined, 503);
  }

  let text = "";
  try {
    const client = new Anthropic();
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [{ role: "user", content: PROMPT }],
    });

    text = message.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("");
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("[ai-wire] sdk call failed", detail);
    return errorResponse("sdk-failed", detail);
  }

  try {
    const match = text.match(/\[[\s\S]*\]/);
    const parsed: unknown = JSON.parse(match ? match[0] : text);
    if (!Array.isArray(parsed)) {
      return errorResponse("bad-shape", text.slice(0, 200));
    }
    const items = parsed
      .map((entry) => String(entry).trim())
      .filter(Boolean)
      .slice(0, 8);
    if (!items.length) {
      return errorResponse("empty", text.slice(0, 200));
    }
    return Response.json({ items });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("[ai-wire] parse failed", detail, text.slice(0, 200));
    return errorResponse("parse-failed", detail);
  }
}
