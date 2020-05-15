import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  form: FormGroup;

  get editMode(): boolean {
    return this.recipe != null;
  }

  get recipeIngredientsControls(): AbstractControl[] {
    return (<FormArray>this.form.get('recipeIngredients')).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
  ) {}

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.recipe = data['recipe'];
          this.initForm();
        }
      );
  }

  initForm() {
    let recipeIngredients= [];
    if (this.editMode) {
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
    }

    this.form = new FormGroup({
      'recipeName': new FormControl(
        this.editMode ? this.recipe.name : '',
        Validators.required
        ),
      'recipeDescription': new FormControl(
        this.editMode ? this.recipe.description : '',
        Validators.required
      ),
      'recipeImagePath': new FormControl(
        this.editMode ? this.recipe.imagePath : '',
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
      this.recipeService.updateRecipe(this.recipe.slug, editedRecipe);
    } else {
      this.recipeService.addRecipe(editedRecipe);
    }

    this.router.navigate(['..'], {relativeTo: this.route});
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
