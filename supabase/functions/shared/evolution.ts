// Shared Evolution API helper functions

export interface EvolutionAPIConfig {
  baseUrl: string;
  apiKey: string;
  instanceName: string;
}

export interface SendMessageParams {
  number: string; // Phone number with country code (e.g., "5511999999999")
  text: string;
}

/**
 * Send message via Evolution API
 */
export async function sendEvolutionMessage(
  config: EvolutionAPIConfig,
  params: SendMessageParams
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const url = `${config.baseUrl}/message/sendText/${config.instanceName}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": config.apiKey,
      },
      body: JSON.stringify({
        number: params.number,
        textMessage: {
          text: params.text,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      console.error("Evolution API error:", errorData);
      return {
        success: false,
        error: errorData.message || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    
    return {
      success: true,
      messageId: data.key?.id,
    };
  } catch (error) {
    console.error("Error sending Evolution message:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

