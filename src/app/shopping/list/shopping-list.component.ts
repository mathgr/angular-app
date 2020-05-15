import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Array<Ingredient>;
  private ingredientsChangeSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
  ) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Array<Ingredient>) => this.ingredients = ingredients
    );
  }

  ngOnDestroy() {
    this.ingredientsChangeSub.unsubscribe();
  }

  onEditIngredient(index: number) {
    this.shoppingListService.startingEditing.next(index);
  }
}
