import 'dotenv/config';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pdfPath = path.join(__dirname, "files", "abstraccion.pdf");

const data = fs.readFileSync(pdfPath);
const base64String = data.toString("base64");

const response = await client.responses.create({
  model: "gpt-4o-mini",
  input: [
    {
      role: "user",
      content: [
          {
              type: "input_text",
              text: "Puedes darme las palabras clave de este artículo, separadas por comas, como para copiar y pegar en las etiquetas META de una web. Solo quiero las palabras clave, ningún comentario tuyo sobre lo que estás haciendo.",
          },
          {
            type: "input_file",
            filename: "abstraccion.pdf",
            file_data: `data:application/pdf;base64,${base64String}`,
          },
      ],
    },
  ],
});

console.log(response.output_text);
