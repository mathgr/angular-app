import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as fromRecipe from '../store/recipe.reducer';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  slug: string;
  recipe: Recipe;
  form: FormGroup;

  private storeSub: Subscription;

  get editMode(): boolean {
    return this.slug != null;
  }

  get recipeIngredientsControls(): AbstractControl[] {
    return (<FormArray>this.form.get('recipeIngredients')).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params: Params) => params['slug']),
      )
      .subscribe((slug: string) => {
        this.slug = slug;
        this.initForm();
      })
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients= [];

    if (this.editMode) {
      this.storeSub = this.store.select('recipe')
        .pipe(
          map((recipeState: fromRecipe.State) => recipeState.recipes.find((recipe: Recipe) => recipe.slug === this.slug))
        )
        .subscribe((recipe: Recipe) => {
          if (!recipe) {
            return;
          }

          this.recipe = recipe;

          recipeName = this.recipe.name;
          recipeDescription = this.recipe.description;
          recipeImagePath = this.recipe.imagePath;
          recipeIngredients = this.recipe.ingredients
            .map((ingredient: Ingredient) => {
              return new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ]),
              });
          });
        })

    }

    this.form = new FormGroup({
      'recipeName': new FormControl(
        recipeName,
        Validators.required
        ),
      'recipeDescription': new FormControl(
        recipeDescription,
        Validators.required
      ),
      'recipeImagePath': new FormControl(
        recipeImagePath,
        Validators.required),
      'recipeIngredients': new FormArray(recipeIngredients),
    });
  }

  onSubmit() {
    const editedRecipe = new Recipe(
      this.form.value['recipeName'],
      this.form.value['recipeDescription'],
      this.form.value['recipeImagePath'],
      this.form.value['recipeIngredients'].map((ingredient: Ingredient) => {
        return new Ingredient(ingredient.name, ingredient.amount);
      }),
    );

    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({slug: this.slug, recipe: editedRecipe}));
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(editedRecipe));
    }

    this.router.navigate(['../..', editedRecipe.slug], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.form.get('recipeIngredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.form.get('recipeIngredients')).removeAt(index);
  }
}
