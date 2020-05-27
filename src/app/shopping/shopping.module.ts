import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ShoppingAddComponent } from './list/add/shopping-add.component';
import { ShoppingListComponent } from './list/shopping-list.component';
import { ShoppingRouting } from './shopping.routing';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingAddComponent,
  ],
  imports: [
    FormsModule,
    ShoppingRouting,
    SharedModule,
  ]
})
export class ShoppingModule {}
