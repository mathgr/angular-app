import { Component } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent {
  ingredients: Array<Ingredient> = [
    new Ingredient('Farine', 0.8),
    new Ingredient('Oeufs', 2.6),
    new Ingredient('Sucre', 1.2),
  ];

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
