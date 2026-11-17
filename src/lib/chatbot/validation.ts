export function validateChatInput(message: unknown): string | null {
  if (typeof message !== "string") return "Message must be a string.";
  const trimmed = message.trim();
  if (!trimmed) return "Message cannot be empty.";
  if (trimmed.length > 2000) return "Message is too long (max 2000 characters).";
  return null;
}

export function sanitizeMessage(message: string): string {
  return message.replace(/[<>]/g, "").trim().slice(0, 2000);
}