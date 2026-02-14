"use client";

import { useState, useCallback, useMemo } from "react";
import type { GroceryListItem } from "@/types/grocery";
import type { GroceryAisle } from "@/lib/constants";
import type { MealPlanEntry } from "@/types/meal-plan";
import type { Recipe } from "@/types/recipe";
import { aggregateGroceryItems, groupByAisle } from "@/lib/grocery-aggregator";

const STORAGE_KEY = "lhp-grocery-list";

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function loadFromStorage(): GroceryListItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: GroceryListItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full or unavailable
  }
}

export function useGroceryList() {
  const [items, setItems] = useState<GroceryListItem[]>(() => loadFromStorage());

  const updateItems = useCallback((newItems: GroceryListItem[]) => {
    setItems(newItems);
    saveToStorage(newItems);
  }, []);

  // Generate list from meal plan entries
  const generateFromMealPlan = useCallback(
    (entries: (MealPlanEntry & { recipe?: Recipe })[]) => {
      const aggregated = aggregateGroceryItems(entries);
      // Give each item a fresh stable ID
      const withIds = aggregated.map((item) => ({
        ...item,
        id: generateId(),
      }));
      updateItems(withIds);
    },
    [updateItems]
  );

  // Toggle check state
  const toggleItem = useCallback(
    (itemId: string) => {
      updateItems(
        items.map((item) =>
          item.id === itemId ? { ...item, is_checked: !item.is_checked } : item
        )
      );
    },
    [items, updateItems]
  );

  // Remove an item
  const removeItem = useCallback(
    (itemId: string) => {
      updateItems(items.filter((item) => item.id !== itemId));
    },
    [items, updateItems]
  );

  // Add a custom item
  const addCustomItem = useCallback(
    (name: string, quantity: number, unit: string, aisle: GroceryAisle) => {
      const newItem: GroceryListItem = {
        id: generateId(),
        grocery_list_id: "",
        ingredient_id: null,
        name,
        quantity,
        unit,
        aisle,
        is_checked: false,
        is_custom: true,
        sort_order: items.length,
      };
      updateItems([...items, newItem]);
    },
    [items, updateItems]
  );

  // Clear all items
  const clearList = useCallback(() => {
    updateItems([]);
  }, [updateItems]);

  // Uncheck all items
  const uncheckAll = useCallback(() => {
    updateItems(items.map((item) => ({ ...item, is_checked: false })));
  }, [items, updateItems]);

  // Grouped by aisle
  const grouped = useMemo(() => groupByAisle(items), [items]);

  // Progress stats
  const progress = useMemo(() => {
    const total = items.length;
    const checked = items.filter((i) => i.is_checked).length;
    return { total, checked, percentage: total > 0 ? Math.round((checked / total) * 100) : 0 };
  }, [items]);

  return {
    items,
    grouped,
    progress,
    generateFromMealPlan,
    toggleItem,
    removeItem,
    addCustomItem,
    clearList,
    uncheckAll,
  };
}
