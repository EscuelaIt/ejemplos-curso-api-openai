import 'dotenv/config';
import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: [
        {
            role: "user",
            content: [
                { 
                    type: "input_text", 
                    text: "Dime qué es lo que ves en esa imagen" 
                },
                {
                    type: "input_image",
                    image_url: "https://desarrolloweb.com/media/847/laravel-testing-validaciones.jpg",
                },
            ],
        }
    ],
});

console.log(response.output_text);