import OpenAI from "openai";
const client = new OpenAI();

try {
    const response = await client.responses.create({
        model: "gpt-4.1-2025-04-14",
        input: "Dime cuál es la capital de España"
    });
    console.log(response.output_text);
} catch(error) {
    console.log(error);
}
