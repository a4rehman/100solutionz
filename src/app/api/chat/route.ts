import { NextRequest, NextResponse } from "next/server";
import { validateChatInput, sanitizeMessage } from "@/lib/chatbot/validation";
import { searchWebsiteKnowledge, getSources } from "@/lib/chatbot/retrieval";
import { generateAIResponse, isAIConfigured } from "@/lib/chatbot/ai-provider";
import { getConversation, appendConversation } from "@/lib/chatbot/conversation";
import { SYSTEM_PROMPT } from "@/lib/chatbot/system-prompt";
import type { ChatMessage, ChatRequest } from "@/lib/chatbot/chatbot-types";

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimitMap.set(ip, recent);
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) rateLimitMap.delete(key);
    }
  }
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

function buildFallbackAnswer(
  message: string,
  chunks: ReturnType<typeof searchWebsiteKnowledge>
): { answer: string; suggestions: string[] } {
  if (chunks.length === 0) {
    return {
      answer:
        "I don't have verified information about that on the 100Solutionz website. You can explore our services at /services, AI solutions at /ai-solutions, or contact our team at /contact for a detailed discussion.",
      suggestions: ["Explore Our Services", "Explore AI Solutions", "Book a Consultation"],
    };
  }

  const lines = chunks.map((c) => `- ${c.title}: ${c.content.slice(0, 220)}${c.content.length > 220 ? "…" : ""}`);
  const answer = [
    "Here is what I found on the 100Solutionz website:",
    "",
    ...lines,
    "",
    "You can explore the linked pages for more detail, or ask me a follow-up question.",
  ].join("\n");

  const suggestions = [
    "Tell me more about AI services",
    "Show me your portfolio",
    "How can I start a project?",
  ];

  return { answer, suggestions };
}

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    let body: ChatRequest;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
    }

    const validationError = validateChatInput(body?.message);
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 });
    }

    const message = sanitizeMessage(body.message);
    const history: ChatMessage[] = Array.isArray(body.history)
      ? body.history
          .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
          .slice(-20)
      : [];

    const conversationId = typeof body.conversationId === "string" && body.conversationId.trim()
      ? body.conversationId.trim().slice(0, 64)
      : `conv-${Date.now().toString(36)}`;

    const serverHistory = getConversation(conversationId);
    const combinedHistory = serverHistory.length > 0 ? serverHistory : history;

    const chunks = searchWebsiteKnowledge(message, 6);
    const sources = getSources(chunks);
    const contextText = chunks.map((c) => `[${c.title}] (${c.url})\n${c.content}`).join("\n\n");

    let answer = "";
    let mode: "ai" | "knowledge-search" = "knowledge-search";
    let suggestions: string[] = [];

    if (isAIConfigured()) {
      try {
        const systemPrompt = SYSTEM_PROMPT.replace("{context}", contextText || "No relevant website content found.");
        const result = await generateAIResponse(systemPrompt, combinedHistory, message);
        answer = result.answer;
        mode = result.mode;
        suggestions = ["Explore Our Services", "Show Our Portfolio", "Book a Consultation"];
      } catch (err) {
        console.warn("AI provider failed, falling back to knowledge search:", err);
        const fb = buildFallbackAnswer(message, chunks);
        answer = fb.answer;
        suggestions = fb.suggestions;
        mode = "knowledge-search";
      }
    } else {
      const fb = buildFallbackAnswer(message, chunks);
      answer = fb.answer;
      suggestions = fb.suggestions;
      mode = "knowledge-search";
    }

    appendConversation(conversationId, [
      { role: "user", content: message },
      { role: "assistant", content: answer },
    ]);

    return NextResponse.json(
      {
        success: true,
        answer,
        sources,
        suggestions,
        mode,
        conversationId,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}