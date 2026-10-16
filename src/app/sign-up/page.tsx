
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    setSuccess("ফর্মটি সঠিকভাবে পূরণ করা হয়েছে।");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f5f1] px-4 py-10 sm:px-6">
      <div className="w-full max-w-[440px]">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#202923] sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm">
            নতুন যাত্রা শুরু করুন এবং আপনার অ্যাকাউন্ট তৈরি করুন।
          </p>
        </div>

        {/* Register Card */}
        <div className="rounded-2xl border border-[#e4ebe5] bg-white p-5 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#27332a]"
              >
                নাম
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="আপনার সম্পূর্ণ নাম"
                autoComplete="name"
                required
                className="w-full rounded-lg border border-[#dfe7e0] bg-[#fbfdfb] px-3 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#27332a]"
              >
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-[#dfe7e0] bg-[#fbfdfb] px-3 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#27332a]"
              >
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-[#dfe7e0] bg-[#fbfdfb] px-3 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-[#27332a]"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="আবার পাসওয়ার্ড লিখুন"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-[#dfe7e0] bg-[#fbfdfb] px-3 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Feedback */}
            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            {success && (
              <p role="status" className="text-sm text-green-700">
                {success}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#078b43] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#067537] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-[0.99]"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#e3e9e4]" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-[#e3e9e4]" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => alert("Google authentication সেটআপ করতে হবে।")}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#dfe7e0] px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <svg viewBox="0 0 48 48" className="h-5 w-5">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.3 1.2 8.5 3.2l6.3-6.3C35 2.5 29.9 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.4 5.7C11.8 13.1 17.4 9.5 24 9.5Z" />
                <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.6 2.9-2.2 5.3-4.6 6.9l7.3 5.7c4.3-4 7-9.9 7-17.1Z" />
                <path fill="#FBBC05" d="M10 28.9a14.5 14.5 0 0 1 0-9.8l-7.4-5.7a24 24 0 0 0 0 21.2l7.4-5.7Z" />
                <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-6.4l-7.3-5.7c-2 1.4-4.7 2.3-8.7 2.3-6.6 0-12.2-3.6-14-9.4l-7.4 5.7C6.5 42.6 14.6 48 24 48Z" />
              </svg>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={() => alert("GitHub authentication সেটআপ করতে হবে।")}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#dfe7e0] px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.31-3.76-1.31-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.59 1.21 3.22.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.24-5.1 5.51.4.35.75 1.03.75 2.08v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-[#078b43] hover:text-[#056b33] hover:underline"
            >
              লগ ইন করুন
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          ←{" "}
          <Link href="/" className="transition hover:text-green-700">
            সাইটে ফিরে যান
          </Link>
        </p>
      </div>
    </main>
  );
}
