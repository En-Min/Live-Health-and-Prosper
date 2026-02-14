import type { GroceryAisle } from "@/lib/constants";

export interface GroceryList {
  id: string;
  user_id: string;
  meal_plan_id: string | null;
  name: string;
  created_at: string;
  updated_at: string;
  items?: GroceryListItem[];
}

export interface GroceryListItem {
  id: string;
  grocery_list_id: string;
  ingredient_id: string | null;
  name: string;
  quantity: number;
  unit: string;
  aisle: GroceryAisle;
  is_checked: boolean;
  is_custom: boolean;
  sort_order: number;
}
