import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as fromRecipe from '../store/recipe.reducer';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-show',
  templateUrl: './recipe-show.component.html',
})
export class RecipeShowComponent implements OnInit {
  slug: string;
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params: Params) => params['slug']),
        switchMap((slug: string) => {
          this.slug = slug;

          return this.store.select('recipe')
        }),
        map((recipeState: fromRecipe.State) => recipeState.recipes),
        map((recipes: Array<Recipe>) => recipes.find(recipe => recipe.slug === this.slug))
      )
      .subscribe((recipe: Recipe) => this.recipe = recipe);
  }

  addIngredientsToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.slug));
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
