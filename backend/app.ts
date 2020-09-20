import { ErrorMiddleware } from './middlewares/errorMiddleware.ts';
import { Application } from 'https://deno.land/x/abc@v1/mod.ts'
import { abcCors } from 'https://deno.land/x/cors/abcCors.ts'
import { getIngredients } from './controller/ingredientsController.ts'
import { addToFridge, getFridgeContent } from './controller/fridgeController.ts'
import "https://deno.land/x/denv/mod.ts";

const PORT = 7700

const app = new Application()

app.use(abcCors())
   .get('/ingredients', getIngredients)
   .options('/fridge', (c) => c, abcCors())
   .post('/fridge', addToFridge)
   .get('/fridge', getFridgeContent)
   .start({ port: PORT })

console.log(`Listening on port ${PORT} ...`)