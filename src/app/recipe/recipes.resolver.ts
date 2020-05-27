import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipe/store/recipe.actions';

@Injectable({providedIn: 'root'})
export class RecipesResolver implements Resolve<Array<Recipe>> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Array<Recipe>> | Promise<Array<Recipe>> | Array<Recipe> {
    return this.store
      .select('recipe')
      .pipe(
        take(1),
        map( recipesState => recipesState.recipes),
        switchMap(recipes => {
          if (recipes.length === 0) {
            this.store.dispatch(new RecipeActions.FetchRecipes());

            return this.actions$.pipe(
              ofType(RecipeActions.SET_RECIPES),
              take(1),
            );
          }

          return of(recipes);
        })
      )
  }
}
