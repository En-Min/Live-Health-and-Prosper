"use client";

import { ProgressRing } from "@/components/ui/progress-ring";
import { NUTRIENT_TARGETS } from "@/lib/constants";
import { formatGrams, formatCalories, formatPercentage } from "@/lib/utils";
import type { Recipe } from "@/types/recipe";

interface NutritionDashboardProps {
  recipe: Recipe;
}

export function NutritionDashboard({ recipe }: NutritionDashboardProps) {
  const macros = [
    {
      label: "Protein",
      value: recipe.total_protein,
      max: NUTRIENT_TARGETS.protein,
      color: "text-teal",
      unit: "g",
    },
    {
      label: "Carbs",
      value: recipe.total_carbs,
      max: NUTRIENT_TARGETS.carbs,
      color: "text-amber",
      unit: "g",
    },
    {
      label: "Fat",
      value: recipe.total_fat,
      max: NUTRIENT_TARGETS.fat,
      color: "text-purple-400",
      unit: "g",
    },
    {
      label: "Fiber",
      value: recipe.total_fiber,
      max: NUTRIENT_TARGETS.fiber,
      color: "text-green-400",
      unit: "g",
    },
  ];

  const caloriePercentage = formatPercentage(
    recipe.total_calories,
    NUTRIENT_TARGETS.calories
  );

  return (
    <div className="space-y-4">
      {/* Calorie header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground-muted">Per serving</p>
          <p className="font-data text-2xl font-bold text-foreground">
            {formatCalories(recipe.total_calories)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-data text-sm text-foreground-muted">
            {caloriePercentage}% daily target
          </p>
          <div className="w-32 h-2 bg-surface-elevated rounded-full mt-1 overflow-hidden">
            <div
              className="h-full bg-teal rounded-full transition-all duration-500"
              style={{ width: `${Math.min(caloriePercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Macro rings */}
      <div className="grid grid-cols-4 gap-2">
        {macros.map((macro) => (
          <ProgressRing
            key={macro.label}
            value={macro.value}
            max={macro.max}
            color={macro.color}
            label={macro.label}
            unit={macro.unit}
            size={72}
            strokeWidth={5}
          />
        ))}
      </div>

      {/* Macro breakdown bar */}
      <div className="space-y-2">
        <p className="text-xs text-foreground-muted font-medium uppercase tracking-wider">
          Macro Split
        </p>
        <div className="flex h-3 rounded-full overflow-hidden bg-surface-elevated">
          <div
            className="bg-teal transition-all duration-500"
            style={{
              width: `${formatPercentage(
                recipe.total_protein * 4,
                recipe.total_calories
              )}%`,
            }}
            title={`Protein: ${formatGrams(recipe.total_protein)}`}
          />
          <div
            className="bg-amber transition-all duration-500"
            style={{
              width: `${formatPercentage(
                recipe.total_carbs * 4,
                recipe.total_calories
              )}%`,
            }}
            title={`Carbs: ${formatGrams(recipe.total_carbs)}`}
          />
          <div
            className="bg-purple-400 transition-all duration-500"
            style={{
              width: `${formatPercentage(
                recipe.total_fat * 9,
                recipe.total_calories
              )}%`,
            }}
            title={`Fat: ${formatGrams(recipe.total_fat)}`}
          />
        </div>
        <div className="flex justify-between text-[10px] font-data text-foreground-muted">
          <span>
            P: {formatPercentage(recipe.total_protein * 4, recipe.total_calories)}%
          </span>
          <span>
            C: {formatPercentage(recipe.total_carbs * 4, recipe.total_calories)}%
          </span>
          <span>
            F: {formatPercentage(recipe.total_fat * 9, recipe.total_calories)}%
          </span>
        </div>
      </div>
    </div>
  );
}
