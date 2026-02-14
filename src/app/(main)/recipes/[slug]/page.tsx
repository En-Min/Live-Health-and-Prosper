import { notFound } from "next/navigation";
import { getRecipeBySlug, recipes } from "@/data/seed";
import { RecipeDetailClient } from "./recipe-detail-client";
import type { Metadata } from "next";

interface RecipeDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({
  params,
}: RecipeDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return { title: "Recipe Not Found" };

  return {
    title: recipe.title,
    description: recipe.description,
  };
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return <RecipeDetailClient recipe={recipe} />;
}
