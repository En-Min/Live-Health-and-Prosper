"use client";

import { cn } from "@/lib/utils";
import { NUTRIENT_TARGETS } from "@/lib/constants";

interface WeeklyNutritionSummaryProps {
  averages: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  daysPlanned: number;
}

interface NutrientRowProps {
  label: string;
  value: number;
  target: number;
  unit: string;
  color: string;
}

function NutrientRow({ label, value, target, unit, color }: NutrientRowProps) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  const isLow = pct < 70;
  const isOver = pct > 110;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-foreground-muted w-16 shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-surface-elevated overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-300", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span
        className={cn(
          "text-[10px] font-data w-20 text-right shrink-0",
          isLow ? "text-amber" : isOver ? "text-error" : "text-foreground-muted"
        )}
      >
        {value}{unit} / {target}{unit}
      </span>
    </div>
  );
}

export function WeeklyNutritionSummary({ averages, daysPlanned }: WeeklyNutritionSummaryProps) {
  if (daysPlanned === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-surface p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-foreground-muted uppercase tracking-wider flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-teal">
            <path d="M8 1a.75.75 0 0 1 .75.75V6h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0V7.5h-4.5a.75.75 0 0 1 0-1.5h4.5V1.75A.75.75 0 0 1 8 1Z" />
          </svg>
          Weekly Averages
        </h3>
        <span className="text-[10px] font-data text-foreground-muted">
          {daysPlanned}/7 days planned
        </span>
      </div>

      <div className="space-y-2.5">
        <NutrientRow
          label="Calories"
          value={averages.calories}
          target={NUTRIENT_TARGETS.calories}
          unit=" kcal"
          color="bg-teal"
        />
        <NutrientRow
          label="Protein"
          value={averages.protein}
          target={NUTRIENT_TARGETS.protein}
          unit="g"
          color="bg-blue-400"
        />
        <NutrientRow
          label="Carbs"
          value={averages.carbs}
          target={NUTRIENT_TARGETS.carbs}
          unit="g"
          color="bg-amber"
        />
        <NutrientRow
          label="Fat"
          value={averages.fat}
          target={NUTRIENT_TARGETS.fat}
          unit="g"
          color="bg-pink-400"
        />
        <NutrientRow
          label="Fiber"
          value={averages.fiber}
          target={NUTRIENT_TARGETS.fiber}
          unit="g"
          color="bg-green-400"
        />
      </div>

      {/* Warnings */}
      {averages.protein < NUTRIENT_TARGETS.protein * 0.7 && (
        <p className="text-[10px] text-amber flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
            <path fillRule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
          </svg>
          Protein below 70% of daily target — consider adding protein-rich recipes
        </p>
      )}
      {averages.fiber < NUTRIENT_TARGETS.fiber * 0.7 && (
        <p className="text-[10px] text-amber flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
            <path fillRule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
          </svg>
          Fiber below 70% of daily target — add more vegetables and legumes
        </p>
      )}
    </div>
  );
}
