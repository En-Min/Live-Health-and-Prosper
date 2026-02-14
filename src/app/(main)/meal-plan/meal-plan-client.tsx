"use client";

import { useState, useCallback } from "react";
import { useMealPlan } from "@/hooks/use-meal-plan";
import { WeekPicker } from "@/components/meal-plan/week-picker";
import { WeekCalendar } from "@/components/meal-plan/week-calendar";
import { WeeklyNutritionSummary } from "@/components/meal-plan/weekly-nutrition-summary";
import { AddRecipeSheet } from "@/components/meal-plan/add-recipe-sheet";
import type { MealSlot } from "@/lib/constants";

export function MealPlanClient() {
  const {
    weekStart,
    entries,
    getSlotEntries,
    addEntry,
    removeEntry,
    moveEntry,
    loadBlueprintWeek,
    clearWeek,
    goToPrevWeek,
    goToNextWeek,
    goToCurrentWeek,
    isCurrentWeek,
    getDayNutrition,
    weeklyNutrition,
    recipes,
  } = useMealPlan();

  // Add recipe sheet state
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetTarget, setSheetTarget] = useState<{ day: number; slot: MealSlot }>({
    day: 0,
    slot: "breakfast",
  });

  const handleAddClick = useCallback((day: number, slot: MealSlot) => {
    setSheetTarget({ day, slot });
    setSheetOpen(true);
  }, []);

  const handleSelectRecipe = useCallback(
    (recipeId: string) => {
      addEntry(sheetTarget.day, sheetTarget.slot, recipeId);
    },
    [addEntry, sheetTarget]
  );

  const hasEntries = entries.length > 0;

  return (
    <div className="px-4 py-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Meal Planner</h1>
        <p className="text-foreground-muted text-sm mt-1">
          Drag-and-drop your weekly meals
        </p>
      </div>

      {/* Week navigation */}
      <WeekPicker
        weekStart={weekStart}
        onPrevWeek={goToPrevWeek}
        onNextWeek={goToNextWeek}
        onCurrentWeek={goToCurrentWeek}
        isCurrentWeek={isCurrentWeek}
      />

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={loadBlueprintWeek}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-teal bg-teal/10 rounded-lg hover:bg-teal/20 transition-colors min-h-[44px]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3ZM2 2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h5.065a5.5 5.5 0 0 1 .197-1H2a1 1 0 0 1-1-1V4h14v5.341A5.5 5.5 0 0 1 13.465 14H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
          </svg>
          Load Blueprint Week
        </button>
        {hasEntries && (
          <button
            onClick={clearWeek}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-foreground-muted hover:text-error rounded-lg hover:bg-error/10 transition-colors min-h-[44px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
            </svg>
            Clear Week
          </button>
        )}
      </div>

      {/* Weekly Calendar */}
      <WeekCalendar
        weekStart={weekStart}
        entries={entries}
        getSlotEntries={getSlotEntries}
        getDayNutrition={getDayNutrition}
        onRemoveEntry={removeEntry}
        onMoveEntry={moveEntry}
        onAddClick={handleAddClick}
      />

      {/* Weekly Summary */}
      <WeeklyNutritionSummary
        averages={weeklyNutrition.averages}
        daysPlanned={weeklyNutrition.daysPlanned}
      />

      {/* Add Recipe Sheet */}
      <AddRecipeSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        dayOfWeek={sheetTarget.day}
        mealSlot={sheetTarget.slot}
        recipes={recipes}
        onSelectRecipe={handleSelectRecipe}
      />
    </div>
  );
}
