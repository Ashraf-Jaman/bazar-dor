
"use client";

import { fetchProducts } from "@/lib/products";
import type { Product } from "@/lib/products";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";

const NewsMarquee = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        const data = await fetchProducts();

        if (!cancelled) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
      <Marquee
        speed={40}
        pauseOnHover
        gradient={false}
        autoFill
      >
        {products.map((product) => {
          const isUp = product.change?.dir === "up";
          const isDown = product.change?.dir === "down";

          return (
            <div
              key={product.id}
              className="flex shrink-0 items-center gap-2 border-r border-gray-200 px-3 py-2 sm:gap-2.5 sm:px-5 sm:py-2.5"
            >
              <span className="text-sm sm:text-base" aria-hidden="true">
                {product.categoryIcon || product.image || "🛒"}
              </span>

              <span className="whitespace-nowrap text-[11px] font-medium text-gray-700 sm:text-sm">
                {product.nameBn}
              </span>

              <span className="whitespace-nowrap text-[11px] text-gray-800 sm:text-sm">
                {product.today} টাকা/{product.unit}
              </span>

              <span
                className={`flex items-center gap-1 whitespace-nowrap text-[11px] font-semibold sm:text-sm ${
                  isUp
                    ? "text-red-600"
                    : isDown
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {isUp ? (
                  <span aria-label="দাম বেড়েছে">▲</span>
                ) : isDown ? (
                  <span aria-label="দাম কমেছে">▼</span>
                ) : (
                  <span aria-label="দাম অপরিবর্তিত">●</span>
                )}

                {Math.abs(product.change?.pct ?? 0).toFixed(1)}%
              </span>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default NewsMarquee;
