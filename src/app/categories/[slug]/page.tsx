
import { Suspense } from "react";
import CategoryClient from "./CategoryClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function CategoryLoading() {
  return (
    <main className="mx-auto min-h-[50vh] max-w-7xl px-4 py-10">
      <div className="h-8 w-56 animate-pulse rounded bg-gray-200" />
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-xl bg-gray-100"
          />
        ))}
      </div>
    </main>
  );
}

async function CategoryContent({ params }: PageProps) {
  const { slug } = await params;

  return <CategoryClient slug={slug} />;
}

export default function CategoryPage({ params }: PageProps) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
