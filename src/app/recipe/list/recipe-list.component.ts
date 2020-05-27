import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Array<Recipe>;
  subscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('recipe')
      .pipe(map(recipeState => recipeState.recipes))
      .subscribe((recipes: Array<Recipe>) => this.recipes = recipes);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
