
import CategoryClient from "./CategoryClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({
  params,
}: PageProps) {
  const { slug } = await params;

  return <CategoryClient slug={slug} />;
}
