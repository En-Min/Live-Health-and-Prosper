import { seedIngredients } from "./ingredients";
import { seedRecipes } from "./recipes";
import type { Recipe, Ingredient, RecipeIngredient } from "@/types/recipe";

// Generate stable UUIDs from seed data for development
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  return `${hex.slice(0, 8)}-${hex.slice(0, 4)}-4${hex.slice(1, 4)}-8${hex.slice(1, 4)}-${hex.slice(0, 8)}${hex.slice(0, 4)}`;
}

// Build ingredient lookup map
const ingredientMap = new Map<string, Ingredient>();
seedIngredients.forEach((si) => {
  const id = simpleHash(si.name);
  ingredientMap.set(si.name, {
    id,
    ...si,
  });
});

// Build recipe data with resolved ingredients
export const recipes: Recipe[] = seedRecipes.map((sr) => {
  const recipeId = simpleHash(sr.slug);

  const recipe_ingredients: RecipeIngredient[] = sr.ingredients.map((ri, index) => {
    const ingredient = ingredientMap.get(ri.name);
    return {
      id: simpleHash(`${sr.slug}-${ri.name}-${index}`),
      recipe_id: recipeId,
      ingredient_id: ingredient?.id ?? simpleHash(ri.name),
      quantity: ri.quantity,
      unit: ri.unit,
      preparation: ri.preparation ?? null,
      sort_order: index,
      ingredient: ingredient ?? undefined,
    };
  });

  return {
    id: recipeId,
    title: sr.title,
    slug: sr.slug,
    description: sr.description,
    category: sr.category,
    difficulty: sr.difficulty,
    prep_time_minutes: sr.prep_time_minutes,
    cook_time_minutes: sr.cook_time_minutes,
    servings: sr.servings,
    image_url: sr.image_url ?? null,
    instructions: sr.instructions,
    science_notes: sr.science_notes,
    tags: sr.tags,
    total_calories: sr.total_calories,
    total_protein: sr.total_protein,
    total_carbs: sr.total_carbs,
    total_fat: sr.total_fat,
    total_fiber: sr.total_fiber,
    is_blueprint: sr.is_blueprint,
    created_at: new Date().toISOString(),
    recipe_ingredients,
  };
});

export const ingredients: Ingredient[] = Array.from(ingredientMap.values());

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function searchRecipes(query: string, category?: string): Recipe[] {
  let filtered = recipes;

  if (category) {
    filtered = filtered.filter((r) => r.category === category);
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return filtered;
}
