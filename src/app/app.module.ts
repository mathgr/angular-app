import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { HeaderComponent } from './layout/header/header.component';
import { RecipeListItemComponent } from './recipe/list/item/recipe-list-item.component';
import { RecipeListComponent } from './recipe/list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeShowComponent } from './recipe/show/recipe-show.component';
import { DropdownDirective } from './shared/directive/dropdown.directive';
import { ShoppingAddComponent } from './shopping/list/add/shopping-add.component';
import { ShoppingListComponent } from './shopping/list/shopping-list.component';
import { RecipeShowDefaultComponent } from './recipe/show/recipe-show-default/recipe-show-default.component';
import { RecipeEditComponent } from './recipe/edit/recipe-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingAddComponent,
    RecipeComponent,
    RecipeListComponent,
    RecipeListItemComponent,
    RecipeShowComponent,
    RecipeShowDefaultComponent,
    RecipeEditComponent,
    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
