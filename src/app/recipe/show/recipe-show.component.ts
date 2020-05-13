import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-show',
  templateUrl: './recipe-show.component.html',
})
export class RecipeShowComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
  ) {}

  ngOnInit() {
    this.recipeService.selectedRecipe.subscribe(
      (recipe: Recipe) => this.recipe = recipe
    )
  }

  addIngredientsToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
