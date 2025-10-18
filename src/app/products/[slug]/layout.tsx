import type { Metadata, ResolvingMetadata } from "next";

type Props = { params: { slug: string } };

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const prettyName = slug.replace(/-/g, " ");
  return {
    title: `${prettyName} — Product`,
    description: `View details, category, images, and price for ${prettyName}.`,
    alternates: { canonical: `/products/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default function ProductSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}