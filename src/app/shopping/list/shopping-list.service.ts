import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredientsChanged = new Subject<Array<Ingredient>>();
  private ingredients: Array<Ingredient> = [
    new Ingredient('Farine', 0.8),
    new Ingredient('Oeufs', 2.6),
    new Ingredient('Sucre', 1.2),
  ];

  getIngredients(): Array<Ingredient> {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Array<Ingredient>): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next((this.ingredients.slice()));
  }
}
