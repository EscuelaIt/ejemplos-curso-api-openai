import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
import { getBatchObject } from "./get-batch-object.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resultPath = path.join(__dirname, '../products', 'batchResult.jsonl');

export async function downloadBatchResults(batchId) {
  const batch = await getBatchObject(batchId);
  const fileResponse = await client.files.content(batch.output_file_id);
  const text = await fileResponse.text();
  fs.writeFileSync(resultPath, text, 'utf8');
}