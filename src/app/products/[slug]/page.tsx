"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useDeleteProductMutation, useGetProductBySlugQuery } from '@/features/products/productsApi';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge'
import Skeleton from '@/components/ui/Skeleton';
import ConfirmModal from '@/components/ConfirmModal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getSafeImageSrc } from '@/lib/images';

export default function ProductDetailsPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug as string;
  const router = useRouter();
  const { data: product, isLoading, isError, refetch } = useGetProductBySlugQuery(slug);
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();
  const [dialogOpen, setDialogOpen] = useState(false);

  function getErrorMessage(err: unknown): string {
    if (typeof err === 'object' && err && 'data' in err) {
      const data = (err as { data?: { message?: string } }).data;
      if (data?.message) return data.message;
    }
    if (err instanceof Error) return err.message;
    return 'Delete failed';
  }

  const handleDelete = async () => {
    if (!product) return;
    setDialogOpen(true);
  };

  if (isLoading) return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <Skeleton className="w-full h-60" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </main>
  );
  if (isError || !product) return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="text-sm text-[#A44A3F]">Error loading product. <button className="underline" onClick={() => refetch()}>Retry</button></div>
    </main>
  );

  // Use shared helper to sanitize and guard the image URL
  const { src: imageSrc, isPlaceholder } = getSafeImageSrc(product.images?.[0]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 flex flex-col gap-6">
      {product.images?.[0] && (
        <div className="relative w-full h-60">
          <Image
            src={imageSrc}
            alt={isPlaceholder ? `${product.name} placeholder` : product.name}
            fill
            sizes="100vw"
            className="object-cover rounded"
            priority={true}
          />
        </div>
      )}
      <div className='flex justify-between items-center gap-6'>
        <h1 className=" text-2xl font-semibold text-[#0D1821] capitalize">{product.name}</h1>
        <Badge variant="outline" className="text-lg text-primary">${product.price}</Badge>
      </div>
      <div className="flex flex-col gap-3">
        {product.description && <p className="mt-2 normal-case text-gray-700 text-justify">{product.description}</p>}
        {product.category && <p className="mt-2 text-sm text-gray-500">Category: {product.category.name}</p>}
      </div>

      <div className="mt-4 flex gap-3">
        <Button asChild variant="outline" size="sm" className="text-secondary hover:bg-secondary hover:text-white rounded">
          <Link href={`/products/${product.slug}/edit`}>Edit</Link>
        </Button>
        <Button variant="outline" size="sm" className="text-accent hover:bg-accent hover:text-white rounded" onClick={handleDelete}>
          {deleting ? 'Deleting…' : 'Delete'}
        </Button>
      </div>
      <ConfirmModal
        open={dialogOpen}
        title="Delete Product"
        message={`Are you sure you want to delete \n${product.name}?`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={async () => {
          try {
            await deleteProduct(product.id).unwrap();
            toast.success('Deleted');
            router.push('/products');
          } catch (e: unknown) {
            toast.error(getErrorMessage(e));
          } finally {
            setDialogOpen(false);
          }
        }}
        onCancel={() => setDialogOpen(false)}
      />
    </main>
  );
}