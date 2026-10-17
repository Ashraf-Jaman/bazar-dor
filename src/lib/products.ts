
export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: string | number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon?: string;
  image?: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change?: {
    dir?: "flat" | "up" | "down" | "same";
    pct: number;
  };
  markets?: Market[];
};

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_URL, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Product fetch failed: ${response.status}`);
  }

  const result: unknown = await response.json();

  let items: unknown;

  if (Array.isArray(result)) {
    items = result;
  } else if (typeof result === "object" && result !== null) {
    if ("data" in result && Array.isArray(result.data)) {
      items = result.data;
    } else if ("products" in result && Array.isArray(result.products)) {
      items = result.products;
    }
  }

  if (!Array.isArray(items)) {
    throw new Error("Unexpected products API response format");
  }

  return items as Product[];
}
