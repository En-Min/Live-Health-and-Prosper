export interface SeedIngredient {
  name: string;
  category: string;
  grocery_aisle: string;
  calories_per_100g: number;
  protein_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
  fiber_per_100g: number;
}

export const seedIngredients: SeedIngredient[] = [
  // === Vegetables ===
  { name: "Broccoli", category: "Vegetable", grocery_aisle: "Produce", calories_per_100g: 34, protein_per_100g: 2.8, carbs_per_100g: 6.6, fat_per_100g: 0.4, fiber_per_100g: 2.6 },
  { name: "Cauliflower", category: "Vegetable", grocery_aisle: "Produce", calories_per_100g: 25, protein_per_100g: 1.9, carbs_per_100g: 5.0, fat_per_100g: 0.3, fiber_per_100g: 2.0 },
  { name: "Black Lentils", category: "Legume", grocery_aisle: "Grains & Bread", calories_per_100g: 352, protein_per_100g: 25.0, carbs_per_100g: 60.0, fat_per_100g: 1.1, fiber_per_100g: 10.7 },
  { name: "Spinach", category: "Vegetable", grocery_aisle: "Produce", calories_per_100g: 23, protein_per_100g: 2.9, carbs_per_100g: 3.6, fat_per_100g: 0.4, fiber_per_100g: 2.2 },
  { name: "Kale", category: "Vegetable", grocery_aisle: "Produce", calories_per_100g: 49, protein_per_100g: 4.3, carbs_per_100g: 8.8, fat_per_100g: 0.9, fiber_per_100g: 3.6 },
  { name: "Sweet Potato", category: "Vegetable", grocery_aisle: "Produce", calories_per_100g: 86, protein_per_100g: 1.6, carbs_per_100g: 20.1, fat_per_100g: 0.1, fiber_per_100g: 3.0 },
  { name: "Garlic", category: "Vegetable", grocery_aisle: "Produce", calories_per_100g: 149, protein_per_100g: 6.4, carbs_per_100g: 33.1, fat_per_100g: 0.5, fiber_per_100g: 2.1 },
  { name: "Ginger Root", category: "Vegetable", grocery_aisle: "Produce", calories_per_100g: 80, protein_per_100g: 1.8, carbs_per_100g: 17.8, fat_per_100g: 0.8, fiber_per_100g: 2.0 },
  { name: "Mushrooms (Shiitake)", category: "Vegetable", grocery_aisle: "Produce", calories_per_100g: 34, protein_per_100g: 2.2, carbs_per_100g: 6.8, fat_per_100g: 0.5, fiber_per_100g: 2.5 },
  { name: "Red Bell Pepper", category: "Vegetable", grocery_aisle: "Produce", calories_per_100g: 31, protein_per_100g: 1.0, carbs_per_100g: 6.0, fat_per_100g: 0.3, fiber_per_100g: 2.1 },
  { name: "Tomatoes", category: "Vegetable", grocery_aisle: "Produce", calories_per_100g: 18, protein_per_100g: 0.9, carbs_per_100g: 3.9, fat_per_100g: 0.2, fiber_per_100g: 1.2 },
  { name: "Avocado", category: "Fruit", grocery_aisle: "Produce", calories_per_100g: 160, protein_per_100g: 2.0, carbs_per_100g: 8.5, fat_per_100g: 14.7, fiber_per_100g: 6.7 },
  { name: "Onion", category: "Vegetable", grocery_aisle: "Produce", calories_per_100g: 40, protein_per_100g: 1.1, carbs_per_100g: 9.3, fat_per_100g: 0.1, fiber_per_100g: 1.7 },
  { name: "Carrots", category: "Vegetable", grocery_aisle: "Produce", calories_per_100g: 41, protein_per_100g: 0.9, carbs_per_100g: 9.6, fat_per_100g: 0.2, fiber_per_100g: 2.8 },
  { name: "Beets", category: "Vegetable", grocery_aisle: "Produce", calories_per_100g: 43, protein_per_100g: 1.6, carbs_per_100g: 9.6, fat_per_100g: 0.2, fiber_per_100g: 2.8 },

  // === Fruits ===
  { name: "Blueberries", category: "Fruit", grocery_aisle: "Produce", calories_per_100g: 57, protein_per_100g: 0.7, carbs_per_100g: 14.5, fat_per_100g: 0.3, fiber_per_100g: 2.4 },
  { name: "Strawberries", category: "Fruit", grocery_aisle: "Produce", calories_per_100g: 32, protein_per_100g: 0.7, carbs_per_100g: 7.7, fat_per_100g: 0.3, fiber_per_100g: 2.0 },
  { name: "Banana", category: "Fruit", grocery_aisle: "Produce", calories_per_100g: 89, protein_per_100g: 1.1, carbs_per_100g: 22.8, fat_per_100g: 0.3, fiber_per_100g: 2.6 },
  { name: "Lemon", category: "Fruit", grocery_aisle: "Produce", calories_per_100g: 29, protein_per_100g: 1.1, carbs_per_100g: 9.3, fat_per_100g: 0.3, fiber_per_100g: 2.8 },
  { name: "Pomegranate Seeds", category: "Fruit", grocery_aisle: "Produce", calories_per_100g: 83, protein_per_100g: 1.7, carbs_per_100g: 18.7, fat_per_100g: 1.2, fiber_per_100g: 4.0 },

  // === Nuts & Seeds ===
  { name: "Walnuts", category: "Nut", grocery_aisle: "Nuts & Seeds", calories_per_100g: 654, protein_per_100g: 15.2, carbs_per_100g: 13.7, fat_per_100g: 65.2, fiber_per_100g: 6.7 },
  { name: "Macadamia Nuts", category: "Nut", grocery_aisle: "Nuts & Seeds", calories_per_100g: 718, protein_per_100g: 7.9, carbs_per_100g: 13.8, fat_per_100g: 75.8, fiber_per_100g: 8.6 },
  { name: "Flaxseed", category: "Seed", grocery_aisle: "Nuts & Seeds", calories_per_100g: 534, protein_per_100g: 18.3, carbs_per_100g: 28.9, fat_per_100g: 42.2, fiber_per_100g: 27.3 },
  { name: "Chia Seeds", category: "Seed", grocery_aisle: "Nuts & Seeds", calories_per_100g: 486, protein_per_100g: 16.5, carbs_per_100g: 42.1, fat_per_100g: 30.7, fiber_per_100g: 34.4 },
  { name: "Hemp Seeds", category: "Seed", grocery_aisle: "Nuts & Seeds", calories_per_100g: 553, protein_per_100g: 31.6, carbs_per_100g: 8.7, fat_per_100g: 48.7, fiber_per_100g: 4.0 },
  { name: "Pumpkin Seeds", category: "Seed", grocery_aisle: "Nuts & Seeds", calories_per_100g: 559, protein_per_100g: 30.2, carbs_per_100g: 10.7, fat_per_100g: 49.1, fiber_per_100g: 6.0 },
  { name: "Sunflower Seeds", category: "Seed", grocery_aisle: "Nuts & Seeds", calories_per_100g: 584, protein_per_100g: 20.8, carbs_per_100g: 20.0, fat_per_100g: 51.5, fiber_per_100g: 8.6 },
  { name: "Almonds", category: "Nut", grocery_aisle: "Nuts & Seeds", calories_per_100g: 579, protein_per_100g: 21.2, carbs_per_100g: 21.6, fat_per_100g: 49.9, fiber_per_100g: 12.5 },

  // === Proteins ===
  { name: "Extra Virgin Olive Oil", category: "Oil", grocery_aisle: "Oils & Condiments", calories_per_100g: 884, protein_per_100g: 0, carbs_per_100g: 0, fat_per_100g: 100, fiber_per_100g: 0 },
  { name: "Coconut Oil", category: "Oil", grocery_aisle: "Oils & Condiments", calories_per_100g: 862, protein_per_100g: 0, carbs_per_100g: 0, fat_per_100g: 100, fiber_per_100g: 0 },
  { name: "Dark Chocolate (85%)", category: "Other", grocery_aisle: "Other", calories_per_100g: 593, protein_per_100g: 7.8, carbs_per_100g: 46.0, fat_per_100g: 43.0, fiber_per_100g: 11.0 },

  // === Grains ===
  { name: "Oats (Rolled)", category: "Grain", grocery_aisle: "Grains & Bread", calories_per_100g: 389, protein_per_100g: 16.9, carbs_per_100g: 66.3, fat_per_100g: 6.9, fiber_per_100g: 10.6 },
  { name: "Quinoa", category: "Grain", grocery_aisle: "Grains & Bread", calories_per_100g: 368, protein_per_100g: 14.1, carbs_per_100g: 64.2, fat_per_100g: 6.1, fiber_per_100g: 7.0 },
  { name: "Brown Rice", category: "Grain", grocery_aisle: "Grains & Bread", calories_per_100g: 362, protein_per_100g: 7.5, carbs_per_100g: 76.2, fat_per_100g: 2.7, fiber_per_100g: 3.4 },

  // === Dairy & Alternatives ===
  { name: "Almond Milk (Unsweetened)", category: "Dairy Alternative", grocery_aisle: "Dairy & Eggs", calories_per_100g: 15, protein_per_100g: 0.6, carbs_per_100g: 0.3, fat_per_100g: 1.2, fiber_per_100g: 0.2 },
  { name: "Coconut Milk", category: "Dairy Alternative", grocery_aisle: "Dairy & Eggs", calories_per_100g: 230, protein_per_100g: 2.3, carbs_per_100g: 5.5, fat_per_100g: 23.8, fiber_per_100g: 2.2 },
  { name: "Greek Yogurt (Plain)", category: "Dairy", grocery_aisle: "Dairy & Eggs", calories_per_100g: 59, protein_per_100g: 10.0, carbs_per_100g: 3.6, fat_per_100g: 0.7, fiber_per_100g: 0 },

  // === Spices & Herbs ===
  { name: "Turmeric (Ground)", category: "Spice", grocery_aisle: "Spices & Herbs", calories_per_100g: 354, protein_per_100g: 7.8, carbs_per_100g: 64.9, fat_per_100g: 9.9, fiber_per_100g: 21.1 },
  { name: "Cinnamon", category: "Spice", grocery_aisle: "Spices & Herbs", calories_per_100g: 247, protein_per_100g: 4.0, carbs_per_100g: 80.6, fat_per_100g: 1.2, fiber_per_100g: 53.1 },
  { name: "Cumin", category: "Spice", grocery_aisle: "Spices & Herbs", calories_per_100g: 375, protein_per_100g: 17.8, carbs_per_100g: 44.2, fat_per_100g: 22.3, fiber_per_100g: 10.5 },
  { name: "Black Pepper", category: "Spice", grocery_aisle: "Spices & Herbs", calories_per_100g: 251, protein_per_100g: 10.4, carbs_per_100g: 63.9, fat_per_100g: 3.3, fiber_per_100g: 25.3 },
  { name: "Cayenne Pepper", category: "Spice", grocery_aisle: "Spices & Herbs", calories_per_100g: 318, protein_per_100g: 12.0, carbs_per_100g: 56.6, fat_per_100g: 17.3, fiber_per_100g: 27.2 },
  { name: "Smoked Paprika", category: "Spice", grocery_aisle: "Spices & Herbs", calories_per_100g: 282, protein_per_100g: 14.1, carbs_per_100g: 53.9, fat_per_100g: 13.0, fiber_per_100g: 34.9 },

  // === Condiments ===
  { name: "Apple Cider Vinegar", category: "Condiment", grocery_aisle: "Oils & Condiments", calories_per_100g: 21, protein_per_100g: 0, carbs_per_100g: 0.9, fat_per_100g: 0, fiber_per_100g: 0 },
  { name: "Soy Sauce (Low Sodium)", category: "Condiment", grocery_aisle: "Oils & Condiments", calories_per_100g: 53, protein_per_100g: 8.1, carbs_per_100g: 4.9, fat_per_100g: 0.1, fiber_per_100g: 0.8 },
  { name: "Nutritional Yeast", category: "Supplement", grocery_aisle: "Supplements", calories_per_100g: 325, protein_per_100g: 50.0, carbs_per_100g: 36.0, fat_per_100g: 4.0, fiber_per_100g: 25.0 },
  { name: "Cocoa Powder (Unsweetened)", category: "Other", grocery_aisle: "Other", calories_per_100g: 228, protein_per_100g: 19.6, carbs_per_100g: 57.9, fat_per_100g: 13.7, fiber_per_100g: 33.2 },
  { name: "Collagen Peptides", category: "Supplement", grocery_aisle: "Supplements", calories_per_100g: 360, protein_per_100g: 90.0, carbs_per_100g: 0, fat_per_100g: 0, fiber_per_100g: 0 },
  { name: "Pea Protein Powder", category: "Supplement", grocery_aisle: "Supplements", calories_per_100g: 375, protein_per_100g: 80.0, carbs_per_100g: 5.0, fat_per_100g: 7.0, fiber_per_100g: 5.0 },
  { name: "Maple Syrup", category: "Sweetener", grocery_aisle: "Other", calories_per_100g: 260, protein_per_100g: 0, carbs_per_100g: 67.0, fat_per_100g: 0.1, fiber_per_100g: 0 },
  { name: "Dates (Medjool)", category: "Fruit", grocery_aisle: "Produce", calories_per_100g: 277, protein_per_100g: 1.8, carbs_per_100g: 75.0, fat_per_100g: 0.2, fiber_per_100g: 6.7 },
];
