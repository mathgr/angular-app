import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../../recipe/recipe.model';

import { RecipeService } from '../../recipe/recipe.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
  ) {}

  saveRecipes(): void {
    this.http
      .put('https://angular-recipe-app-889bb.firebaseio.com/recipes.json', this.recipeService.getRecipes())
      .subscribe();
  }

  fetchRecipes() {
    return this.http
      .get<Array<Recipe>>('https://angular-recipe-app-889bb.firebaseio.com/recipes.json')
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
