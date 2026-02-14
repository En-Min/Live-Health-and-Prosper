"use client";

import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { RecipeMiniCard } from "./recipe-mini-card";
import type { MealPlanEntry } from "@/types/meal-plan";
import type { Recipe } from "@/types/recipe";
import type { MealSlot as MealSlotType } from "@/lib/constants";

const SLOT_LABELS: Record<MealSlotType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};

const SLOT_ICONS: Record<MealSlotType, string> = {
  breakfast: "🌅",
  lunch: "☀️",
  dinner: "🌙",
  snack: "⚡",
};

interface MealSlotProps {
  dayOfWeek: number;
  mealSlot: MealSlotType;
  entries: (MealPlanEntry & { recipe?: Recipe })[];
  onRemove: (id: string) => void;
  onAddClick: () => void;
}

export function MealSlot({ dayOfWeek, mealSlot, entries, onRemove, onAddClick }: MealSlotProps) {
  const droppableId = `${dayOfWeek}-${mealSlot}`;
  const { setNodeRef, isOver } = useDroppable({ id: droppableId });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "rounded-lg border border-border/50 p-2 min-h-[60px] transition-colors",
        isOver && "border-teal/50 bg-teal/5"
      )}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-medium text-foreground-muted uppercase tracking-wider flex items-center gap-1">
          <span className="text-xs">{SLOT_ICONS[mealSlot]}</span>
          {SLOT_LABELS[mealSlot]}
        </span>
        <button
          onClick={onAddClick}
          className="min-w-[24px] min-h-[24px] flex items-center justify-center rounded-md text-teal hover:bg-teal/10 transition-colors"
          aria-label={`Add recipe to ${SLOT_LABELS[mealSlot]}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
          </svg>
        </button>
      </div>

      <SortableContext
        items={entries.map((e) => e.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-1.5">
          {entries.map((entry) => (
            <RecipeMiniCard key={entry.id} entry={entry} onRemove={onRemove} />
          ))}
        </div>
      </SortableContext>

      {entries.length === 0 && (
        <button
          onClick={onAddClick}
          className={cn(
            "w-full py-3 rounded-md border border-dashed border-border/50",
            "text-[10px] text-foreground-muted hover:border-teal/30 hover:text-teal transition-colors",
            "min-h-[44px] flex items-center justify-center"
          )}
        >
          + Add recipe
        </button>
      )}
    </div>
  );
}
