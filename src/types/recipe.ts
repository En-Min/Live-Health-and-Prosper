export interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: string;
  prep_time_minutes: number;
  cook_time_minutes: number;
  servings: number;
  image_url: string | null;
  instructions: InstructionStep[];
  science_notes: ScienceNote[] | null;
  tags: string[];
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
  total_fiber: number;
  is_blueprint: boolean;
  created_at: string;
  recipe_ingredients?: RecipeIngredient[];
}

export interface InstructionStep {
  step: number;
  text: string;
  duration_minutes?: number;
}

export interface ScienceNote {
  title: string;
  content: string;
  citation?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  grocery_aisle: string;
  calories_per_100g: number;
  protein_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
  fiber_per_100g: number;
}

export interface RecipeIngredient {
  id: string;
  recipe_id: string;
  ingredient_id: string;
  quantity: number;
  unit: string;
  preparation: string | null;
  sort_order: number;
  ingredient?: Ingredient;
}
