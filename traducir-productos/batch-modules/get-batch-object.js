import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function getBatchObject(batchId) {
  const batch = await client.batches.retrieve(batchId);
  return batch;
}
