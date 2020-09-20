import { Ingredient } from './ingredient.ts';
export interface Fridge {
    _id: {
        $oid: string;
      };
    ingredient: string;
    quant: number;
}

export interface IngredientToAdd {
    ingredient: string;
    quant: number;
}

export interface FridgeContent {
    _id: {
        $oid: string;
      };
    ingredient: Ingredient;
    quant: number;
}