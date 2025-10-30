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
const pdfPath = path.join(__dirname, "files", "abstraccion-con-error-ortografia.pdf");

const file = await client.files.create({
  file: fs.createReadStream(pdfPath),
  purpose: "user_data",
});

const response = await client.responses.create({
  model: "gpt-4o-mini",
  input: [
      {
          role: "user",
          content: [
              {
                  type: "input_text",
                  text: "Detállame los errores de ortografía que encuentres",
              },
              {
                type: "input_file",
                file_id: file.id,
            },
          ],
      },
  ],
});

console.log(response.output_text);