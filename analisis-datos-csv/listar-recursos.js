import 'dotenv/config';
import fetch from "node-fetch";

// Listar contenedores API Ref: https://platform.openai.com/docs/api-reference/containers/listContainers

const response = await fetch("https://api.openai.com/v1/containers", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

const containers = await response.json();
console.log(containers.first_id);
console.log('---------------------');

const filesResponse = await fetch(`https://api.openai.com/v1/containers/${containers.first_id}/files`, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

const containerFiles = await filesResponse.json();
console.log(containerFiles);