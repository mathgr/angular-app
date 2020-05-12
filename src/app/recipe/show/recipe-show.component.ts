import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-show',
  templateUrl: './recipe-show.component.html',
})
export class RecipeShowComponent {
  @Input() recipe: Recipe;
}
