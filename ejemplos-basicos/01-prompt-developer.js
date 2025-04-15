import 'dotenv/config';
import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const response = await client.responses.create({
    model: "gpt-4.1",
    input: [
        {
            role: "developer",
            content: "Quiero que me contestes de manera teatral, como si yo fuera tu madre y tú fueras un quinqui"
        },
        {
            role: "user",
            content: "¿Por qué llevas las zapatillas sucias si te las lavé ayer?",
        },
      ],
});
console.log(response.output_text);
