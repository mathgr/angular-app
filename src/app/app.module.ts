import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './layout/header/header.component';
import { RecipeListItemComponent } from './recipe/list/item/recipe-list-item.component';
import { RecipeListComponent } from './recipe/list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeShowComponent } from './recipe/show/recipe-show.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { DropdownDirective } from './shared/directive/dropdown.directive';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
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
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRouting,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
