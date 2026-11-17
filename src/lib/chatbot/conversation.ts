import type { ChatMessage } from "./chatbot-types";

interface Conversation {
  id: string;
  messages: ChatMessage[];
  updatedAt: number;
}

const store = new Map<string, Conversation>();
const MAX_MESSAGES = 24;
const TTL_MS = 30 * 60 * 1000;

function cleanup() {
  const now = Date.now();
  for (const [id, c] of store.entries()) {
    if (now - c.updatedAt > TTL_MS) store.delete(id);
  }
}

export function getConversation(id: string): ChatMessage[] {
  cleanup();
  return store.get(id)?.messages ?? [];
}

export function appendConversation(id: string, messages: ChatMessage[]): void {
  cleanup();
  const existing = store.get(id)?.messages ?? [];
  const merged = [...existing, ...messages].slice(-MAX_MESSAGES);
  store.set(id, { id, messages: merged, updatedAt: Date.now() });
}

export function clearConversation(id: string): void {
  store.delete(id);
}