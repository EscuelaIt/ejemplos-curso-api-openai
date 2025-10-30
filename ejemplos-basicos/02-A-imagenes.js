import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import 'dotenv/config';
import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagePath = path.join(__dirname, "images", "unsplash.jpg");

const base64Image = fs.readFileSync(imagePath, "base64");

const response = await client.responses.create({
    model: "gpt-4.1",
    input: [
      {
          role: "user",
          content: [
              { 
                type: "input_text", 
                text: "Analiza el sentimiento que tiene este personaje en la imagen",
              },
              {
                  type: "input_image",
                  image_url: `data:image/jpeg;base64,${base64Image}`,
              },
          ],
      },
  ],
});
console.log(response.output_text);
