import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { RecipeListItemComponent } from './recipe/list/item/recipe-list-item.component';
import { RecipeListComponent } from './recipe/list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeShowComponent } from './recipe/show/recipe-show.component';
import { ShoppingAddComponent } from './shopping/list/add/shopping-add.component';
import { ShoppingListComponent } from './shopping/list/shopping-list.component';

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
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
