import { clasificarTicket } from "./02-datos-estructurados-respuestas.js";

const tickets = [
  "No puedo acceder al campus virtual, me sale un error 403 cuando intento entrar desde el móvil.",
  "Hice el pago pero no me aparece acceso al curso de React. Necesito solucionarlo antes del lunes.",
  "Tengo problemas de audio en las clases en vivo, se corta constantemente.",
  "Me equivoqué de curso al inscribirme, ¿pueden cambiarme al curso de Vue.js?",
  "Estoy teniendo problemas para emitir la factura a nombre de mi empresa, ¿me pueden ayudar con eso?"
];

console.log("Simulación de tickets para EscuelaIT\n");

for (let i = 0; i < tickets.length; i++) {
  const texto = tickets[i];
  console.log(`Ticket #${i + 1}`);
  console.log(`Solicitud: ${texto}\n`);

  try {
    const resultado = await clasificarTicket(texto);
    console.log("Clasificación y respuesta:");
    console.log(JSON.stringify(resultado, null, 2));
    console.log("\n" + "-".repeat(80) + "\n");
  } catch (err) {
    console.error("Error al clasificar el ticket:", err.message);
  }
}