"use client";

import { useState, useMemo } from "react";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { SearchInput } from "@/components/ui/search-input";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/types/recipe";
import type { MealSlot } from "@/lib/constants";
import { DAYS_OF_WEEK } from "@/lib/constants";

interface AddRecipeSheetProps {
  open: boolean;
  onClose: () => void;
  dayOfWeek: number;
  mealSlot: MealSlot;
  recipes: Recipe[];
  onSelectRecipe: (recipeId: string) => void;
}

export function AddRecipeSheet({
  open,
  onClose,
  dayOfWeek,
  mealSlot,
  recipes,
  onSelectRecipe,
}: AddRecipeSheetProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return recipes;
    const q = search.toLowerCase();
    return recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [recipes, search]);

  const dayName = DAYS_OF_WEEK[dayOfWeek];

  function handleSelect(recipeId: string) {
    onSelectRecipe(recipeId);
    setSearch("");
    onClose();
  }

  return (
    <BottomSheet
      open={open}
      onClose={() => {
        setSearch("");
        onClose();
      }}
      title={`Add to ${dayName} — ${mealSlot}`}
    >
      <div className="space-y-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search recipes..."
          debounceMs={150}
        />

        <p className="text-[10px] text-foreground-muted font-data">
          {filtered.length} recipe{filtered.length !== 1 ? "s" : ""}
        </p>

        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
          {filtered.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => handleSelect(recipe.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg",
                "bg-surface-elevated border border-border",
                "hover:border-teal/30 transition-colors text-left",
                "min-h-[44px] active:scale-[0.98]"
              )}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {recipe.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-foreground-muted">{recipe.category}</span>
                  <span className="text-[10px] font-data text-teal">
                    {Math.round(recipe.total_calories)} kcal
                  </span>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-teal shrink-0">
                <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
              </svg>
            </button>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-foreground-muted text-sm py-8">
              No recipes match your search
            </p>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
