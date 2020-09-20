import { Router }from 'https://deno.land/x/oak/mod.ts'
import { getIngredients } from './controller/ingredientsController'

const router = new Router()
router.get('/ingredients', getIngredients)

export default router