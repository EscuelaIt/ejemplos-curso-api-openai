import 'dotenv/config';
import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const city = process.argv[2];

if (!city) {
  console.error("Por favor, indicá el nombre de una ciudad. Ej: node datos-ciudades.js Tokyo");
  process.exit(1);
}

async function getCityData(city) {
  try {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "developer", 
          content: "Eres un asistente que da datos sobre ciudades del mundo. Quiero saber el país de la ciudad, la población, el continente y una descripción de 120 caracteres aproximadamente.",
        },
        {
          role: "user",
          content: `Dame información sobre la ciudad de ${city}.`,
        },
      ],
    });

    console.log('Datos:');
    console.log(response.output_text);
    
  } catch(err) {
    console.error(err);
  } 
}

getCityData(city);