"use client";

import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { MealPlanEntry } from "@/types/meal-plan";
import type { Recipe } from "@/types/recipe";

interface RecipeMiniCardProps {
  entry: MealPlanEntry & { recipe?: Recipe };
  onRemove: (id: string) => void;
}

export function RecipeMiniCard({ entry, onRemove }: RecipeMiniCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: entry.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!entry.recipe) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-center gap-2 rounded-lg bg-surface-elevated border border-border p-2",
        "touch-manipulation select-none",
        isDragging && "opacity-50 shadow-lg shadow-teal/10 border-teal/30 z-50"
      )}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="shrink-0 min-w-[24px] min-h-[24px] flex items-center justify-center cursor-grab active:cursor-grabbing text-foreground-muted"
        aria-label="Drag to reorder"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
          <path fillRule="evenodd" d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Zm0 4.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Recipe info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground truncate">
          {entry.recipe.title}
        </p>
        <p className="text-[10px] font-data text-teal">
          {Math.round(entry.recipe.total_calories)} kcal
        </p>
      </div>

      {/* Remove button */}
      <button
        onClick={() => onRemove(entry.id)}
        className="shrink-0 min-w-[24px] min-h-[24px] flex items-center justify-center text-foreground-muted hover:text-error transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label={`Remove ${entry.recipe.title}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
        </svg>
      </button>
    </div>
  );
}
