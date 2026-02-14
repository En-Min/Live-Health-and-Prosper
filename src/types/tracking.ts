import type { MealSlot } from "@/lib/constants";

export interface TrackingLog {
  id: string;
  user_id: string;
  date: string; // ISO date
  meal_slot: MealSlot;
  completed: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DailyStats {
  date: string;
  completed_meals: number;
  total_meals: number;
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
}

export interface StreakData {
  current_streak: number;
  best_streak: number;
  last_completed_date: string | null;
}
