"use client";

import { useMealPlan, formatWeekKey } from "@/hooks/use-meal-plan";
import { useGroceryList } from "@/hooks/use-grocery-list";
import { GroceryProgress } from "@/components/grocery/grocery-progress";
import { GrocerySection } from "@/components/grocery/grocery-section";
import { AddCustomItem } from "@/components/grocery/add-custom-item";

export function GroceryListClient() {
  const mealPlan = useMealPlan();
  const grocery = useGroceryList();

  const weekLabel = formatWeekKey(mealPlan.weekStart);
  const hasEntries = mealPlan.entries.length > 0;
  const hasItems = grocery.items.length > 0;

  return (
    <div className="px-4 py-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Grocery List</h1>
        <p className="text-foreground-muted text-sm mt-1">
          Smart lists generated from your meal plan
        </p>
      </div>

      {/* Generate / action buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => grocery.generateFromMealPlan(mealPlan.entries)}
          disabled={!hasEntries}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-teal bg-teal/10 rounded-lg hover:bg-teal/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors min-h-[44px]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75h3.182a.75.75 0 0 1 0 1.5h-1.37l.84.84a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.274.727Z" clipRule="evenodd" />
          </svg>
          Generate from meal plan
        </button>

        {!hasEntries && (
          <span className="text-[10px] text-foreground-muted">
            Add recipes to your meal plan first
          </span>
        )}

        {hasItems && (
          <>
            <button
              onClick={grocery.uncheckAll}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-foreground-muted hover:text-foreground rounded-lg hover:bg-surface-elevated transition-colors min-h-[44px]"
            >
              Uncheck all
            </button>
            <button
              onClick={grocery.clearList}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-foreground-muted hover:text-error rounded-lg hover:bg-error/10 transition-colors min-h-[44px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
              </svg>
              Clear list
            </button>
          </>
        )}
      </div>

      {/* Progress bar */}
      <GroceryProgress {...grocery.progress} />

      {/* Grocery sections by aisle */}
      {hasItems ? (
        <div className="space-y-3">
          {grocery.grouped.map(({ aisle, items }) => (
            <GrocerySection
              key={aisle}
              aisle={aisle}
              items={items}
              onToggle={grocery.toggleItem}
              onRemove={grocery.removeItem}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 rounded-xl border border-dashed border-border">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 text-foreground-muted/30 mb-2">
            <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3H17.25a.75.75 0 0 1 .728.932l-2 7.5A.75.75 0 0 1 15.25 12H5.21l.137.684A.25.25 0 0 0 5.593 13h10.657a.75.75 0 0 1 0 1.5H5.593a1.75 1.75 0 0 1-1.716-1.41L2.117 3.258A.25.25 0 0 0 1.872 3H1.75A.75.75 0 0 1 1 2.25V1.75ZM6 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          </svg>
          <p className="text-foreground-muted text-sm">
            No items yet
          </p>
          <p className="text-foreground-muted/60 text-xs mt-1">
            Generate from your meal plan or add items manually
          </p>
        </div>
      )}

      {/* Add custom item */}
      <AddCustomItem onAdd={grocery.addCustomItem} />
    </div>
  );
}
