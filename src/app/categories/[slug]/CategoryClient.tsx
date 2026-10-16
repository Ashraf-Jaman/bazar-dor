
"use client";

import { fetchProducts, type Product } from "@/lib/products";
import { fetchCategories } from "@/lib/categories";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Category = {
  id: string | number;
  slug?: string;
  nameBn?: string;
  icon?: string;
};

type Props = {
  slug: string;
};

type SortOption = "default" | "price-low" | "price-high";

export default function CategoryClient({ slug }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [productData, categoryData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);

        if (!active) return;

        setProducts(productData);
        setCategories(categoryData as Category[]);
      } catch (err) {
        if (active) {
          setError("পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করো।");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, []);

  const normalizedSlug = slug.trim().toLowerCase();

  const categoryProducts = useMemo(() => {
    const filtered = products.filter(
      (product) =>
        typeof product.category === "string" &&
        product.category.trim().toLowerCase() === normalizedSlug
    );

    const searched = filtered.filter((product) =>
      (product.nameBn ?? "")
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    );

    return [...searched].sort((a, b) => {
      if (sortBy === "price-low") return a.today - b.today;
      if (sortBy === "price-high") return b.today - a.today;
      return 0;
    });
  }, [products, normalizedSlug, search, sortBy]);

  const category = categories.find(
    (item) =>
      typeof item.slug === "string" &&
      item.slug.trim().toLowerCase() === normalizedSlug
  );

  const firstProduct = products.find(
    (product) =>
      typeof product.category === "string" &&
      product.category.trim().toLowerCase() === normalizedSlug
  );

  const categoryName =
    category?.nameBn ?? firstProduct?.categoryNameBn ?? "পণ্যের ক্যাটাগরি";

  const categoryIcon =
    category?.icon ?? firstProduct?.categoryIcon ?? "🛒";

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-5 text-[#26332c] sm:px-6 sm:py-7">
      <div className="mx-auto max-w-6xl">
        {/* Category heading */}
        <section className="flex min-h-[76px] items-center gap-3 rounded-xl border border-[#e5ebe5] bg-white/80 px-4 py-4 sm:px-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0f4ef] text-2xl">
            {categoryIcon}
          </div>

          <div>
            <h1 className="text-lg font-bold sm:text-xl">
              {categoryName}
            </h1>
            <p className="mt-1 text-xs text-[#7a857d]">
              {categoryName} পণ্যের বাজারদর ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Search and sorting */}
        <section className="mt-4 flex flex-col gap-3 rounded-xl border border-[#e5ebe5] bg-white/80 p-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="পণ্যের নাম লিখে খুঁজুন..."
            className="w-full rounded-lg border border-[#e0e7e0] bg-[#f8faf8] px-3 py-2 text-sm outline-none transition focus:border-[#91aa91] sm:max-w-sm"
          />

          <div className="flex items-center justify-between gap-2 sm:justify-end">
            <label htmlFor="sort" className="text-xs text-[#778078]">
              সাজান
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              className="rounded-lg border border-[#dfe6df] bg-white px-3 py-2 text-xs outline-none focus:border-[#91aa91]"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-low">দাম: কম থেকে বেশি</option>
              <option value="price-high">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </section>

        {/* Product count */}
        <div className="mb-3 mt-4 text-xs text-[#7a857d]">
          {loading
            ? "পণ্য লোড হচ্ছে..."
            : `${categoryProducts.length}টি পণ্য পাওয়া গেছে`}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-xl border border-[#e5ebe5] bg-white"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-100 bg-white p-6 text-center text-sm text-red-600">
            {error}
            <button
              onClick={() => window.location.reload()}
              className="ml-2 font-semibold underline"
            >
              আবার চেষ্টা করো
            </button>
          </div>
        )}

        {/* Products */}
        {!loading && !error && categoryProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group rounded-xl border border-[#e5ebe5] bg-white p-3 transition duration-200 hover:-translate-y-0.5 hover:border-[#c9d8c9] hover:shadow-sm sm:p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ef] text-2xl">
                    {product.image || product.categoryIcon || "🛒"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-bold text-[#26332c] group-hover:text-[#527552]">
                      {product.nameBn}
                    </h2>
                    <p className="mt-1 text-[11px] text-[#849087]">
                      {product.categoryNameBn ?? categoryName}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-[10px] text-[#859087]">
                      আজকের বাজারদর
                    </p>
                    <p className="mt-1 text-base font-bold">
                      {product.today}{" "}
                      <span className="text-[11px] font-medium text-[#788078]">
                        টাকা/{product.unit}
                      </span>
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                      product.change?.dir === "up"
                        ? "bg-[#fff0ed] text-[#d94b3d]"
                        : product.change?.dir === "down"
                          ? "bg-[#eaf7ed] text-[#26834a]"
                          : "bg-[#f0f3f0] text-[#788078]"
                    }`}
                  >
                    {product.change?.dir === "up"
                      ? "▲"
                      : product.change?.dir === "down"
                        ? "▼"
                        : "—"}{" "}
                    {product.change?.pct ?? 0}%
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && categoryProducts.length === 0 && (
          <div className="rounded-xl border border-[#e5ebe5] bg-white px-5 py-12 text-center">
            <div className="text-3xl">🛒</div>
            <h2 className="mt-3 text-base font-bold">
              কোনো পণ্য পাওয়া যায়নি
            </h2>
            <p className="mt-1 text-sm text-[#849087]">
              অন্য নাম দিয়ে খুঁজে দেখো অথবা অন্য ক্যাটাগরি নির্বাচন করো।
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 rounded-lg bg-[#26332c] px-4 py-2 text-sm font-semibold text-white"
              >
                সার্চ মুছে ফেলো
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
