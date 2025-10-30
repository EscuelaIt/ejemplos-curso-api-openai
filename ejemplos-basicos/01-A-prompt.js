import 'dotenv/config';
import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const response = await client.responses.create({
    model: "gpt-4.1",
    instructions: "Contéstame como si fueras una mamá que le responde a su hijo de 4 años",
    input: "Por qué se necesita un hombre y una mujer para hacer un bebé?"
});
console.log(response.output_text);
