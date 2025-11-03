// Shared OpenAI helper functions
export interface OpenAIRequest {
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  conversationHistory?: Array<{ role: "user" | "assistant"; content: string }>;
}

export interface OpenAIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * Call OpenAI API to generate response
 */
export async function callOpenAI(request: OpenAIRequest): Promise<OpenAIResponse> {
  const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
  if (!openaiApiKey) {
    throw new Error("OpenAI API key not configured");
  }

  // Build messages array for chat completion
  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [];

  // Add system prompt if provided
  if (request.systemPrompt) {
    messages.push({ role: "system", content: request.systemPrompt });
  }

  // Add conversation history if provided
  if (request.conversationHistory && request.conversationHistory.length > 0) {
    // Include last 10 messages to keep context manageable
    const recentHistory = request.conversationHistory.slice(-10);
    for (const msg of recentHistory) {
      messages.push({ role: msg.role, content: msg.content });
    }
  }

  // Add current user message
  messages.push({ role: "user", content: request.prompt });

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${openaiApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // Using GPT-3.5-turbo for cost efficiency
      messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 1000,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
    console.error("OpenAI API error:", errorData);
    throw new Error(`OpenAI API error: ${errorData.error?.message || "Unknown error"}`);
  }

  const data = await response.json();

  return {
    content: data.choices[0]?.message?.content || "",
    usage: data.usage ? {
      promptTokens: data.usage.prompt_tokens,
      completionTokens: data.usage.completion_tokens,
      totalTokens: data.usage.total_tokens,
    } : undefined,
  };
}

