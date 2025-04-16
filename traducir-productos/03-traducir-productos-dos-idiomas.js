import 'dotenv/config';
import { translateProduct } from './translation-service-2-idiomas.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'products/products3.json');

fs.readFile(filePath, 'utf8', (err, data) => {
  if(err) {
    console.error(err);
  }
  const products = JSON.parse(data);
  
  products.forEach( async product => {
    const translatedProduct = await translateProduct(product);
    console.log(translatedProduct);
  });

});  


