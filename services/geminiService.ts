import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const initializeChat = (): Chat => {
  const model = 'gemini-2.5-flash';
  return ai.chats.create({
    model,
    config: {
      systemInstruction: 'You are a helpful and knowledgeable assistant specializing in famous personalities from Karnataka, India. Provide concise, engaging summaries initially. When asked for an elaborated explanation, provide a more detailed and comprehensive biography.',
    },
  });
};

export const getChatResponse = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    return "I'm sorry, I'm having trouble connecting to my knowledge base. Please try again later.";
  }
};
