"use client";

import { useState, useCallback, useMemo } from "react";
import { MEAL_SLOTS, NUTRIENT_TARGETS } from "@/lib/constants";
import type { MealSlot } from "@/lib/constants";
import type { TrackingLog, DailyStats, StreakData } from "@/types/tracking";
import { useMealPlan, getMondayOfWeek } from "@/hooks/use-meal-plan";

const STORAGE_KEY = "lhp-tracking";

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function formatDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

function loadFromStorage(): Record<string, TrackingLog[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveToStorage(data: Record<string, TrackingLog[]>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable
  }
}

export function useTracking() {
  const [allLogs, setAllLogs] = useState<Record<string, TrackingLog[]>>(() => loadFromStorage());
  const mealPlan = useMealPlan();

  const today = new Date();
  const todayKey = formatDateKey(today);

  const updateLogs = useCallback((newLogs: Record<string, TrackingLog[]>) => {
    setAllLogs(newLogs);
    saveToStorage(newLogs);
  }, []);

  // Get logs for a specific date
  const getLogsForDate = useCallback(
    (dateKey: string): TrackingLog[] => {
      return allLogs[dateKey] ?? [];
    },
    [allLogs]
  );

  // Check if a specific slot is completed on a date
  const isSlotCompleted = useCallback(
    (dateKey: string, mealSlot: MealSlot): boolean => {
      const logs = allLogs[dateKey] ?? [];
      return logs.some((l) => l.meal_slot === mealSlot && l.completed);
    },
    [allLogs]
  );

  // Get note for a slot
  const getSlotNote = useCallback(
    (dateKey: string, mealSlot: MealSlot): string => {
      const logs = allLogs[dateKey] ?? [];
      const log = logs.find((l) => l.meal_slot === mealSlot);
      return log?.notes ?? "";
    },
    [allLogs]
  );

  // Toggle completion for a meal slot
  const toggleSlot = useCallback(
    (dateKey: string, mealSlot: MealSlot) => {
      const logs = allLogs[dateKey] ?? [];
      const existing = logs.find((l) => l.meal_slot === mealSlot);

      let updatedLogs: TrackingLog[];
      if (existing) {
        updatedLogs = logs.map((l) =>
          l.meal_slot === mealSlot
            ? { ...l, completed: !l.completed, updated_at: new Date().toISOString() }
            : l
        );
      } else {
        const newLog: TrackingLog = {
          id: generateId(),
          user_id: "",
          date: dateKey,
          meal_slot: mealSlot,
          completed: true,
          notes: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        updatedLogs = [...logs, newLog];
      }

      updateLogs({ ...allLogs, [dateKey]: updatedLogs });
    },
    [allLogs, updateLogs]
  );

  // Update note for a meal slot
  const updateNote = useCallback(
    (dateKey: string, mealSlot: MealSlot, notes: string) => {
      const logs = allLogs[dateKey] ?? [];
      const existing = logs.find((l) => l.meal_slot === mealSlot);

      let updatedLogs: TrackingLog[];
      if (existing) {
        updatedLogs = logs.map((l) =>
          l.meal_slot === mealSlot
            ? { ...l, notes: notes || null, updated_at: new Date().toISOString() }
            : l
        );
      } else {
        const newLog: TrackingLog = {
          id: generateId(),
          user_id: "",
          date: dateKey,
          meal_slot: mealSlot,
          completed: false,
          notes: notes || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        updatedLogs = [...logs, newLog];
      }

      updateLogs({ ...allLogs, [dateKey]: updatedLogs });
    },
    [allLogs, updateLogs]
  );

  // Today's stats
  const todayStats = useMemo((): DailyStats => {
    const logs = allLogs[todayKey] ?? [];
    const completedMeals = logs.filter((l) => l.completed).length;

    // Get nutrition from meal plan for today
    const todayDow = (today.getDay() + 6) % 7; // Convert Sun=0 to Mon=0
    const dayNut = mealPlan.getDayNutrition(todayDow);

    return {
      date: todayKey,
      completed_meals: completedMeals,
      total_meals: MEAL_SLOTS.length,
      total_calories: dayNut.calories,
      total_protein: dayNut.protein,
      total_carbs: dayNut.carbs,
      total_fat: dayNut.fat,
    };
  }, [allLogs, todayKey, today, mealPlan]);

  // 7-day history for chart
  const weekHistory = useMemo((): DailyStats[] => {
    const history: DailyStats[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = formatDateKey(d);
      const logs = allLogs[key] ?? [];
      const completedMeals = logs.filter((l) => l.completed).length;

      // Get nutrition from meal plan
      const dow = (d.getDay() + 6) % 7;
      const dayNut = mealPlan.getDayNutrition(dow);

      history.push({
        date: key,
        completed_meals: completedMeals,
        total_meals: MEAL_SLOTS.length,
        total_calories: dayNut.calories,
        total_protein: dayNut.protein,
        total_carbs: dayNut.carbs,
        total_fat: dayNut.fat,
      });
    }
    return history;
  }, [allLogs, today, mealPlan]);

  // Streak calculation
  const streak = useMemo((): StreakData => {
    let currentStreak = 0;
    const d = new Date(today);

    // Count consecutive days backwards from today
    while (true) {
      const key = formatDateKey(d);
      const logs = allLogs[key] ?? [];
      const hasCompletion = logs.some((l) => l.completed);

      if (!hasCompletion) break;
      currentStreak++;
      d.setDate(d.getDate() - 1);

      // Safety: don't go back more than 365 days
      if (currentStreak > 365) break;
    }

    // Calculate best streak by scanning all dates
    let bestStreak = currentStreak;
    const allDates = Object.keys(allLogs).sort();
    if (allDates.length > 0) {
      let tempStreak = 0;
      let prevDate: Date | null = null;

      for (const dateStr of allDates) {
        const logs = allLogs[dateStr];
        const hasCompletion = logs.some((l) => l.completed);
        if (!hasCompletion) {
          tempStreak = 0;
          prevDate = null;
          continue;
        }

        const currentDate = new Date(dateStr);
        if (prevDate) {
          const diff = (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
          if (Math.round(diff) === 1) {
            tempStreak++;
          } else {
            tempStreak = 1;
          }
        } else {
          tempStreak = 1;
        }

        if (tempStreak > bestStreak) bestStreak = tempStreak;
        prevDate = currentDate;
      }
    }

    // Find last completed date
    let lastCompletedDate: string | null = null;
    const sortedDates = Object.keys(allLogs).sort().reverse();
    for (const dateStr of sortedDates) {
      if (allLogs[dateStr].some((l) => l.completed)) {
        lastCompletedDate = dateStr;
        break;
      }
    }

    return {
      current_streak: currentStreak,
      best_streak: bestStreak,
      last_completed_date: lastCompletedDate,
    };
  }, [allLogs, today]);

  return {
    todayKey,
    todayStats,
    weekHistory,
    streak,
    isSlotCompleted,
    getSlotNote,
    toggleSlot,
    updateNote,
    getLogsForDate,
  };
}
