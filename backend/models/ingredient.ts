export interface Ingredient {
    _id: {
        $oid: string;
      };
    name: string;
    type: string;
}

export interface NewIngredient {
    name: string;
    type: string;
}