import { ErrorMiddleware } from './middlewares/errorMiddleware.ts';
import { Application } from 'https://deno.land/x/abc@v1/mod.ts'
import { abcCors } from 'https://deno.land/x/cors/abcCors.ts'
import { getIngredients } from './controller/ingredientsController.ts'
import "https://deno.land/x/denv/mod.ts";

const PORT = 7700

const app = new Application()

app.use(abcCors())

app.get('/ingredients', getIngredients)

console.log(`Listening on port ${PORT} ...`)
app.start({ port: PORT })