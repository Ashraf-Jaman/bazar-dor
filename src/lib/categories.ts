import { Category } from "@/types/category";

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");

  if (!response.ok) {
    throw new Error("Data fetch failed");
  }

  return response.json();
}