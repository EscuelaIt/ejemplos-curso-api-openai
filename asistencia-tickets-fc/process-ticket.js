import { consultRenewal, resetPassword } from "./backend-functions.js";
import { clasificationSchemaAnswers } from '../asistencia-tickets/schemas/clasificationSchemaAnswers.js';
import { tools } from "./tools.js";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const input = (message) => [
  {
    role: "developer",
    content: "Eres un sistema de soporte técnico creado para clasificar tickets por urgencia (alta, media, baja), tema (p.ej. login, facturación, red), y el equipo responsable (soporte técnico, facturación, infraestructura, etc). Quiero además dos posibles respuestas, una para aportar una solución y la otra para decile que estamos revisando su caso y indicando un tiempo estimado de respuesta estimado según la complejidad del problema entre 1h y 24h"
  },
  {
    role: "user",
    content: message
  }
];

export async function processTicket(message) {
  const inputMessages = input(message);
  const response = await openai.responses.create({
    model: "gpt-4o",
    input: inputMessages,
    tools,
  });

  // console.log(response);
  const newInput = [];
  for (const toolCall of response.output) {
    if (toolCall.type !== "function_call") {
      continue;
    }

    const name = toolCall.name;
    const args = JSON.parse(toolCall.arguments);

    const result = await handleFunctionCall(name, args);
    newInput.push({
      type: "function_call_output",
      call_id: toolCall.call_id,
      output: result,
    });

  }
  
  // console.log(inputMessages);
  return await getStructuredData(newInput, response);
}

async function handleFunctionCall(name, args) {

  if(name === 'get_subscription_renewal' ) {
    return consultRenewal(args.email)
  }

  if(name === 'reset_password' ) {
    return resetPassword(args.email)
  }
}

async function getStructuredData(input, previousResponse) {
  const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input,
      text: {
        format: {
          type: "json_schema",
          name: "ticket_clasificado",
          schema: clasificationSchemaAnswers,
          strict: true
        }
      },
      previous_response_id: previousResponse.id,
    });
    return JSON.parse(response.output_text);
}