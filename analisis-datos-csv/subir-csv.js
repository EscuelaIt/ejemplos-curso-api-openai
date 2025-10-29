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
const pdfPath = path.join(__dirname, "hurricanes.csv");

const file = await client.files.create({
  file: fs.createReadStream(pdfPath),
  purpose: "user_data",
});

await client.containers.files.create('cntr_68480251873081988176ce98281abf0d0c8095ee11cdb59f', {
  file_id: file.id,
});