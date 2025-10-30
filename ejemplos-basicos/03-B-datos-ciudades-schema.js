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
          content: "Eres un asistente que da datos sobre ciudades del mundo. Quiero saber el país de la ciudad, la población, el continente y una descripción de 120 caracteres aproximadamente y el perfijo de teléfono que se debe usar para llamarles.",
        },
        {
          role: "user",
          content: `Dame información sobre la ciudad de ${city}.`,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "ciudad_info",
          schema: {
            type: "object",
            properties: {
              nombre: { type: "string" },
              pais: { type: "string" },
              continente: { type: "string" },
              poblacion: { type: "string" },
              descripcion: { type: "string" },
              prefijoTelefonoInternacional: { type: "integer" }
            },
            required: ["nombre", "pais", "continente", "poblacion", "descripcion", "prefijoTelefonoInternacional"],
            additionalProperties: false,
          },
          strict: true,
        }
      }
    });

    console.log('Datos:');
    const jsonData = JSON.parse(response.output_text);
    console.log(
      JSON.stringify(jsonData, null, 2)
    );
    
  } catch(err) {
    console.error(err);
  } 
}

getCityData(city);