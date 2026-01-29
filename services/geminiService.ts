import { GoogleGenAI } from "@google/genai";
import { currentLang } from "./i18n";

const getApiKey = () => {
  try {
    return process.env.API_KEY;
  } catch (e) {
    return '';
  }
};

const apiKey = getApiKey() || ''; 

// We handle the case where key is missing gracefully in the UI
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateAIContent = async (title: string, category: string): Promise<string> => {
  if (!ai) {
    return currentLang === 'ru' 
      ? "API ключ не настроен. Пожалуйста, проверьте переменные окружения." 
      : "API Key not configured. Please check environment variables.";
  }

  try {
    const prompt = currentLang === 'ru' 
      ? `Напиши подробную новостную статью на тему "${title}" для категории "${category}". Тон должен быть профессиональным и журналистским. Структурируй статью с введением, основной частью и заключением. Верни ТОЛЬКО текст основного содержания, без markdown форматирования заголовков.`
      : `Write a comprehensive news article about "${title}" suitable for the "${category}" category. The tone should be professional and journalistic. Structure it with an introduction, body paragraphs, and a conclusion. Return ONLY the body content text, no markdown formatting for headers.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating content. Please try again later.";
  }
};

export const generateAISummary = async (content: string): Promise<string> => {
  if (!ai) {
    return "";
  }

  try {
    const prompt = currentLang === 'ru'
      ? `Сделай короткое, привлекательное саммари (резюме) из 2 предложений для следующего текста: ${content.substring(0, 1000)}...`
      : `Summarize the following article content into a short, catchy 2-sentence excerpt: ${content.substring(0, 1000)}...`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Failed to generate summary.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "";
  }
};