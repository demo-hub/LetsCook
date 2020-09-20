import { Ingredient } from './ingredient';

export interface Fridge {
  id: string;
  ingredient: string;
  quant: number;
}

export interface FridgeContent {
  id: string;
  ingredient: Ingredient;
  quant: number;
}
