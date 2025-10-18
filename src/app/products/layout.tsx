import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse and manage products, categories, and inventory.",
  alternates: { canonical: "/products" },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}