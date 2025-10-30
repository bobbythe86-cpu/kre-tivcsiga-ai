import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface ImageData {
  data: string;
  mimeType: string;
}

export async function generateProductNames(
  imageData: ImageData,
  rule: string
): Promise<string[]> {
  const model = "gemini-2.5-flash";
  
  const prompt = `Ön egy szakértő marketing és SEO asszisztens, aki termékelnevezésre specializálódott. A megadott termékkép alapján, és a felhasználó által megadott elnevezési szabályt követve, generáljon 5 kreatív, fülbemászó és SEO-barát terméknevet.

Felhasználó elnevezési szabálya: "${rule || 'Nincs konkrét szabály megadva. Használja a kreativitását.'}"

Az eredményt JSON objektumként adja vissza, egyetlen "names" kulccsal, amely egy stringekből álló tömb.`;

  const imagePart = {
    inlineData: {
      data: imageData.data,
      mimeType: imageData.mimeType,
    },
  };

  const textPart = {
    text: prompt,
  };

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [textPart, imagePart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            names: {
              type: Type.ARRAY,
              description: "A list of 5 generated product names.",
              items: {
                type: Type.STRING,
                description: "A single product name."
              },
            },
          },
          required: ["names"],
        },
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const responseText = response.text.trim();
    if (!responseText) {
      throw new Error("Üres válasz érkezett az API-tól.");
    }

    const result = JSON.parse(responseText);

    if (result && Array.isArray(result.names)) {
      return result.names;
    } else {
      throw new Error("Érvénytelen válaszformátum az API-tól.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('SAFETY')) {
        throw new Error("A kérést a biztonsági beállítások miatt letiltották. Próbálkozzon másik képpel vagy szabállyal.");
    }
    throw new Error("Nem sikerült termékneveket generálni. További részletekért ellenőrizze a konzolt.");
  }
}