"use client";

import { useState, useEffect, useMemo } from "react";
import { recipes, searchRecipes } from "@/data/seed";
import type { Recipe } from "@/types/recipe";

interface UseRecipesOptions {
  search?: string;
  category?: string;
}

export function useRecipes({ search = "", category }: UseRecipesOptions = {}) {
  const [loading, setLoading] = useState(true);

  // Simulate async loading for consistent UX with eventual Supabase integration
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [search, category]);

  const filtered = useMemo(() => {
    return searchRecipes(search, category);
  }, [search, category]);

  return { recipes: filtered, loading };
}

export function useRecipe(slug: string) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = recipes.find((r) => r.slug === slug);
    setRecipe(found ?? null);
    setLoading(false);
  }, [slug]);

  return { recipe, loading };
}
