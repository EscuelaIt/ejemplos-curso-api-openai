import 'dotenv/config';
import { processTicket } from "./process-ticket.js";

// const message = `Quisiera saber cuándo se va a renovar la suscripción de mi usuario miguel@escuela.it`;
// const message = `Hola, no puedo acceder al curso de JavaScript avanzado. Me da error desde esta mañana y no sé si es problema mío o de la plataforma.`;
const message = `No puedo acceder a mi cuenta. Olvidé la contraseña y tampoco me llega el correo de recuperación. Es urgente porque tengo que enviar un informe.`;
// const message = `No puedo acceder a mi cuenta miguel@.t. Olvidé la contraseña ¿Podéis enviarme una nueva?`;

const response = await processTicket(message);
console.log(response);