import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    // loadChildren: './auth/auth.module#AuthModule',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRouting {}
