"use client";
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useDeleteProductMutation, useGetProductsQuery, useSearchProductsQuery, productsApi } from '@/features/products/productsApi';
import { useGetCategoriesQuery } from '@/features/categories/categoriesApi';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import Skeleton from '@/components/ui/Skeleton';
import Link from 'next/link';
import { toast } from 'sonner';
import ConfirmModal from '@/components/ConfirmModal';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [categoryId, setCategoryId] = useState<string>('');
  const offset = (page - 1) * limit;
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);


  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const listQueryEnabled = !debouncedQuery;
  const { data: products = [], isLoading, isError, refetch } = useGetProductsQuery(
    listQueryEnabled ? { offset, limit, categoryId: categoryId || undefined } : undefined,
    { skip: !listQueryEnabled }
  );
  const { data: searched = [], isLoading: searching } = useSearchProductsQuery({ searchedText: debouncedQuery }, {
    skip: !debouncedQuery
  });
  const { data: categories = [], isLoading: categoriesLoading } = useGetCategoriesQuery();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  const current = useMemo(() => (debouncedQuery ? searched : products), [debouncedQuery, products, searched]);

  const requestDelete = (id: string) => {
    setConfirmId(id);
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!confirmId) return;
    // Optimistically remove the product from the current list cache
    const patch = (debouncedQuery
      ? dispatch(productsApi.util.updateQueryData('searchProducts', { searchedText: debouncedQuery }, (draft) => {
        const idx = draft.findIndex((p) => p.id === confirmId);
        if (idx !== -1) draft.splice(idx, 1);
      }))
      : dispatch(productsApi.util.updateQueryData('getProducts', { offset, limit, categoryId: categoryId || undefined }, (draft) => {
        const idx = draft.findIndex((p) => p.id === confirmId);
        if (idx !== -1) draft.splice(idx, 1);
      }))
    );

    try {
      await deleteProduct(confirmId).unwrap();
      toast.success('Deleted');
    } catch (e: unknown) {
      // Revert optimistic update if delete fails
      patch.undo();
      toast.error(getErrorMessage(e));
    } finally {
      setDialogOpen(false);
      setConfirmId(null);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 flex flex-col gap-6 lg:gap-12">
      <div className=" flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-3">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
            className="w-full max-w-sm placeholder:text-muted-foreground/55"
          />
          {/* Category filter */}
          <div className="">
            <Select
              value={categoryId}
              onValueChange={(val) => {
                const next = val === "all" ? "" : val;
                setCategoryId(next);
                setPage(1);
              }}
            >
              <SelectTrigger aria-label="Filter by category" className="w-full max-w-sm">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Categories</SelectItem>
                {categoriesLoading ? (
                  <SelectItem value="__loading" disabled>Loading…</SelectItem>
                ) : (
                  categories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button asChild className="rounded">
          <Link href="/products/create">Create</Link>
        </Button>
      </div>

      {isLoading || searching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded border-0 bg-text-light shadow-sm overflow-hidden">
              <Skeleton className="w-full h-40" aria-hidden="true" />
              <div className="p-3">
                <Skeleton className="h-5 w-2/3 mb-2" aria-hidden="true" />
                <Skeleton className="h-4 w-1/3" aria-hidden="true" />
                <Skeleton className="h-4 w-full mt-2" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-sm text-accent">Error loading products. <button className="underline" onClick={() => refetch()}>Retry</button></div>
      ) : current.length === 0 ? (
        <p className="text-sm text-text/70">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {current.map((p) => (
            <ProductCard key={p.id} product={p} onDelete={requestDelete} />
          ))}
        </div>
      )}

      <div className="">
        <Pagination
          page={page}
          limit={limit}
          onPageChange={(p) => setPage(Math.max(p, 1))}
          onLimitChange={(l) => { setLimit(l); setPage(1); }}
        />
      </div>

      {deleting && <p className="mt-2 text-sm text-text/60">Deleting…</p>}

      <ConfirmModal
        open={dialogOpen}
        title="Delete Product"
        message={`Are you sure you want to delete \n${(current.find((p) => p.id === confirmId)?.name) || 'this product'}?`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => { setDialogOpen(false); setConfirmId(null); }}
      />
    </main>
  );
}


function getErrorMessage(err: unknown): string {
  if (typeof err === 'object' && err && 'data' in err) {
    const data = (err as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  if (err instanceof Error) return err.message;
  return 'Delete failed';
}