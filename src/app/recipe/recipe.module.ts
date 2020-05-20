import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { RecipeEditComponent } from './edit/recipe-edit.component';
import { RecipeListItemComponent } from './list/item/recipe-list-item.component';
import { RecipeListComponent } from './list/recipe-list.component';
import { RecipeComponent } from './recipe.component';
import { RecipeRouting } from './recipe.routing';
import { RecipeShowDefaultComponent } from './show/recipe-show-default/recipe-show-default.component';
import { RecipeShowComponent } from './show/recipe-show.component';

@NgModule({
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    RecipeListItemComponent,
    RecipeShowComponent,
    RecipeShowDefaultComponent,
    RecipeEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RecipeRouting,
    SharedModule,
  ],
})
export class RecipeModule {}
