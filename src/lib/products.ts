

export async function fetchProducts() {
  const response = await fetch("https://openapi.programming-hero.com/api/bazardor/products");

  if (!response.ok) {
    throw new Error("Data fetch failed");
  }

  return response.json();
}   