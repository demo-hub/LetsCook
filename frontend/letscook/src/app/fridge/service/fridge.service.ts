import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../model/ingredient';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {

  constructor(private http: HttpClient) { }

  getAllIngredients() {
    return this.http.get<Ingredient[]>(`${environment.api}/ingredients`);
  }

}
