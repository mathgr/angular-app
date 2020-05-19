import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { RecipeEditComponent } from './recipe/edit/recipe-edit.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeResolver } from './recipe/recipe.resolver';
import { RecipesResolver } from './recipe/recipes.resolver';
import { RecipeShowDefaultComponent } from './recipe/show/recipe-show-default/recipe-show-default.component';
import { RecipeShowComponent } from './recipe/show/recipe-show.component';
import { ShoppingListComponent } from './shopping/list/shopping-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    component: RecipeComponent,
    canActivate: [AuthGuard],
    resolve: [RecipesResolver],
    children: [
      {
        path: '',
        component: RecipeShowDefaultComponent,
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':slug',
        resolve: {
          recipe: RecipeResolver,
        },
        component: RecipeShowComponent,
      },
      {
        path: ':slug/edit',
        resolve: {
          recipe: RecipeResolver,
        },
        component: RecipeEditComponent,
      },
    ]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting {}
