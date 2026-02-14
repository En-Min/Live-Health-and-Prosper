"use client";

import { useState } from "react";
import { useRecipes } from "@/hooks/use-recipes";
import { SearchInput } from "@/components/ui/search-input";
import { FilterChips } from "@/components/ui/filter-chips";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { RecipeCardSkeleton } from "@/components/ui/skeleton";
import { RECIPE_CATEGORIES } from "@/lib/constants";

export function RecipeListClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const { recipes, loading } = useRecipes({
    search,
    category: category ?? undefined,
  });

  return (
    <div className="px-4 py-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Recipe Library</h1>
        <p className="text-foreground-muted text-sm mt-1">
          Blueprint-inspired recipes backed by science
        </p>
      </div>

      {/* Search */}
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search recipes, ingredients, tags..."
      />

      {/* Category filters */}
      <FilterChips
        options={RECIPE_CATEGORIES}
        selected={category}
        onChange={setCategory}
      />

      {/* Results count */}
      {!loading && (
        <p className="text-xs text-foreground-muted font-data">
          {recipes.length} recipe{recipes.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Recipe grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <RecipeCardSkeleton key={i} />
          ))
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center h-48 rounded-xl border border-dashed border-border">
            <p className="text-foreground-muted text-sm">
              No recipes match your search
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory(null);
              }}
              className="text-teal text-sm mt-2 hover:text-teal-light transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
