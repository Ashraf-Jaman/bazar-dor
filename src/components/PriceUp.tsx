
import { fetchProducts } from "@/lib/products";
import Link from "next/link";

type Product = {
  id: number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon?: string;
  image?: string;
  unit: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "same" | "flat";
    pct: number;
  };
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);

const PriceUp = async () => {
  let priceUpData: Product[] = [];

  try {
    const products: Product[] = await fetchProducts();

    priceUpData = products.filter(
      (product) => product.change?.dir === "up"
    );
  } catch (error) {
    console.error("Failed to load price-up products:", error);

    return (
      <section className="w-full bg-[#f0f5f0] px-4 py-7 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1100px] rounded-xl border border-[#e1e8e1] bg-white p-6 text-center">
          <p className="text-sm text-red-600">
            পণ্যের তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করো।
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#f0f5f0] px-4 py-7 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1100px]">
        {/* Section heading */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xs text-red-500">▲</span>
          <h2 className="text-base font-bold tracking-tight text-[#202820] sm:text-lg">
            আজ দাম বেড়েছে
          </h2>
        </div>

        {/* Empty state */}
        {priceUpData.length === 0 ? (
          <div className="rounded-xl border border-[#e1e8e1] bg-[#fbfdfb] px-4 py-8 text-center">
            <p className="text-sm font-semibold text-[#263027]">
              আজ কোনো পণ্যের দাম বাড়েনি
            </p>
            <p className="mt-1 text-xs text-[#7b847b]">
              নতুন তথ্য পাওয়া গেলে এখানে দেখানো হবে।
            </p>
          </div>
        ) : (
          /* Product cards */
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {priceUpData.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block rounded-xl border border-[#e1e8e1] bg-[#fbfdfb] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#cbd9cb] hover:shadow-sm sm:p-5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ef] text-2xl">
                    {product.image || product.categoryIcon || "🛒"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold leading-6 text-[#263027] group-hover:text-green-800 sm:text-base">
                      {product.nameBn}
                    </h3>

                    <p className="text-xs leading-5 text-[#7b847b] sm:text-sm">
                      {product.categoryNameBn || "অন্যান্য"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between gap-2">
                  <div>
                    <p className="mb-1 text-[11px] text-[#687168] sm:text-xs">
                      আজকের দাম
                    </p>

                    <p className="text-base font-bold leading-6 text-[#202820] sm:text-lg">
                      {formatPrice(product.today)} টাকা
                      <span className="ml-1 text-xs font-medium text-[#687168]">
                        /{product.unit}
                      </span>
                    </p>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#fff0ed] px-2.5 py-1.5 text-xs font-semibold text-red-500">
                    <span className="text-[10px]">▲</span>
                    {formatPrice(product.change?.pct ?? 0)}%
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PriceUp;
