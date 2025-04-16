import 'dotenv/config';
import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const response = await client.responses.create({
  model: "gpt-4o-mini",
  input: "Cuál fue el primer emperador romano de origen hispano?",
  store: true, // No es necesario porque es  el valor predeterminado
});

console.log(response.output_text);

const response2 = await client.responses.create({
  model: "gpt-4o-mini",
  input: "Y el segundo?",
  previous_response_id: response.id,
});

console.log(response2.output_text);