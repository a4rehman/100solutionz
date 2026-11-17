export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface KnowledgeSource {
  title: string;
  url: string;
}

export interface RetrievedContext {
  text: string;
  sources: KnowledgeSource[];
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  conversationId?: string;
}

export interface ChatResponse {
  success: boolean;
  answer: string;
  sources: KnowledgeSource[];
  suggestions: string[];
  mode: "ai" | "knowledge-search";
  error?: string;
}

export interface LeadPayload {
  fullName: string;
  email: string;
  companyName?: string;
  country?: string;
  industry?: string;
  selectedSolution?: string;
  description: string;
  budget?: string;
  contactMethod?: string;
  honeypot?: string;
}