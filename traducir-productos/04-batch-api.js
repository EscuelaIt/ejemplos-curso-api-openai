import 'dotenv/config';
import { getBatchObject } from './batch-modules/get-batch-object.js';
import { downloadBatchResults } from './batch-modules/download-batch-results.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateBatchJsonl } from './batch-modules/generate-batch-jsonl.js';
import { uploadFile } from './batch-modules/upload-file.js';
import { createBatch } from './batch-modules/create-batch.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, 'products', 'products20.json');
const jsonlPath = path.join(__dirname, 'products', 'batchinput.jsonl');

const products = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const batchContent = generateBatchJsonl(products);

fs.writeFileSync(jsonlPath, batchContent);
console.log('Generación jsonl terminada');

const batchFileId = await uploadFile(jsonlPath);
const batchId = await createBatch(batchFileId);

console.log(batchId);
//const batchId = "batch_67ffb590acf88190af3ce436551f98bf";

const timer = setInterval( async () => {
  const batch = await getBatchObject(batchId);
  console.log(batch.status);
  if(batch.status === 'completed') {
    clearInterval(timer);
    await downloadBatchResults(batchId);
    console.log('Archivo de resultados guardado');
  }
  if(batch.status === 'failed' || batch.status === 'cancelled' || batch.status ===  'expired' ) {
    clearInterval(timer);
    console.error('El trabajo batch no ha podido ser realizado');
  }
}, 10000);