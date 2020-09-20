import { IngredientToAdd } from './../model/ingredientToAdd';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../model/ingredient';
import { environment } from 'src/environments/environment';
import { Fridge, FridgeContent } from '../model/fridge';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {

  constructor(private http: HttpClient) { }

  getAllIngredients() {
    return this.http.get<Ingredient[]>(`${environment.api}/ingredients`);
  }

  add(postBody: IngredientToAdd) {
    return this.http.post(`${environment.api}/fridge`, postBody);
  }

  getAllFridgeContent() {
    return this.http.get<FridgeContent[]>(`${environment.api}/fridge`);
  }

}
