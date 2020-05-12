import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-add',
  templateUrl: './shopping-add.component.html',
})
export class ShoppingAddComponent {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  onSubmit() {
    this.ingredientAdded.emit(new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value));
  }
}
