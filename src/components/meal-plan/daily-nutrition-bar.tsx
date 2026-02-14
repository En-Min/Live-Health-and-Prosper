"use client";

import { cn } from "@/lib/utils";
import { NUTRIENT_TARGETS } from "@/lib/constants";

interface DailyNutritionBarProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export function DailyNutritionBar({ calories, protein, carbs, fat }: DailyNutritionBarProps) {
  if (calories === 0) return null;

  const calPct = Math.min(100, Math.round((calories / NUTRIENT_TARGETS.calories) * 100));

  return (
    <div className="space-y-1.5">
      {/* Calorie bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-surface-elevated overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300",
              calPct >= 100 ? "bg-error" : calPct >= 80 ? "bg-amber" : "bg-teal"
            )}
            style={{ width: `${calPct}%` }}
          />
        </div>
        <span className="text-[10px] font-data text-foreground-muted shrink-0 w-16 text-right">
          {Math.round(calories)} kcal
        </span>
      </div>

      {/* Macro badges */}
      <div className="flex gap-2 text-[9px] font-data text-foreground-muted">
        <span>P: {Math.round(protein)}g</span>
        <span>C: {Math.round(carbs)}g</span>
        <span>F: {Math.round(fat)}g</span>
      </div>
    </div>
  );
}
