import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// We assume process.env.API_KEY is available in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateHairstyleImage = async (
  prompt: string,
  referenceImageBase64?: string
): Promise<string> => {
  try {
    const parts: any[] = [];

    // Add reference image if provided
    if (referenceImageBase64) {
      // Remove data URL prefix if present for clean base64
      const cleanBase64 = referenceImageBase64.replace(/^data:image\/(png|jpeg|webp);base64,/, '');
      parts.push({
        inlineData: {
          data: cleanBase64,
          mimeType: 'image/png', // Assuming PNG or handling generically
        },
      });
    }

    // Add the text prompt
    parts.push({
      text: `Professional hairstyle photography, cinematic lighting, 8k resolution. ${prompt}`,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: parts,
      },
      // Using Image Config if available in SDK, otherwise defaults apply
      config: {
        // @ts-ignore - Image config might be experimental in some SDK versions
        imageConfig: {
            aspectRatio: "3:4", 
        }
      }
    });

    // Extract the image from the response
    // The model returns both image and text parts, we need to find the image
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const content = candidates[0].content;
      if (content && content.parts) {
        for (const part of content.parts) {
          if (part.inlineData && part.inlineData.data) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
      }
    }

    throw new Error('No image generated');
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};

export const generateHairstyleDescription = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, catchy, and elegant description (max 30 words) for a hairstyle based on these characteristics: ${prompt}. Return only the description text in Chinese.`,
    });
    return response.text || "无法生成描述";
  } catch (error) {
    console.error("Description generation error:", error);
    return "优雅迷人的发型设计，展现独特个人魅力。"; // Fallback
  }
};