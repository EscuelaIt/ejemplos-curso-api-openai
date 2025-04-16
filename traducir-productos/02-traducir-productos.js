import 'dotenv/config';
import { translateProduct } from './translation-service.js';
import { products3 } from './products/products3.js';

products3.forEach( async product => {
  const translatedProduct = await translateProduct(product);
  console.log(translatedProduct);
});

