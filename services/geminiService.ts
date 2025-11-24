import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// NOTE: In a real production app, never expose keys on the client.
// However, per instructions, we access process.env.API_KEY directly.
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const sendMessageToCoach = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Erro: Chave de API não configurada. Por favor, verifique as configurações.";

  try {
    const model = "gemini-2.5-flash";
    
    // Prepare history for the API
    // We map our internal ChatMessage type to the API's expected format if needed,
    // but the simplest way is to just send the new message with context instruction.
    // For a stateless simple implementation, we'll construct a prompt with history context.
    
    const contextPrompt = `
      Você é o "Coach Anthony", um assistente pessoal de fitness inteligente, motivador e direto ao ponto.
      Você baseia seus conselhos em ciência sólida, mas fala de forma acessível e gamificada.
      Use emojis ocasionalmente. Seja encorajador.
      
      Histórico da conversa recente:
      ${history.map(h => `${h.role}: ${h.text}`).join('\n')}
      
      Usuário: ${newMessage}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: contextPrompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Fast response for chat
      }
    });

    return response.text || "Desculpe, não consegui processar sua resposta agora. Tente novamente!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ocorreu um erro ao conectar com seu Coach IA. Verifique sua conexão.";
  }
};