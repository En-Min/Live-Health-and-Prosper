"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NutritionDashboard } from "@/components/recipes/nutrition-dashboard";
import { ScienceCard } from "@/components/recipes/science-card";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/types/recipe";
import Link from "next/link";

interface RecipeDetailClientProps {
  recipe: Recipe;
}

export function RecipeDetailClient({ recipe }: RecipeDetailClientProps) {
  const totalTime = recipe.prep_time_minutes + recipe.cook_time_minutes;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="pb-8">
      {/* Hero image with overlay */}
      {recipe.image_url && !imgError ? (
        <div className="relative h-56 sm:h-72">
          <Image
            src={recipe.image_url}
            alt={recipe.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="absolute top-3 left-4 z-10">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors min-h-[44px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
              Back
            </Link>
          </div>
          {recipe.is_blueprint && (
            <div className="absolute top-3 right-4 z-10">
              <Badge variant="teal">Blueprint</Badge>
            </div>
          )}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <h1 className="text-2xl font-bold text-white leading-tight drop-shadow-lg">
              {recipe.title}
            </h1>
          </div>
        </div>
      ) : (
        <>
          <div className="px-4 py-3">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground transition-colors min-h-[44px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
              Back to recipes
            </Link>
          </div>
          <div className="px-4">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl font-bold text-foreground leading-tight">
                {recipe.title}
              </h1>
              {recipe.is_blueprint && (
                <Badge variant="teal" className="shrink-0 mt-1">Blueprint</Badge>
              )}
            </div>
          </div>
        </>
      )}

      {/* Description + stats */}
      <div className="px-4 mt-4 space-y-3">
        <p className="text-foreground-muted font-narrative text-sm leading-relaxed">
          {recipe.description}
        </p>

        {/* Quick stats */}
        <div className="flex items-center gap-4 text-sm">
          <span className="font-data text-foreground-muted flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M1 8a7 7 0 1114 0A7 7 0 011 8zm7.75-4.25a.75.75 0 00-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 000-1.5h-2.5v-3.5z" clipRule="evenodd" />
            </svg>
            {totalTime} min
          </span>
          <span className="font-data text-foreground-muted">
            {recipe.servings} serving{recipe.servings > 1 ? "s" : ""}
          </span>
          <span className={cn(
            "font-data",
            recipe.difficulty === "Easy" ? "text-success" :
            recipe.difficulty === "Medium" ? "text-amber" : "text-error"
          )}>
            {recipe.difficulty}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Nutrition Dashboard */}
      <div className="px-4 mt-6">
        <Card variant="outlined">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider text-foreground-muted flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-teal">
                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
              </svg>
              Nutrition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NutritionDashboard recipe={recipe} />
          </CardContent>
        </Card>
      </div>

      {/* Ingredients */}
      <div className="px-4 mt-6">
        <Card variant="outlined">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider text-foreground-muted">
              Ingredients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {recipe.recipe_ingredients?.map((ri, index) => (
                <li
                  key={ri.id || index}
                  className="flex items-start gap-3 text-sm"
                >
                  <span className="w-5 h-5 rounded-full bg-surface-elevated flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-data text-foreground-muted">
                      {index + 1}
                    </span>
                  </span>
                  <div>
                    <span className="text-foreground">
                      <span className="font-data text-teal">
                        {ri.quantity}{ri.unit}
                      </span>
                      {" "}
                      {ri.ingredient?.name ?? "Unknown"}
                    </span>
                    {ri.preparation && (
                      <span className="text-foreground-muted italic">
                        , {ri.preparation}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <div className="px-4 mt-6">
        <Card variant="outlined">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider text-foreground-muted">
              Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {recipe.instructions.map((step) => (
                <li key={step.step} className="flex gap-3">
                  <span className="w-7 h-7 rounded-lg bg-teal/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-teal font-data">
                      {step.step}
                    </span>
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm text-foreground leading-relaxed">
                      {step.text}
                    </p>
                    {step.duration_minutes && (
                      <p className="text-xs text-foreground-muted font-data flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                          <path fillRule="evenodd" d="M1 8a7 7 0 1114 0A7 7 0 011 8zm7.75-4.25a.75.75 0 00-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 000-1.5h-2.5v-3.5z" clipRule="evenodd" />
                        </svg>
                        ~{step.duration_minutes} min
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Science Notes */}
      {recipe.science_notes && recipe.science_notes.length > 0 && (
        <div className="px-4 mt-6">
          <Card variant="outlined">
            <CardContent className="pt-4">
              <ScienceCard notes={recipe.science_notes} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
