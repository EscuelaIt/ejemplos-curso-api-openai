import 'dotenv/config';
import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const container = await client.containers.create({ name: "mi-container" });

console.log(`Container creado con el id: ${container.id}`);
console.log('------------------------------');
console.log(container);


// cntr_68480251873081988176ce98281abf0d0c8095ee11cdb59f
