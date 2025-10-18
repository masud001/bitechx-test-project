"use client";
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/features/products/productsApi';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getSafeImageSrc } from '@/lib/images';

export default function ProductCard({ product, onDelete }: { product: Product; onDelete?: (id: string) => void }) {
  const { src: imageSrc, isPlaceholder } = getSafeImageSrc(product.images?.[0]);

  return (
    <Card className="overflow-hidden border-[.5px] border-gray-200 shadow-md flex flex-col">
      <div className="relative w-full h-40">
        <Image
          src={imageSrc}
          alt={isPlaceholder ? `${product.name} placeholder` : product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          priority={false}
        />
        {product.category?.name && (
          <Badge variant="secondary" className="w-fit capitalize text-xs absolute top-3 left-3 shadow">{product.category.name}</Badge>
        )}
      </div>
      <CardContent className='pt-4 flex flex-col gap-1.5 justify-start'>

        <div className='flex flex-row justify-between items-center gap-1.5'>

          <h3 className="text-lg font-semibold text-text capitalize">{product.name}</h3>
          <Badge variant="outline" className="text-lg text-primary">${product.price}</Badge>
        </div>

        {product.description && (
          <p className="mt-2 text-sm text-text/70 line-clamp-2">{product.description}</p>
        )}
      </CardContent>
      <CardFooter className=" mt-auto gap-2 flex w-full justify-between items-center">
        <Button asChild variant="outline" className='text-primary rounded-md w-full hover:bg-primary hover:text-white'>
          <Link href={`/products/${product.slug}`}>View</Link>
        </Button>
        <Button asChild variant="outline" className="text-secondary hover:bg-secondary hover:text-white rounded-md w-full">
          <Link href={`/products/${product.slug}/edit`}>Edit</Link>
        </Button>
        {onDelete && (
          <Button variant="outline" className="text-accent cursor-pointer hover:bg-accent hover:text-white rounded-md w-full" onClick={() => onDelete(product.id)}>Delete</Button>
        )}
      </CardFooter>
    </Card>
  );
}