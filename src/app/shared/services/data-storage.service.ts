import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../../recipe/recipe.model';

import { RecipeService } from '../../recipe/recipe.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  readonly RECIPE_ENDPOINT = 'https://angular-recipe-app-889bb.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
  ) {}

  saveRecipes(): void {
    this.http
      .put(this.RECIPE_ENDPOINT, this.recipeService.getRecipes())
      .subscribe();
  }

  fetchRecipes() {
    return this.http
      .get<Array<Recipe>>(this.RECIPE_ENDPOINT)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []};
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}
