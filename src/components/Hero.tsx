"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className=" px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[230px] max-w-6xl flex-col items-center justify-between gap-6 rounded-[20px] border border-[#e1e9e1] bg-[#fbfdfb] px-5 py-7 sm:px-8 md:flex-row md:px-10 md:py-8">
        {/* Left content */}
        <div className="w-full flex-1 text-center md:text-left">
          <span className="inline-flex rounded-full bg-[#e1f3e7] px-3 py-1 text-xs font-semibold text-[#07853f]">
            বৃহস্পতিবার, ১৫ অক্টোবর, ২০২৬
          </span>

          <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#202a22] sm:text-3xl lg:text-[34px]">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mx-auto mt-3 max-w-[470px] text-sm leading-6 text-[#6d756e] md:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#products"
            className="mt-5 inline-flex min-h-10 items-center justify-center rounded-md bg-[#078b43] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#067438] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#078b43] focus-visible:ring-offset-2"
          >
            সব পণ্য দেখুন
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        {/* Right vegetable illustration */}
        <div className="flex w-full shrink-0 items-center justify-center md:w-[230px] lg:w-[250px]">
            <Image
              src="/images/bazar-hero.png"
              alt="সবজির ঝুড়ির ছবি"
              width={250}
              height={250}
              priority
              quality={100}
              className="h-auto w-full"
            />
        </div>
      </div>
    </section>
  );
}