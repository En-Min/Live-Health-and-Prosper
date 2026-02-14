import type { Recipe } from "./recipe";
import type { MealSlot } from "@/lib/constants";

export interface MealPlan {
  id: string;
  user_id: string;
  week_start: string; // ISO date (Monday)
  name: string | null;
  created_at: string;
  updated_at: string;
  entries?: MealPlanEntry[];
}

export interface MealPlanEntry {
  id: string;
  meal_plan_id: string;
  recipe_id: string;
  day_of_week: number; // 0 = Monday, 6 = Sunday
  meal_slot: MealSlot;
  sort_order: number;
  recipe?: Recipe;
}
