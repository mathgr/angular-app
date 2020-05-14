import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeEditComponent } from './recipe/edit/recipe-edit.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeResolver } from './recipe/recipe.resolver';
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
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting {}
