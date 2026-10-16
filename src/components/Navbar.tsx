
"use client";

import { fetchCategories } from "@/lib/categories";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Category = {
  id: string | number;
  slug: string;
  nameBn: string;
  icon: string;
};

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [banglaDate, setBanglaDate] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // Better Auth session
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  useEffect(() => {
    setBanglaDate(
      new Date().toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );

    let active = true;

    async function getCategories() {
      try {
        const data = await fetchCategories();

        if (active) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Categories fetch error:", error);
      } finally {
        if (active) setLoading(false);
      }
    }

    getCategories();

    return () => {
      active = false;
    };
  }, []);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const isCategoryActive = (slug: string) =>
    pathname === `/categories/${slug}`;

  const authLinkClass = (href: string) => {
    const isActive = pathname === href;

    return isActive
      ? "rounded-lg bg-emerald-50 px-3 py-2.5 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200 sm:px-4"
      : "rounded-lg px-3 py-2.5 text-sm font-semibold text-[#29352c] transition hover:bg-emerald-50 hover:text-emerald-800 sm:px-4";
  };

  const handleSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setProfileOpen(false);
            router.push("/sign-in");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e5ebe5] bg-[#fbfdfb]/95 shadow-sm backdrop-blur">
      {/* Main Navbar */}
      <div className="mx-auto flex min-h-[68px] max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          aria-label="বাজার দর হোম পেজ"
          className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-emerald-700 sm:h-11 sm:w-11">
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
            <h1 className="text-sm font-extrabold leading-6 text-[#26352b] sm:text-lg">
              বাজার দর
            </h1>
            <p className="text-[9px] leading-4 text-[#737c74] sm:text-xs">
              {banglaDate || "তারিখ লোড হচ্ছে..."}
            </p>
          </div>
        </Link>

        {/* Authentication */}
        <div className="flex shrink-0 items-center gap-2">
          {isPending ? (
            <div
              className="h-9 w-24 animate-pulse rounded-lg bg-emerald-50"
              aria-label="অ্যাকাউন্ট লোড হচ্ছে"
            />
          ) : user ? (
            /* Logged-in profile */
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                aria-label="প্রোফাইল মেনু"
                className="flex max-w-[190px] items-center gap-2 rounded-xl px-2 py-2 transition hover:bg-emerald-50 sm:gap-3 sm:px-3"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "প্রোফাইল"}
                    width={36}
                    height={36}
                    unoptimized
                    className="h-8 w-8 shrink-0 rounded-full border border-emerald-100 object-cover sm:h-9 sm:w-9"
                  />
                ) : (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800 sm:h-9 sm:w-9">
                    {(user.name || user.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}

                <span className="max-w-[90px] truncate text-sm font-semibold text-[#29352c] sm:max-w-[120px]">
                  {user.name || "আমার অ্যাকাউন্ট"}
                </span>

                <svg
                  className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.09 1.032l-4.25 4.5a.75.75 0 01-1.09 0l-4.25-4.5a.75.75 0 01.02-1.052z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-[60] mt-3 w-[min(340px,calc(100vw-24px))] origin-top-right rounded-2xl border border-[#e0e8df] bg-[#fbfdfb] p-3 shadow-xl sm:p-5"
                >
                  {/* User information */}
                  <div className="border-b border-[#e8eee7] px-2 pb-4 pt-1">
                    <p className="break-words text-base font-bold text-[#26352b] sm:text-lg">
                      {user.name || "ব্যবহারকারী"}
                    </p>
                    <p className="mt-1 break-all text-sm text-[#737c74] sm:text-base">
                      {user.email}
                    </p>
                  </div>

                  {/* My profile */}
                  <Link
                    href="/profile"
                    role="menuitem"
                    onClick={() => setProfileOpen(false)}
                    className="mt-2 flex items-center gap-3 rounded-xl px-2 py-3 text-sm font-medium text-[#29352c] transition hover:bg-emerald-50 sm:text-base"
                  >
                    <svg
                      className="h-5 w-5 shrink-0 text-[#62806a]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm0 2c-4.2 0-7.5 2.1-7.5 4.7V21h15v-2.3c0-2.6-3.3-4.7-7.5-4.7z" />
                    </svg>
                    আমার প্রোফাইল
                  </Link>

                  {/* Sign out */}
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                  >
                    <svg
                      className="h-5 w-5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M10 17l5-5-5-5" />
                      <path d="M15 12H3" />
                      <path d="M12 3h6a2 2 0 012 2v14a2 2 0 01-2 2h-6" />
                    </svg>
                    {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged-out links */
            <>
              <Link
                href="/sign-in"
                aria-current={pathname === "/sign-in" ? "page" : undefined}
                className={authLinkClass("/sign-in")}
              >
                সাইন ইন
              </Link>

              <Link
                href="/sign-up"
                aria-current={pathname === "/sign-up" ? "page" : undefined}
                className={`rounded-lg px-3 py-2.5 text-xs font-bold transition sm:px-5 sm:text-sm ${
                  pathname === "/sign-up"
                    ? "bg-emerald-900 text-white ring-2 ring-emerald-300 ring-offset-1"
                    : "bg-emerald-700 text-white shadow-sm hover:bg-emerald-800"
                }`}
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Category Navigation */}
      <div className="border-t border-[#eef2ee]">
        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="scrollbar-hide mx-auto max-w-[1200px] overflow-x-auto px-3 sm:px-8 lg:px-10"
        >
          {loading ? (
            <div className="flex h-12 items-center gap-2 px-2">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
              <span className="text-xs text-gray-400">
                ক্যাটাগরি লোড হচ্ছে...
              </span>
            </div>
          ) : categories.length > 0 ? (
            <ul className="flex min-h-12 w-max min-w-full items-center gap-1.5 sm:gap-2">
              {/* All products */}
              <li className="shrink-0">
                <Link
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                    pathname === "/"
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "text-[#374139] hover:bg-emerald-50 hover:text-emerald-800"
                  }`}
                >
                  <span aria-hidden="true">🏠</span>
                  <span>সব পণ্য</span>
                </Link>
              </li>

              {/* Dynamic categories */}
              {categories.map((category) => {
                const selected = isCategoryActive(category.slug);

                return (
                  <li key={category.id} className="shrink-0">
                    <Link
                      href={`/categories/${category.slug}`}
                      aria-current={selected ? "page" : undefined}
                      className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-200 sm:text-sm ${
                        selected
                          ? "border-emerald-700 bg-emerald-700 text-white shadow-sm"
                          : "border-transparent text-[#374139] hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800"
                      }`}
                    >
                      <span aria-hidden="true">{category.icon}</span>
                      <span>{category.nameBn}</span>
                      {selected && (
                        <span
                          className="ml-0.5 text-[10px]"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex h-12 items-center text-xs text-gray-500">
              ক্যাটাগরি পাওয়া যায়নি।
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
