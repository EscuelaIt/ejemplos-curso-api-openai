import fs from "fs";
import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function uploadFile(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const file = await client.files.create({
    file: fileStream,
    purpose: "batch"
  });
  return file.id;
}