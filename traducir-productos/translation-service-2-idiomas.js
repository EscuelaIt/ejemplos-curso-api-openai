import OpenAI from "openai";
import { translationSchema } from "./schema/translation-schema.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function translateProduct(product) {
  const translations = {};
  const responseSpanish = await openai.responses.create({
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
  translations.spanish = JSON.parse(responseSpanish.output_text);

  const responsePortuguese = await openai.responses.create({
    model: 'gpt-4o-mini',
    previous_response_id: responseSpanish.id,
    input: [
      {
        role: 'user',
        content: 'Ahora al portugués',
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
  translations.portuguese = JSON.parse(responsePortuguese.output_text);
  return translations;
}