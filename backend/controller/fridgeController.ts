import { Fridge, IngredientToAdd } from './../models/fridge.ts';
import db from '../database/db.ts';
import { HandlerFunc, Context } from "https://deno.land/x/abc@v1/mod.ts";
import { ErrorHandler } from '../middlewares/errorMiddleware.ts';

const database = db.getDatabase;
const fridge = database.collection<Fridge>('fridge');

export const addToFridge: HandlerFunc = async (c: Context) => {
    try {
      if (c.request.headers.get("content-type") !== "application/json") {
        throw new ErrorHandler("Invalid body", 422);
      }
      const body = await (c.body<IngredientToAdd>());
      if (!Object.keys(body).length) {
        throw new ErrorHandler("Request body can not be empty!", 400);
      }
      const { ingredient, quant } = body;

      const fridgeIngredient = await fridge.findOne({ ingredient: ingredient });

      let insertedIngredient;

      if (fridgeIngredient) {
        const { matchedCount, modifiedCount, upsertedId } = await fridge.updateOne(
            { _id: fridgeIngredient._id }, { $set: { quant: fridgeIngredient.quant + quant } })

        insertedIngredient = await fridge.findOne({ _id: fridgeIngredient._id });
      } else {
        insertedIngredient = await fridge.insertOne({
            ingredient,
            quant
          });
      }

      return c.json(JSON.stringify(insertedIngredient), 201);
    } catch (error) {
      throw new ErrorHandler(error.message, error.status || 500);
    }
  };

  export const getFridgeContent: HandlerFunc = async (c: Context) => {
    try {
        let allFridge: Fridge[] = await fridge.find({quant:{$ne: null}});

        if (allFridge) {
            const list = allFridge.length
            ? allFridge.map((fridge) => {
                const { _id: { $oid }, ingredient, quant } = fridge;
                return { id: $oid, ingredient, quant };
            })
            : [];
            return c.json(list, 200);
        }
    } catch (error) {
        throw new ErrorHandler(error.message, error.status || 500);
    }
  };