
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateLyricsDraft(memories: string, style: string) {
  const prompt = `Şu anılara dayanarak kısa ve içten bir şarkı sözü taslağı yaz: "${memories}". Müzik tarzı "${style}" olmalı. Bir kıta ve bir nakarat ekle.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Hayatın en önemli anları için duygusal ve kişiselleştirilmiş şarkılar konusunda uzmanlaşmış, dünya standartlarında bir şarkı sözü yazarısın. Cevaplarını her zaman Türkçe olarak vermelisin.",
        temperature: 0.8,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Şarkı sözü oluşturulamadı. Lütfen daha sonra tekrar deneyin.";
  }
}
