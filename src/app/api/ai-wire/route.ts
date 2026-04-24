import Anthropic from "@anthropic-ai/sdk";

export const revalidate = 21600; // 6 hours

const PROMPT = `You are a newswire editor for an AI-operations consultancy. Write 8 one-line headlines about recent AI news relevant to operations, enterprise deployment, AI tooling, and AI adoption in companies with legacy systems. Each headline must be:
- under 70 characters
- factual in tone, no marketing language
- no emoji, no quotation marks
- format: "VENDOR OR SUBJECT · what happened" (e.g. "ANTHROPIC · ships Claude tool-use v2")
- vary vendors (Anthropic, OpenAI, Google, Microsoft, Meta, enterprise, open-source)
- focus on operations/enterprise relevance, not consumer

Return ONLY a JSON array of 8 strings, no prose, no code fences.`;

export async function GET() {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ items: [], reason: "no-api-key" });
  }

  try {
    const client = new Anthropic();
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: PROMPT }],
    });

    const text = message.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("");

    const match = text.match(/\[[\s\S]*\]/);
    const parsed: unknown = JSON.parse(match ? match[0] : text);
    if (!Array.isArray(parsed)) {
      return Response.json({ items: [], reason: "bad-shape" });
    }

    const items = parsed
      .map((entry) => String(entry).trim())
      .filter(Boolean)
      .slice(0, 8);

    return Response.json({ items });
  } catch (err) {
    console.error("[ai-wire] generation failed", err);
    return Response.json({ items: [], reason: "error" });
  }
}
