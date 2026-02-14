
import { GoogleGenAI } from "@google/genai";

// Guideline: Create a new GoogleGenAI instance right before making an API call 
// to ensure it always uses the most up-to-date API key.
// Prohibited: new GoogleGenAI({ apiKey: process.env.API_KEY || '' })

export const getStructureExplanation = async (structure: string, query: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      // Using gemini-3-pro-preview for complex reasoning and STEM tasks
      model: "gemini-3-pro-preview",
      contents: `Context: You are a computer science professor. Explain ${structure} to a student. Query: ${query}`,
      config: {
        systemInstruction: "Keep explanations concise, accurate, and use simple analogies. Format output in Markdown.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};

export const chatWithGemini = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    // Using gemini-3-pro-preview for advanced computer science tutoring
    model: 'gemini-3-pro-preview',
    config: {
        systemInstruction: "You are a friendly coding assistant specializing in Data Structures and Algorithms."
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
