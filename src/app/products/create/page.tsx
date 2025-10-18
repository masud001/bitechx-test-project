"use client";
import { useRouter } from 'next/navigation';
import { useCreateProductMutation } from '@/features/products/productsApi';
import ProductForm from '@/components/ProductForm';
import { toast } from 'sonner';

export default function CreateProductPage() {
  const router = useRouter();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  function getErrorMessage(err: unknown): string {
    if (typeof err === 'object' && err && 'data' in err) {
      const data = (err as { data?: { message?: string } }).data;
      if (data?.message) return data.message;
    }
    if (err instanceof Error) return err.message;
    return 'Create failed';
  }

  const handleSubmit = async (values: { name: string; price: number; description?: string; images: string[]; categoryId: string }) => {
    try {
      const res = await createProduct(values).unwrap();
      toast.success('Product created');
      router.push(`/products/${res.slug}`);
    } catch (e: unknown) {
      toast.error(getErrorMessage(e));
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4 text-[#0D1821]">Create Product</h1>
      <ProductForm onSubmit={handleSubmit} submitting={isLoading} />
    </main>
  );
}