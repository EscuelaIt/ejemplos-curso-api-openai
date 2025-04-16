import OpenAI from "openai";
import { translationSchema } from "./schema/translation-schema.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function translateProduct(product) {
  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: [
      {
        role: 'developer',
        content: 'Eres un traductor profesional. Traduce el título y la descripción del producto al español manteniendo el tono promocional.',
      },
      {
        role: 'user',
        content: JSON.stringify(product),
      },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'translated_product',
        schema: translationSchema,
        strict: true
      }
    }
  });
  return response.output_text;
}