import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { SlugifyService } from '../shared/services/slugify.service';
import { ShoppingListService } from '../shopping/list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipesChanged = new Subject<Array<Recipe>>();

  private recipes: Array<Recipe> = [];

  constructor(
    private shoppingListService: ShoppingListService,
  ) {}

  getRecipes(): Array<Recipe> {
    return this.recipes.slice();
  }

  setRecipes(recipes: Array<Recipe>): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }

  getRecipeBySlug(slug: string): Recipe {
    return this.recipes.find(
      (recipe: Recipe) => recipe.slug === slug
    );
  }

  getIndexBySlug(slug: string): number {
    return this.recipes.findIndex((recipe: Recipe) => recipe.slug === slug);
  }

  addRecipe(recipe: Recipe) {
    recipe.slug = SlugifyService.slugify(recipe.name);
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(slug: string, recipe: Recipe) {
    const indexOfRecipe = this.getIndexBySlug(slug);
    recipe.slug = SlugifyService.slugify(recipe.name);
    this.recipes[indexOfRecipe] = recipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(slug: string) {
    const indexOfRecipe = this.getIndexBySlug(slug);
    this.recipes.splice(indexOfRecipe, 1);
    this.recipesChanged.next(this.getRecipes());
  }

  addIngredientsToShoppingList(ingredients: Array<Ingredient>): void {
    this.shoppingListService.addIngredients(ingredients);
  }
}
