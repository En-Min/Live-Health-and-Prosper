import type { Metadata } from "next";
import { RecipeListClient } from "./recipe-list-client";

export const metadata: Metadata = {
  title: "Recipes",
};

export default function RecipesPage() {
  return <RecipeListClient />;
}
