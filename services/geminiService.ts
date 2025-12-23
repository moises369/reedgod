
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGothicQuote = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a short, powerful, dark gothic quote about fashion and the abyss (max 15 words). Return ONLY the quote.",
      config: {
        temperature: 0.9,
      },
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching gothic quote:", error);
    return "Where the shadows meet the soul, we find our truth.";
  }
};

export const getCustomDescription = async (productName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a dark, poetic, 18+ gothic product description for an item named "${productName}". Focus on quality, darkness, and mystery.`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching description:", error);
    return null;
  }
};
