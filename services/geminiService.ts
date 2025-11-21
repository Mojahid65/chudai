import { GoogleGenAI } from "@google/genai";
import { PromptStyle } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to convert File to Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data url prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const generateImagePrompt = async (
  imageFile: File,
  style: PromptStyle
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found. Please check your environment configuration.");
  }

  try {
    const base64Data = await fileToBase64(imageFile);

    // Determine specific instructions based on style
    let styleInstruction = "";
    switch (style) {
      case PromptStyle.SHORT:
        styleInstruction = "Create a short, concise, comma-separated prompt (under 40 words). Focus only on key subjects and main style.";
        break;
      case PromptStyle.DETAILED:
        styleInstruction = "Create a highly detailed and descriptive prompt. Include lighting, texture, camera angles, color palette, and mood. Write it as a continuous paragraph suitable for Midjourney.";
        break;
      case PromptStyle.ARTISTIC:
        styleInstruction = "Create an artistic prompt focusing on brushstrokes, medium (e.g., oil painting, digital art, watercolor), artistic influences, and abstract concepts. Make it sound evocative and poetic.";
        break;
      case PromptStyle.PHOTOGRAPHY:
        styleInstruction = "Create a photorealistic prompt. Specify camera settings (f-stop, ISO, lens mm), lighting type (golden hour, studio, softbox), and realistic details like skin texture or material reflections.";
        break;
      case PromptStyle.ANIME:
        styleInstruction = "Create a prompt tailored for anime or illustration models (like NijiJourney). Mention 'anime style', 'cel shading', specific anime art eras (90s, modern), and vibrant character design details.";
        break;
      default:
        styleInstruction = "Create a balanced art prompt.";
    }

    const systemPrompt = `
      You are an expert AI Art Prompt Engineer. 
      Your task is to analyze the provided image and write a text prompt that could be used to recreate a similar image using generative AI tools like Midjourney, Stable Diffusion, or DALL-E 3.
      
      ${styleInstruction}
      
      Do not include conversational filler like "Here is the prompt:". Just output the raw prompt text.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
            {
                inlineData: {
                    mimeType: imageFile.type,
                    data: base64Data
                }
            },
            {
                text: systemPrompt
            }
        ]
      },
    });

    return response.text || "Failed to generate prompt.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to process image. Please try again.");
  }
};