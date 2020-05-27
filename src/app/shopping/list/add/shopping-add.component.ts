import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../../shared/ingredient.model';
import * as ShoppingListActions from '../../store/shopping-list.actions';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-shopping-add',
  templateUrl: './shopping-add.component.html',
  styleUrls: ['./shopping-add.component.css'],
})
export class ShoppingAddComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientForm') ingredientForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(stateData => {
        if (stateData.editedIngredientIndex === -1) {
          this.editMode = false;

          return;
        }

        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.ingredientForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount,
        });

        return;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEditIngredient());
  }

  onSubmit() {
    const ingredient = new Ingredient(
      this.ingredientForm.value['name'],
      this.ingredientForm.value['amount'],
    );

    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onReset();
  }

  onReset() {
    this.ingredientForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEditIngredient());
  }
}
