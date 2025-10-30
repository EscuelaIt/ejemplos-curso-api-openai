import 'dotenv/config';
import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

try {
    const response = await client.responses.create({
        model: "gpt-5-mini",
        input: "Dime cuál es la capital de Perú y desde cuándo es así"
    });
    console.log(response.output_text);
} catch(error) {
    console.error('hemos detectado un error\n------------------------\n');
    console.log(error);
}
