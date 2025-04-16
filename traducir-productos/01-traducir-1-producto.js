import 'dotenv/config';
import { translateProduct } from './translation-service.js';

const product = {
  "title": "UltraWide 34'' Monitor",
  "description": "Experience immersive multitasking with a stunning 3440x1440 resolution. \n\nPerfect for video editing, productivity, and gaming alike.",
  "image": "https://via.placeholder.com/300x200?text=Monitor"
};

const translatedProduct = await translateProduct(product);
console.log(translatedProduct);