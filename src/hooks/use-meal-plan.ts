"use client";

import { useState, useCallback, useMemo } from "react";
import { recipes } from "@/data/seed";
import { blueprintWeekTemplate } from "@/data/seed/blueprint-week";
import type { MealPlanEntry } from "@/types/meal-plan";
import type { Recipe } from "@/types/recipe";
import type { MealSlot } from "@/lib/constants";
import { MEAL_SLOTS, NUTRIENT_TARGETS } from "@/lib/constants";

// Get Monday of the week containing the given date
export function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function formatWeekKey(monday: Date): string {
  return monday.toISOString().split("T")[0];
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Storage key for persisting meal plan entries
const STORAGE_KEY = "lhp-meal-plans";

function loadFromStorage(): Record<string, MealPlanEntry[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveToStorage(data: Record<string, MealPlanEntry[]>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable
  }
}

interface DayNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export function useMealPlan() {
  const [weekStart, setWeekStart] = useState(() => getMondayOfWeek(new Date()));
  const [allEntries, setAllEntries] = useState<Record<string, MealPlanEntry[]>>(() => loadFromStorage());

  const weekKey = formatWeekKey(weekStart);
  const entries = allEntries[weekKey] ?? [];

  // Persist whenever entries change
  const updateEntries = useCallback((weekKey: string, newEntries: MealPlanEntry[]) => {
    setAllEntries((prev) => {
      const updated = { ...prev, [weekKey]: newEntries };
      saveToStorage(updated);
      return updated;
    });
  }, []);

  // Resolve recipe data for entries
  const recipeMap = useMemo(() => {
    const map = new Map<string, Recipe>();
    recipes.forEach((r) => map.set(r.id, r));
    return map;
  }, []);

  const entriesWithRecipes = useMemo(() => {
    return entries.map((e) => ({
      ...e,
      recipe: recipeMap.get(e.recipe_id),
    }));
  }, [entries, recipeMap]);

  // Get entries for a specific day and slot
  const getSlotEntries = useCallback(
    (dayOfWeek: number, mealSlot: MealSlot): MealPlanEntry[] => {
      return entriesWithRecipes
        .filter((e) => e.day_of_week === dayOfWeek && e.meal_slot === mealSlot)
        .sort((a, b) => a.sort_order - b.sort_order);
    },
    [entriesWithRecipes]
  );

  // Add a recipe to a slot
  const addEntry = useCallback(
    (dayOfWeek: number, mealSlot: MealSlot, recipeId: string) => {
      const existing = entries.filter(
        (e) => e.day_of_week === dayOfWeek && e.meal_slot === mealSlot
      );
      const newEntry: MealPlanEntry = {
        id: generateId(),
        meal_plan_id: weekKey,
        recipe_id: recipeId,
        day_of_week: dayOfWeek,
        meal_slot: mealSlot,
        sort_order: existing.length,
      };
      updateEntries(weekKey, [...entries, newEntry]);
    },
    [entries, weekKey, updateEntries]
  );

  // Remove an entry
  const removeEntry = useCallback(
    (entryId: string) => {
      updateEntries(weekKey, entries.filter((e) => e.id !== entryId));
    },
    [entries, weekKey, updateEntries]
  );

  // Move an entry to a new day/slot (used by drag-and-drop)
  const moveEntry = useCallback(
    (entryId: string, newDayOfWeek: number, newMealSlot: MealSlot) => {
      updateEntries(
        weekKey,
        entries.map((e) =>
          e.id === entryId
            ? { ...e, day_of_week: newDayOfWeek, meal_slot: newMealSlot }
            : e
        )
      );
    },
    [entries, weekKey, updateEntries]
  );

  // Load Blueprint Week template
  const loadBlueprintWeek = useCallback(() => {
    const templateEntries: MealPlanEntry[] = blueprintWeekTemplate
      .map((t) => {
        const recipe = recipes.find((r) => r.slug === t.recipe_slug);
        if (!recipe) return null;
        return {
          id: generateId(),
          meal_plan_id: weekKey,
          recipe_id: recipe.id,
          day_of_week: t.day_of_week,
          meal_slot: t.meal_slot,
          sort_order: 0,
        };
      })
      .filter((e): e is MealPlanEntry => e !== null);
    updateEntries(weekKey, templateEntries);
  }, [weekKey, updateEntries]);

  // Clear all entries for current week
  const clearWeek = useCallback(() => {
    updateEntries(weekKey, []);
  }, [weekKey, updateEntries]);

  // Navigate weeks
  const goToPrevWeek = useCallback(() => {
    setWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  }, []);

  const goToNextWeek = useCallback(() => {
    setWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  }, []);

  const goToCurrentWeek = useCallback(() => {
    setWeekStart(getMondayOfWeek(new Date()));
  }, []);

  // Daily nutrition totals
  const getDayNutrition = useCallback(
    (dayOfWeek: number): DayNutrition => {
      const dayEntries = entriesWithRecipes.filter((e) => e.day_of_week === dayOfWeek);
      return dayEntries.reduce(
        (totals, e) => {
          if (!e.recipe) return totals;
          return {
            calories: totals.calories + e.recipe.total_calories,
            protein: totals.protein + e.recipe.total_protein,
            carbs: totals.carbs + e.recipe.total_carbs,
            fat: totals.fat + e.recipe.total_fat,
            fiber: totals.fiber + e.recipe.total_fiber,
          };
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
      );
    },
    [entriesWithRecipes]
  );

  // Weekly nutrition averages
  const weeklyNutrition = useMemo(() => {
    const daysWithEntries: number[] = [];
    for (let d = 0; d < 7; d++) {
      if (entriesWithRecipes.some((e) => e.day_of_week === d)) {
        daysWithEntries.push(d);
      }
    }
    if (daysWithEntries.length === 0) {
      return { averages: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }, daysPlanned: 0 };
    }

    const totals = daysWithEntries.reduce(
      (acc, d) => {
        const dayNut = getDayNutrition(d);
        return {
          calories: acc.calories + dayNut.calories,
          protein: acc.protein + dayNut.protein,
          carbs: acc.carbs + dayNut.carbs,
          fat: acc.fat + dayNut.fat,
          fiber: acc.fiber + dayNut.fiber,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    );

    const count = daysWithEntries.length;
    return {
      averages: {
        calories: Math.round(totals.calories / count),
        protein: Math.round(totals.protein / count),
        carbs: Math.round(totals.carbs / count),
        fat: Math.round(totals.fat / count),
        fiber: Math.round(totals.fiber / count),
      },
      daysPlanned: count,
    };
  }, [entriesWithRecipes, getDayNutrition]);

  // Slot-level helpers
  const slotHasEntries = useCallback(
    (dayOfWeek: number, mealSlot: MealSlot): boolean => {
      return entries.some((e) => e.day_of_week === dayOfWeek && e.meal_slot === mealSlot);
    },
    [entries]
  );

  const isCurrentWeek = useMemo(() => {
    const today = getMondayOfWeek(new Date());
    return weekStart.getTime() === today.getTime();
  }, [weekStart]);

  return {
    weekStart,
    weekKey,
    entries: entriesWithRecipes,
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
    slotHasEntries,
    recipes, // expose for AddRecipeSheet
  };
}
