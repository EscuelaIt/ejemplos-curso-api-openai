import 'dotenv/config';
import fs from 'fs';
import fetch from 'node-fetch'; // asegúrate de tenerlo instalado
// npm install node-fetch

const containerId = 'cntr_68480251873081988176ce98281abf0d';
const fileId = 'cfile_68480c9b87048191b4c6424682e13411';

const url = `https://api.openai.com/v1/containers/${containerId}/files/${fileId}/content`;

try {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error HTTP ${response.status}: ${errorText}`);
  }

  const buffer = await response.arrayBuffer();
  const outputPath = './output.png';

  fs.writeFileSync(outputPath, Buffer.from(buffer));
  console.log(`✅ Imagen guardada en: ${outputPath}`);
} catch (err) {
  console.error("❌ Error al descargar el contenido:", err.message);
}
