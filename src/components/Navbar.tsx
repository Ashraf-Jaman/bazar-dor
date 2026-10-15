
"use client";

import { fetchCategories } from "@/lib/categories";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  id: string | number;
  slug: string;
  nameBn: string;
  icon: string;
};

const Navbar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [banglaDate, setBanglaDate] = useState("");

  useEffect(() => {
    setBanglaDate(
      new Date().toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );

    async function getCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Categories fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    getCategories();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e5ebe5] bg-[#fbfdfb]">
      {/* Main Navbar */}
      <div className="mx-auto flex min-h-[68px] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-emerald-700">
            <Image
              src="/images/Stack.png"
              alt="বাজার দর"
              width={44}
              height={44}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-base font-bold leading-6 text-[#26352b] sm:text-lg">
              বাজার দর
            </h1>
            <p className="text-[11px] leading-4 text-[#737c74] sm:text-xs">
              {banglaDate || "তারিখ লোড হচ্ছে..."}
            </p>
          </div>
        </Link>

        {/* Auth Buttons */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <Link
            href="/sign-in"
            className="rounded-lg px-3 py-2.5 text-sm font-semibold text-[#29352c] transition hover:bg-emerald-50 sm:px-4"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 sm:px-5"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="border-t border-[#eef2ee]">
        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="mx-auto max-w-[1200px] overflow-x-auto px-3 scrollbar-hide sm:px-8 lg:px-10"
        >
          {loading ? (
            <div className="flex h-11 items-center px-2 text-sm text-gray-400">
              ক্যাটাগরি লোড হচ্ছে...
            </div>
          ) : (
            <ul className="flex min-h-11 w-max min-w-full items-center gap-2 sm:gap-4">
              {categories.map((category) => (
                <li key={category.id} className="shrink-0">
                  <Link
                    href={`/categories/${category.slug}`}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-[#374139] transition hover:bg-emerald-50 hover:text-emerald-700 sm:text-sm"
                  >
                    <span className="text-sm" aria-hidden="true">
                      {category.icon}
                    </span>
                    <span>{category.nameBn}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
