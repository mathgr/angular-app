import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredientsChanged = new Subject<Array<Ingredient>>();
  startingEditing = new Subject<number>();
  private ingredients: Array<Ingredient> = [
    new Ingredient('Farine', 1),
    new Ingredient('Oeufs', 3),
    new Ingredient('Sucre', 2),
  ];

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  getIngredients(): Array<Ingredient> {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Array<Ingredient>): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: Ingredient): void {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
