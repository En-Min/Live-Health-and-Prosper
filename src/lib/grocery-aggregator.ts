import type { MealPlanEntry } from "@/types/meal-plan";
import type { Recipe } from "@/types/recipe";
import type { GroceryListItem } from "@/types/grocery";
import type { GroceryAisle } from "@/lib/constants";
import { GROCERY_AISLES } from "@/lib/constants";

interface MealPlanEntryWithRecipe extends MealPlanEntry {
  recipe?: Recipe;
}

interface AggregatedIngredient {
  ingredientId: string | null;
  name: string;
  quantity: number;
  unit: string;
  aisle: GroceryAisle;
}

/**
 * Aggregates ingredients from meal plan entries into a deduplicated grocery list.
 * Same ingredients across multiple recipes are summed by quantity (when units match).
 * Results are grouped by grocery aisle and sorted alphabetically within each aisle.
 */
export function aggregateGroceryItems(
  entries: MealPlanEntryWithRecipe[]
): GroceryListItem[] {
  // Accumulate by ingredient name + unit (dedup key)
  const map = new Map<string, AggregatedIngredient>();

  for (const entry of entries) {
    if (!entry.recipe?.recipe_ingredients) continue;

    for (const ri of entry.recipe.recipe_ingredients) {
      const name = ri.ingredient?.name ?? "Unknown ingredient";
      const aisle = (ri.ingredient?.grocery_aisle ?? "Other") as GroceryAisle;
      const key = `${name}::${ri.unit}`;

      const existing = map.get(key);
      if (existing) {
        existing.quantity += ri.quantity;
      } else {
        map.set(key, {
          ingredientId: ri.ingredient_id,
          name,
          quantity: ri.quantity,
          unit: ri.unit,
          aisle,
        });
      }
    }
  }

  // Sort by aisle order, then alphabetically within aisle
  const aisleOrder = new Map(GROCERY_AISLES.map((a, i) => [a, i]));
  const sorted = Array.from(map.values()).sort((a, b) => {
    const aisleA = aisleOrder.get(a.aisle) ?? 99;
    const aisleB = aisleOrder.get(b.aisle) ?? 99;
    if (aisleA !== aisleB) return aisleA - aisleB;
    return a.name.localeCompare(b.name);
  });

  // Convert to GroceryListItem shape
  return sorted.map((item, index) => ({
    id: `grocery-${index}-${Date.now().toString(36)}`,
    grocery_list_id: "",
    ingredient_id: item.ingredientId,
    name: item.name,
    quantity: Math.round(item.quantity * 10) / 10, // round to 1 decimal
    unit: item.unit,
    aisle: item.aisle,
    is_checked: false,
    is_custom: false,
    sort_order: index,
  }));
}

/**
 * Groups grocery items by aisle, preserving the canonical aisle order.
 */
export function groupByAisle(
  items: GroceryListItem[]
): { aisle: GroceryAisle; items: GroceryListItem[] }[] {
  const groups = new Map<GroceryAisle, GroceryListItem[]>();

  for (const item of items) {
    const aisle = item.aisle as GroceryAisle;
    if (!groups.has(aisle)) {
      groups.set(aisle, []);
    }
    groups.get(aisle)!.push(item);
  }

  // Return in canonical aisle order
  const aisleOrder = new Map(GROCERY_AISLES.map((a, i) => [a, i]));
  return Array.from(groups.entries())
    .sort(([a], [b]) => (aisleOrder.get(a) ?? 99) - (aisleOrder.get(b) ?? 99))
    .map(([aisle, items]) => ({ aisle, items }));
}
