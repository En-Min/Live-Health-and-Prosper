export const APP_NAME = "Live Health & Prosper";
export const APP_DESCRIPTION = "Biohacking-inspired meal planning powered by science";

export const MEAL_SLOTS = ["breakfast", "lunch", "dinner", "snack"] as const;
export type MealSlot = (typeof MEAL_SLOTS)[number];

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const NUTRIENT_TARGETS = {
  calories: 2000,
  protein: 130, // grams
  carbs: 250,
  fat: 65,
  fiber: 35,
  vitaminC: 90, // mg
  vitaminD: 20, // mcg
  calcium: 1000, // mg
  iron: 18, // mg
  omega3: 1.6, // g
} as const;

export const GROCERY_AISLES = [
  "Produce",
  "Proteins",
  "Dairy & Eggs",
  "Grains & Bread",
  "Nuts & Seeds",
  "Oils & Condiments",
  "Frozen",
  "Spices & Herbs",
  "Supplements",
  "Other",
] as const;
export type GroceryAisle = (typeof GROCERY_AISLES)[number];

export const RECIPE_CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Smoothie",
  "Supplement",
] as const;
export type RecipeCategory = (typeof RECIPE_CATEGORIES)[number];

export const DIFFICULTY_LEVELS = ["Easy", "Medium", "Advanced"] as const;
export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number];
