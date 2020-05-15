import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Array<Recipe>;
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
  ) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipesChanged
      .subscribe((recipes: Array<Recipe>) => this.recipes = recipes);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
