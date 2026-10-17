
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProducts } from "@/lib/products";
import type { Product } from "@/lib/products";

type PageProps = {
  params: Promise<{ id: string }>;
};

const money = (value: number) =>
  new Intl.NumberFormat("bn-BD").format(value);

export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  let products: Product[];

  try {
    products = await fetchProducts();
  } catch {
    return (
      <main className="min-h-screen bg-[#f0f5f0] px-4 py-10">
        <div className="mx-auto max-w-5xl rounded-xl border border-[#e5ebe5] bg-white p-6 text-center">
          <h1 className="font-bold text-[#26332c]">
            পণ্যের তথ্য লোড করা যায়নি
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            কিছুক্ষণ পর আবার চেষ্টা করো।
          </p>

          <Link
            href="/"
            className="mt-4 inline-block text-sm font-semibold underline"
          >
            হোম পেজে ফিরে যাও
          </Link>
        </div>
      </main>
    );
  }

  const product = products.find(
    (item: Product) => String(item.id) === id
  );

  if (!product) {
    notFound();
  }

  const changeDirection = product.change?.dir;

  const changeColor =
    changeDirection === "up"
      ? "text-red-600"
      : changeDirection === "down"
        ? "text-green-700"
        : "text-gray-500";

  const changeIcon =
    changeDirection === "up"
      ? "▲"
      : changeDirection === "down"
        ? "▼"
        : "—";

  const priceComparisons = [
    {
      label: "গতকাল",
      price: product.yesterday,
      color: "text-green-700",
      icon: "↗",
    },
    {
      label: "গত সপ্তাহ",
      price: product.lastWeek,
      color: "text-red-600",
      icon: "↗",
    },
    {
      label: "গত মাস",
      price: product.lastMonth,
      color: "text-green-700",
      icon: "↗",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-5 text-[#26332c] sm:px-6 sm:py-7">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[#78847b]">
          <Link href="/" className="transition hover:text-green-800">
            হোম
          </Link>

          <span>/</span>

          <Link
            href={`/categories/${product.category}`}
            className="transition hover:text-green-800"
          >
            {product.categoryNameBn}
          </Link>

          <span>/</span>

          <span className="font-medium text-[#344239]">
            {product.nameBn}
          </span>
        </nav>

        <section className="flex flex-col gap-4 rounded-xl border border-[#e4ebe4] bg-white/90 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ef] text-2xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-extrabold sm:text-xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-[#7d887f]">
                {product.categoryNameBn} · বাজারদর ও মূল্য পরিবর্তন
              </p>

              <p className="mt-1 text-xs text-[#657168]">
                একক: {product.unit}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-6 rounded-xl bg-[#f3f7f2] px-4 py-3 sm:min-w-[145px] sm:flex-col sm:items-end sm:gap-1">
            <div>
              <p className="text-[11px] text-[#7c887e]">
                আজকের বাজারদর
              </p>

              <p className="mt-1 text-2xl font-extrabold">
                {money(product.today)}
                <span className="ml-1 text-xs font-medium">
                  টাকা
                </span>
              </p>

              <p className="text-[11px] text-[#7c887e]">
                প্রতি {product.unit}
              </p>
            </div>

            <span className={`text-xs font-bold ${changeColor}`}>
              {changeIcon} {money(product.change?.pct ?? 0)}%
            </span>
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-[#e4ebe4] bg-white/90 p-4 sm:p-5">
          <h2 className="text-sm font-bold">
            দামের তুলনামূলক চিত্র
          </h2>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {priceComparisons.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#e8eee8] bg-[#fbfcfb] p-3"
              >
                <p className="text-[11px] text-[#7d887f]">
                  {item.label}
                </p>

                <p className={`mt-2 text-base font-extrabold ${item.color}`}>
                  {item.icon} {money(item.price)} টাকা
                </p>

                <p className="mt-1 text-[10px] text-[#8a948c]">
                  প্রতি {product.unit}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <h2 className="text-sm font-bold">
              বাজারভিত্তিক বর্তমান দাম
            </h2>

            {product.markets && product.markets.length > 0 ? (
              <div className="mt-3 overflow-x-auto rounded-xl border border-[#e4ebe4]">
                <table className="w-full min-w-[520px] border-collapse text-left text-xs">
                  <thead className="bg-[#f5f8f4] text-[#667269]">
                    <tr>
                      <th className="px-4 py-3 font-semibold">বাজার</th>
                      <th className="px-4 py-3 font-semibold">বিভাগ</th>
                      <th className="px-4 py-3 text-right font-semibold">
                        সর্বনিম্ন দাম
                      </th>
                      <th className="px-4 py-3 text-right font-semibold">
                        সর্বোচ্চ দাম
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {product.markets.map((market, index) => (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-t border-[#e5ebe5] even:bg-[#f5f8f4] hover:bg-[#edf4eb]"
                      >
                        <td className="px-4 py-3 font-medium">
                          {market.market}
                        </td>

                        <td className="px-4 py-3 text-[#68756b]">
                          {market.division}
                        </td>

                        <td className="px-4 py-3 text-right font-semibold">
                          {money(market.min)} টাকা
                        </td>

                        <td className="px-4 py-3 text-right font-semibold">
                          {money(market.max)} টাকা
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-3 rounded-xl border border-dashed border-[#dce5dc] px-4 py-8 text-center text-sm text-[#7d887f]">
                এই পণ্যের বাজারভিত্তিক তথ্য এখন পাওয়া যাচ্ছে না।
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
