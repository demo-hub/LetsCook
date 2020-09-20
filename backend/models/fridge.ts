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