import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;

  get editMode(): boolean {
    return this.recipe != null;
  }

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => this.recipe = data['recipe']
      );
  }
}
