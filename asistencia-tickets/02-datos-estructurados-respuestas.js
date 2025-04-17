import 'dotenv/config';
import OpenAI from 'openai';
import { clasificationSchemaAnswers } from './schemas/clasificationSchemaAnswers.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ticket = `
No puedo acceder a mi cuenta. Olvidé la contraseña y tampoco me llega el correo de recuperación.
Es urgente porque tengo que enviar un informe.
`;

export async function clasificarTicket(mensaje) {
  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "developer",
        content: "Eres un sistema de soporte técnico creado para clasificar tickets por urgencia (alta, media, baja), tema (p.ej. login, facturación, red), y el equipo responsable (soporte técnico, facturación, infraestructura, etc). Quiero además dos posibles respuestas, una para aportar una solución y la otra para decile que estamos revisando su caso y indicando un tiempo estimado de respuesta estimado según la complejidad del problema entre 1h y 24h"
      },
      {
        role: "user",
        content: mensaje
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "ticket_clasificado",
        schema: clasificationSchemaAnswers,
        strict: true
      }
    }
  });
  return JSON.parse(response.output_text);
}

clasificarTicket(ticket)
  .then(resultado => {
    console.log("Clasificación del ticket:");
    console.log(JSON.stringify(resultado, null, 2));
  })
  .catch(err => {
    console.error("Error al clasificar:", err.message);
  });