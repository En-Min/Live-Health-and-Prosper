"use client";

import { cn } from "@/lib/utils";
import { MEAL_SLOTS, DAYS_OF_WEEK } from "@/lib/constants";
import type { MealSlot as MealSlotType } from "@/lib/constants";
import type { MealPlanEntry } from "@/types/meal-plan";
import type { Recipe } from "@/types/recipe";
import { MealSlot } from "./meal-slot";
import { DailyNutritionBar } from "./daily-nutrition-bar";

interface DayColumnProps {
  dayOfWeek: number;
  isToday: boolean;
  getSlotEntries: (day: number, slot: MealSlotType) => (MealPlanEntry & { recipe?: Recipe })[];
  dayNutrition: { calories: number; protein: number; carbs: number; fat: number };
  onRemoveEntry: (id: string) => void;
  onAddClick: (day: number, slot: MealSlotType) => void;
}

export function DayColumn({
  dayOfWeek,
  isToday,
  getSlotEntries,
  dayNutrition,
  onRemoveEntry,
  onAddClick,
}: DayColumnProps) {
  const dayName = DAYS_OF_WEEK[dayOfWeek];
  const shortDay = dayName.slice(0, 3);

  return (
    <div
      className={cn(
        "min-w-[280px] rounded-xl border bg-surface p-3 space-y-3 snap-start",
        isToday ? "border-teal/40" : "border-border"
      )}
    >
      {/* Day header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-sm font-semibold",
              isToday ? "text-teal" : "text-foreground"
            )}
          >
            {shortDay}
          </span>
          {isToday && (
            <span className="text-[9px] font-medium uppercase tracking-wider text-teal bg-teal/10 px-1.5 py-0.5 rounded-full">
              Today
            </span>
          )}
        </div>
      </div>

      {/* Nutrition summary for the day */}
      <DailyNutritionBar {...dayNutrition} />

      {/* Meal slots */}
      <div className="space-y-2">
        {MEAL_SLOTS.map((slot) => (
          <MealSlot
            key={slot}
            dayOfWeek={dayOfWeek}
            mealSlot={slot}
            entries={getSlotEntries(dayOfWeek, slot)}
            onRemove={onRemoveEntry}
            onAddClick={() => onAddClick(dayOfWeek, slot)}
          />
        ))}
      </div>
    </div>
  );
}
