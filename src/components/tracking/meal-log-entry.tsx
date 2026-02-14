"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { MealSlot } from "@/lib/constants";

const SLOT_LABELS: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};

const SLOT_ICONS: Record<MealSlot, string> = {
  breakfast: "🌅",
  lunch: "☀️",
  dinner: "🌙",
  snack: "⚡",
};

interface MealLogEntryProps {
  mealSlot: MealSlot;
  completed: boolean;
  note: string;
  recipeName?: string;
  onToggle: () => void;
  onUpdateNote: (note: string) => void;
}

export function MealLogEntry({
  mealSlot,
  completed,
  note,
  recipeName,
  onToggle,
  onUpdateNote,
}: MealLogEntryProps) {
  const [showNote, setShowNote] = useState(!!note);

  return (
    <div
      className={cn(
        "rounded-xl border bg-surface p-4 transition-colors",
        completed ? "border-teal/30" : "border-border"
      )}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <button
          onClick={onToggle}
          className={cn(
            "shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all",
            "min-w-[44px] min-h-[44px] -m-2 p-2",
            completed
              ? "border-teal bg-teal"
              : "border-border hover:border-teal/50"
          )}
          aria-label={completed ? `Unmark ${SLOT_LABELS[mealSlot]}` : `Mark ${SLOT_LABELS[mealSlot]} complete`}
        >
          {completed && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-white">
              <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Label & recipe */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">{SLOT_ICONS[mealSlot]}</span>
            <span
              className={cn(
                "text-sm font-medium",
                completed ? "text-teal" : "text-foreground"
              )}
            >
              {SLOT_LABELS[mealSlot]}
            </span>
          </div>
          {recipeName && (
            <p className="text-[10px] text-foreground-muted mt-0.5 truncate">
              {recipeName}
            </p>
          )}
        </div>

        {/* Note toggle */}
        <button
          onClick={() => setShowNote(!showNote)}
          className={cn(
            "shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors",
            note ? "text-amber" : "text-foreground-muted hover:text-foreground"
          )}
          aria-label={showNote ? "Hide note" : "Add note"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
            <path d="M8 2C4.686 2 2 4.686 2 8s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6ZM5.496 7.633a.75.75 0 1 1 1.446-.394l.357 1.312.753-2.764a.75.75 0 0 1 1.446.394l-1.476 5.42a.75.75 0 0 1-1.446-.395l-.357-1.311-.753 2.764a.75.75 0 0 1-1.446-.394l1.476-5.42v-.212Z" />
          </svg>
        </button>
      </div>

      {/* Note input */}
      {showNote && (
        <div className="mt-3 pl-12">
          <input
            type="text"
            value={note}
            onChange={(e) => onUpdateNote(e.target.value)}
            placeholder="Add a note..."
            className="w-full rounded-lg bg-surface-elevated border border-border px-3 py-2 text-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent min-h-[36px]"
          />
        </div>
      )}
    </div>
  );
}
