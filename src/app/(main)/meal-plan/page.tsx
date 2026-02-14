import type { Metadata } from "next";
import { MealPlanClient } from "./meal-plan-client";

export const metadata: Metadata = {
  title: "Meal Plan",
};

export default function MealPlanPage() {
  return <MealPlanClient />;
}
