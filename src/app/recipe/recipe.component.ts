import { Component } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
})
export class RecipeComponent {
  recipes: Array<Recipe> = [
    new Recipe('Recipe #1', 'Description #1', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('Recipe #2', 'Description #2', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('Recipe #3', 'Description #3', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
  ];
  selectedRecipe: Recipe;

  changeSelectedRecipe(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }
}
