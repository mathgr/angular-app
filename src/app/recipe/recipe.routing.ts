import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { RecipeEditComponent } from './edit/recipe-edit.component';
import { RecipeComponent } from './recipe.component';
import { RecipesResolver } from './recipes.resolver';
import { RecipeShowDefaultComponent } from './show/recipe-show-default/recipe-show-default.component';
import { RecipeShowComponent } from './show/recipe-show.component';

const routes: Routes = [
  {
    path: '',
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
        component: RecipeShowComponent,
      },
      {
        path: ':slug/edit',
        component: RecipeEditComponent,
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRouting {}
