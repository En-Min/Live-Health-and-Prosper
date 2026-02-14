import type { MealSlot } from "@/lib/constants";

export interface BlueprintWeekEntry {
  day_of_week: number; // 0=Mon, 6=Sun
  meal_slot: MealSlot;
  recipe_slug: string;
}

// Bryan Johnson's Blueprint-inspired weekly template
// Rotates through the 12 seed recipes across 7 days
export const blueprintWeekTemplate: BlueprintWeekEntry[] = [
  // Monday
  { day_of_week: 0, meal_slot: "breakfast", recipe_slug: "nutty-pudding" },
  { day_of_week: 0, meal_slot: "lunch", recipe_slug: "super-veggie" },
  { day_of_week: 0, meal_slot: "dinner", recipe_slug: "longevity-bowl" },
  { day_of_week: 0, meal_slot: "snack", recipe_slug: "omega-power-bites" },
  // Tuesday
  { day_of_week: 1, meal_slot: "breakfast", recipe_slug: "blueprint-overnight-oats" },
  { day_of_week: 1, meal_slot: "lunch", recipe_slug: "anti-inflammatory-golden-bowl" },
  { day_of_week: 1, meal_slot: "dinner", recipe_slug: "gut-restore-soup" },
  { day_of_week: 1, meal_slot: "snack", recipe_slug: "green-giant-smoothie" },
  // Wednesday
  { day_of_week: 2, meal_slot: "breakfast", recipe_slug: "nutty-pudding" },
  { day_of_week: 2, meal_slot: "lunch", recipe_slug: "super-veggie" },
  { day_of_week: 2, meal_slot: "dinner", recipe_slug: "blueprint-stir-fry" },
  { day_of_week: 2, meal_slot: "snack", recipe_slug: "dark-chocolate-avocado-mousse" },
  // Thursday
  { day_of_week: 3, meal_slot: "breakfast", recipe_slug: "blueprint-overnight-oats" },
  { day_of_week: 3, meal_slot: "lunch", recipe_slug: "anti-inflammatory-golden-bowl" },
  { day_of_week: 3, meal_slot: "dinner", recipe_slug: "longevity-bowl" },
  { day_of_week: 3, meal_slot: "snack", recipe_slug: "chocolate-seed-smoothie" },
  // Friday
  { day_of_week: 4, meal_slot: "breakfast", recipe_slug: "nutty-pudding" },
  { day_of_week: 4, meal_slot: "lunch", recipe_slug: "super-veggie" },
  { day_of_week: 4, meal_slot: "dinner", recipe_slug: "gut-restore-soup" },
  { day_of_week: 4, meal_slot: "snack", recipe_slug: "omega-power-bites" },
  // Saturday
  { day_of_week: 5, meal_slot: "breakfast", recipe_slug: "blueprint-overnight-oats" },
  { day_of_week: 5, meal_slot: "lunch", recipe_slug: "anti-inflammatory-golden-bowl" },
  { day_of_week: 5, meal_slot: "dinner", recipe_slug: "blueprint-stir-fry" },
  { day_of_week: 5, meal_slot: "snack", recipe_slug: "beet-berry-recovery-smoothie" },
  // Sunday
  { day_of_week: 6, meal_slot: "breakfast", recipe_slug: "nutty-pudding" },
  { day_of_week: 6, meal_slot: "lunch", recipe_slug: "super-veggie" },
  { day_of_week: 6, meal_slot: "dinner", recipe_slug: "longevity-bowl" },
  { day_of_week: 6, meal_slot: "snack", recipe_slug: "dark-chocolate-avocado-mousse" },
];
