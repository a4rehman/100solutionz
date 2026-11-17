import type { ChatMessage } from "./chatbot-types";

export interface AIProviderResult {
  answer: string;
  mode: "ai" | "knowledge-search";
}

export function isAIConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

export async function generateAIResponse(
  systemPrompt: string,
  history: ChatMessage[],
  message: string
): Promise<AIProviderResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { answer: "", mode: "knowledge-search" };
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const messages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-10).map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: message },
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.3,
      max_tokens: 700,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI provider error: ${res.status} ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const answer = data?.choices?.[0]?.message?.content?.trim() || "";
  if (!answer) throw new Error("Empty AI response");
  return { answer, mode: "ai" };
}