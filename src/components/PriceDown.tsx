
import { fetchProducts } from "@/lib/products";

type Product = {
  id: number;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon?: string;
  image?: string;
  unit: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);

const PriceDown = async () => {
  const products: Product[] = await fetchProducts();

  const priceDownData = products.filter(
    (product) => product.change?.dir === "down"
  );

  return (
    <section className="w-full bg-[#f0f5f0] px-4 py-7 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xs text-green-600">▼</span>
          <h2 className="text-base font-bold text-[#202820] sm:text-lg">
            আজ দাম কমেছে
          </h2>
        </div>

        {priceDownData.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {priceDownData.map((product) => (
              <article
                key={product.id}
                className="rounded-xl border border-[#e1e8e1] bg-[#fbfdfb] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm sm:p-5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ef] text-2xl">
                    {product.image || product.categoryIcon || "🛒"}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold leading-6 text-[#263027] sm:text-base">
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
                    </p>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#e7f5e9] px-2.5 py-1.5 text-xs font-semibold text-green-700">
                    <span className="text-[10px]">▼</span>
                    {formatPrice(product.change.pct)}%
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-[#e1e8e1] bg-[#fbfdfb] px-4 py-8 text-center text-sm text-[#687168]">
            এই মুহূর্তে দাম কমেছে এমন কোনো পণ্য নেই।
          </div>
        )}
      </div>
    </section>
  );
};

export default PriceDown;
