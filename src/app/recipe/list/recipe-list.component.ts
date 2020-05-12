import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent {
  @Input() recipes: Array<Recipe>;
  @Output() recipeSelected = new EventEmitter<Recipe>();

  onRecipeSelected(recipeElement: Recipe): void {
    this.recipeSelected.emit(recipeElement);
  }

  constructor() {}
}
