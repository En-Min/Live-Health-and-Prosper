"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatCalories } from "@/lib/utils";
import type { Recipe } from "@/types/recipe";
import Link from "next/link";

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Breakfast: "bg-amber/20 text-amber-light",
  Lunch: "bg-teal/20 text-teal-light",
  Dinner: "bg-purple-400/20 text-purple-300",
  Snack: "bg-pink-400/20 text-pink-300",
  Smoothie: "bg-green-400/20 text-green-300",
  Supplement: "bg-blue-400/20 text-blue-300",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "text-success",
  Medium: "text-amber",
  Advanced: "text-error",
};

export function RecipeCard({ recipe, className }: RecipeCardProps) {
  const totalTime = recipe.prep_time_minutes + recipe.cook_time_minutes;
  const [imgError, setImgError] = useState(false);

  const categoryEmoji =
    recipe.category === "Smoothie" ? "🥤" :
    recipe.category === "Breakfast" ? "🌅" :
    recipe.category === "Lunch" ? "☀️" :
    recipe.category === "Dinner" ? "🌙" :
    recipe.category === "Snack" ? "⚡" : "🧪";

  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className={cn(
        "block rounded-xl bg-surface overflow-hidden",
        "border border-border hover:border-teal/30",
        "transition-all duration-200 hover:shadow-lg hover:shadow-teal/5",
        "active:scale-[0.98]",
        className
      )}
    >
      {/* Recipe photo */}
      <div className="h-40 relative bg-gradient-to-br from-surface-elevated to-surface">
        {recipe.image_url && !imgError ? (
          <Image
            src={recipe.image_url}
            alt={recipe.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <span className="text-4xl opacity-30">{categoryEmoji}</span>
          </div>
        )}
        {recipe.is_blueprint && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="teal" className="text-[10px]">Blueprint</Badge>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2.5">
        <h3 className="font-semibold text-foreground leading-tight line-clamp-1">
          {recipe.title}
        </h3>
        <p className="text-sm text-foreground-muted line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          <span className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
            CATEGORY_COLORS[recipe.category] ?? "bg-surface-elevated text-foreground-muted"
          )}>
            {recipe.category}
          </span>
          {recipe.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between pt-1 border-t border-border">
          <div className="flex items-center gap-3">
            <span className="font-data text-xs text-foreground-muted flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M1 8a7 7 0 1114 0A7 7 0 011 8zm7.75-4.25a.75.75 0 00-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 000-1.5h-2.5v-3.5z" clipRule="evenodd" />
              </svg>
              {totalTime}m
            </span>
            <span className={cn(
              "font-data text-xs",
              DIFFICULTY_COLORS[recipe.difficulty] ?? "text-foreground-muted"
            )}>
              {recipe.difficulty}
            </span>
          </div>
          <span className="font-data text-xs text-teal font-medium">
            {formatCalories(recipe.total_calories)}
          </span>
        </div>
      </div>
    </Link>
  );
}
