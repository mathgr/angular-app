import { Ingredient } from '../shared/ingredient.model';
import { SlugifyService } from '../shared/services/slugify.service';

export class Recipe {
  public slug: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Array<Ingredient>

  constructor(name: string, description: string, imagePath: string, ingredients: Array<Ingredient>) {
    this.slug = SlugifyService.slugify(name);
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
