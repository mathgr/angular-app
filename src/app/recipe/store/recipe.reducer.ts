import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
  recipes: Array<Recipe>,
}

const initialState: State = {
  recipes: [],
}

export function recipeReducer(
  state = initialState,
  action: RecipeActions.RecipeActions,
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case RecipeActions.UPDATE_RECIPE:
      const recipeIndex = state.recipes.findIndex(recipe => recipe.slug === action.payload.slug);
      const updatedRecipe = {
        ...state.recipes[recipeIndex],
        ...action.payload.recipe,
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[recipeIndex] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes,
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe.slug !== action.payload),
      };
    default:
      return state;
  }
}
