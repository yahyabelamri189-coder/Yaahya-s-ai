import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `You are a respectful and knowledgeable Islamic assistant. You answer questions based strictly on the Quran and authentic Sunnah (Sahih Hadith). You MUST NOT give Fatwas (religious rulings). If a question is too complex, involves Fiqh disagreements, or you are unsure, you must politely say Allahu A'lam (God knows best) and advise the user to consult a verified Islamic scholar. Always be polite, calm, and use proper Arabic.`;

export async function generateChatResponse(message: string, history: { role: "user" | "model"; parts: { text: string }[] }[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const model = "gemini-3-flash-preview";
  
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
    history,
  });

  const result = await chat.sendMessage({ message });
  return result.text;
}
