import { ErrorMiddleware } from './middlewares/errorMiddleware.ts';
import { Application, HttpMethod, DefaultSkipper, CORSConfig } from 'https://deno.land/x/abc@v1/mod.ts'
import { getIngredients } from './controller/ingredientsController.ts'
import "https://deno.land/x/denv/mod.ts";
const DefaultCORSConfig: CORSConfig = {
    skipper: DefaultSkipper,
    allowOrigins: ["*"],
    allowMethods: [
      HttpMethod.Delete,
      HttpMethod.Get,
      HttpMethod.Head,
      HttpMethod.Patch,
      HttpMethod.Post,
      HttpMethod.Put
    ]
  };

const PORT = 7700

const app = new Application()

app.use(cors(DefaultCORSConfig))

app.get('/ingredients', getIngredients)

console.log(`Listening on port ${PORT} ...`)
app.start({ port: PORT })