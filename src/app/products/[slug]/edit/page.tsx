"use client";
import { useParams, useRouter } from 'next/navigation';
import { useGetProductBySlugQuery, useUpdateProductMutation } from '@/features/products/productsApi';
import ProductForm from '@/components/ProductForm';
import { toast } from 'sonner';
import type { ProductFormValues } from '@/components/ProductForm';

export default function EditProductPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug as string;
  const router = useRouter();

  const { data: product, isLoading, isError, refetch } = useGetProductBySlugQuery(slug);
  const [updateProduct, { isLoading: saving }] = useUpdateProductMutation();

  const handleSubmit = async (values: ProductFormValues) => {
    if (!product) return;
    try {
      const res = await updateProduct({ id: product.id, body: values }).unwrap();
      toast.success('Product updated');
      router.push(`/products/${res.slug}`);
    } catch (e: unknown) {
      toast.error(getErrorMessage(e));
    }
  };

  if (isLoading) return <main className="mx-auto max-w-2xl px-4 py-6">Loading…</main>;
  if (isError || !product) return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <div className="text-sm text-[#A44A3F]">Error loading product. <button className="underline" onClick={() => refetch()}>Retry</button></div>
    </main>
  );

  const initialValues = {
    name: product.name,
    price: product.price,
    description: product.description || '',
    images: product.images?.length ? product.images : [''],
    categoryId: product.category?.id || ''
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4 text-[#0D1821]">Edit Product</h1>
      <ProductForm initialValues={initialValues} onSubmit={handleSubmit} submitting={saving} />
    </main>
  );
}

function getErrorMessage(err: unknown): string {
  if (typeof err === 'object' && err && 'data' in err) {
    const data = (err as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  if (err instanceof Error) return err.message;
  return 'Update failed';
}