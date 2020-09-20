import { NewIngredient } from './../models/ingredient.ts';
import db from '../database/db.ts';
import { Ingredient } from '../models/ingredient.ts';
import { HandlerFunc, Context } from "https://deno.land/x/abc@v1/mod.ts";
import { ErrorHandler } from '../middlewares/errorMiddleware.ts';

const database = db.getDatabase;
const ingredients = database.collection<Ingredient>('ingredients');

export const getIngredients: HandlerFunc = async (c: Context) => {
    try {
        let allIngredients: Ingredient[] = await ingredients.find({name:{$ne: null}});

        if (allIngredients) {
            if (!allIngredients.length) {
                await ingredients.insertMany([{
                    name: "Potato",
                    type: "Type",
                  },
                  {
                    name: "Carrot",
                    type: "Type",
                  },
                  {
                    name: "Onion",
                    type: "Type",
                  }]);

                  allIngredients = await ingredients.find({name:{$ne: null}});
            }
            const list = allIngredients.length
            ? allIngredients.map((ingredient) => {
                const { _id: { $oid }, name, type } = ingredient;
                return { id: $oid, name, type };
            })
            : [];
            return c.json(list, 200);
        }
    } catch (error) {
        throw new ErrorHandler(error.message, error.status || 500);
    }
  };

  export const addIngredient: HandlerFunc = async (c: Context) => {
    try {
      if (c.request.headers.get("content-type") !== "application/json") {
        throw new ErrorHandler("Invalid body", 422);
      }
      const body = await (c.body<NewIngredient>());
      if (!Object.keys(body).length) {
        throw new ErrorHandler("Request body can not be empty!", 400);
      }
      const { name, type } = body;

      const insertedIngredient = await ingredients.insertOne({
        name,
        type
      });

      return c.json(insertedIngredient, 201);
    } catch (error) {
      throw new ErrorHandler(error.message, error.status || 500);
    }
  };