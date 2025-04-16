import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function createBatch(fileId) {
    const batch = await client.batches.create({
        input_file_id: fileId,
        endpoint: "/v1/responses",
        completion_window: "24h"
    });
    return batch.id;
}