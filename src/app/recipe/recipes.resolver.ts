import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/services/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})
export class RecipesResolver implements Resolve<Array<Recipe>> {

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Array<Recipe>> | Promise<Array<Recipe>> | Array<Recipe> {
    const recipes = this.recipeService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    }

    return recipes;
  }
}
