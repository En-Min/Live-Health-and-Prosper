"use client";

import { useTracking } from "@/hooks/use-tracking";
import { useMealPlan } from "@/hooks/use-meal-plan";
import { MEAL_SLOTS } from "@/lib/constants";
import { StreakCounter } from "@/components/tracking/streak-counter";
import { MealLogEntry } from "@/components/tracking/meal-log-entry";
import { WeeklyNutritionChart } from "@/components/tracking/weekly-nutrition-chart";
import { NUTRIENT_TARGETS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TrackingClient() {
  const tracking = useTracking();
  const mealPlan = useMealPlan();

  const todayDow = (new Date().getDay() + 6) % 7;
  const dayNutrition = mealPlan.getDayNutrition(todayDow);

  // Get planned recipe names for each slot today
  function getRecipeForSlot(slot: typeof MEAL_SLOTS[number]): string | undefined {
    const entries = mealPlan.getSlotEntries(todayDow, slot);
    if (entries.length === 0) return undefined;
    return entries.map((e) => e.recipe?.title).filter(Boolean).join(", ");
  }

  const calPct = NUTRIENT_TARGETS.calories > 0
    ? Math.min(100, Math.round((dayNutrition.calories / NUTRIENT_TARGETS.calories) * 100))
    : 0;

  return (
    <div className="px-4 py-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Daily Tracking</h1>
        <p className="text-foreground-muted text-sm mt-1">
          Track your meals, build your streak
        </p>
      </div>

      {/* Streak */}
      <StreakCounter streak={tracking.streak} />

      {/* Today's date label */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          Today — {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
        </h2>
        <span className="text-[10px] font-data text-foreground-muted">
          {tracking.todayStats.completed_meals}/{tracking.todayStats.total_meals} meals
        </span>
      </div>

      {/* Today's nutrition snapshot */}
      {dayNutrition.calories > 0 && (
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-foreground-muted">Planned calories today</span>
            <span className={cn(
              "text-xs font-data font-medium",
              calPct >= 100 ? "text-error" : calPct >= 80 ? "text-amber" : "text-teal"
            )}>
              {Math.round(dayNutrition.calories)} / {NUTRIENT_TARGETS.calories} kcal
            </span>
          </div>
          <div className="h-2 rounded-full bg-surface-elevated overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                calPct >= 100 ? "bg-error" : calPct >= 80 ? "bg-amber" : "bg-teal"
              )}
              style={{ width: `${calPct}%` }}
            />
          </div>
          <div className="flex gap-4 mt-2 text-[10px] font-data text-foreground-muted">
            <span>P: {Math.round(dayNutrition.protein)}g</span>
            <span>C: {Math.round(dayNutrition.carbs)}g</span>
            <span>F: {Math.round(dayNutrition.fat)}g</span>
            <span>Fiber: {Math.round(dayNutrition.fiber)}g</span>
          </div>
        </div>
      )}

      {/* Meal slots */}
      <div className="space-y-3">
        {MEAL_SLOTS.map((slot) => (
          <MealLogEntry
            key={slot}
            mealSlot={slot}
            completed={tracking.isSlotCompleted(tracking.todayKey, slot)}
            note={tracking.getSlotNote(tracking.todayKey, slot)}
            recipeName={getRecipeForSlot(slot)}
            onToggle={() => tracking.toggleSlot(tracking.todayKey, slot)}
            onUpdateNote={(note) => tracking.updateNote(tracking.todayKey, slot, note)}
          />
        ))}
      </div>

      {/* Weekly chart */}
      <WeeklyNutritionChart history={tracking.weekHistory} />
    </div>
  );
}
