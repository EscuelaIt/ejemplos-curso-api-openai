import 'dotenv/config';
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const args = process.argv.slice(2);
const containerArg = args.find(arg => arg.startsWith("containerId="));

if (!containerArg) {
  console.error("Error: Debes proporcionar un containerId. Ejemplo: node usar-contenedor.js containerId=cntr_123");
  process.exit(1);
}
const containerId = containerArg.split("=")[1];
console.log(containerId);

try {
  const resp = await client.responses.create({
      model: "gpt-4.1",
      tools: [
        {
          type: "code_interpreter",
          container: containerId
        }
      ],
      tool_choice: "required",
      input: "Basado en el CSV que tienes subido al container usa el contenedor para ejecutar python y analizar el csv que especifica el número de huracanes por meses a lo largo de años, ¿Qué meses son más y menos seguros para una visita a este lugar?. Crea una gráfica para reforzar la solución y que sea más visual."
  });
  console.log(resp.output_text);
} catch (err) {
  console.log('Error encontrado: ', err);
}