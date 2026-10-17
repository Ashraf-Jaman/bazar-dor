
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("আপনার নাম লিখুন।");
      return;
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        setError(
          result.error.message || "প্রোফাইল আপডেট করা যায়নি।"
        );
        return;
      }

      setMessage("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch {
      setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  };

  if (isPending || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eff5ef]">
        <p className="text-sm text-gray-500">
          প্রোফাইল লোড হচ্ছে...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eff5ef] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-md">
        <div className="mb-5">
          <h1 className="text-xl font-extrabold text-[#26352b]">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            আপনার ব্যক্তিগত তথ্য দেখুন এবং আপডেট করুন।
          </p>
        </div>

        <section className="mb-4 rounded-xl border border-[#e3ebe3] bg-[#fbfdfb] p-4 shadow-sm">
          <div className="flex items-center gap-3">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "Profile picture"}
                width={48}
                height={48}
                unoptimized
                className="h-12 w-12 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-lg font-bold text-emerald-800">
                {(user.name || user.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-bold text-[#26352b]">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="break-all text-xs text-gray-500">
                {user.email}
              </p>
            </div>

            <Link
              href="/"
              className="shrink-0 rounded-md border border-red-300 px-2.5 py-1.5 text-[10px] font-semibold text-red-500 transition hover:bg-red-50 sm:text-xs"
            >
              হোম পেজ
            </Link>
          </div>
        </section>

        <section className="rounded-xl border border-[#e3ebe3] bg-[#fbfdfb] p-4 shadow-sm sm:p-5">
          <h2 className="mb-5 text-sm font-bold text-[#26352b]">
            তথ্য
          </h2>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-medium text-[#465248]"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                autoComplete="name"
                required
                maxLength={100}
                className="w-full rounded-md border border-[#dfe8df] bg-transparent px-3 py-2 text-sm text-[#26352b] outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {message && (
              <p
                role="status"
                className="rounded-md bg-emerald-50 p-2 text-xs text-emerald-700"
              >
                {message}
              </p>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-md bg-red-50 p-2 text-xs text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={saving || !name.trim()}
              className="w-full rounded-md bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
