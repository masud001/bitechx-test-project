"use client";
import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import type { FieldArrayPath } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCategoriesQuery } from '@/features/categories/categoriesApi';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

export const productFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  price: z
    .number()
    .refine((v) => !Number.isNaN(v), { message: 'Price must be a number' })
    .positive('Price must be > 0'),
  description: z.string().max(2000, 'Description too long').optional(),
  images: z.array(z.string().url('Enter a valid URL')).min(1, 'At least one image URL'),
  categoryId: z.string().min(1, 'Category is required')
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export default function ProductForm({
  initialValues,
  onSubmit,
  submitting
}: {
  initialValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  submitting?: boolean;
}) {
  const { data: categories = [] } = useGetCategoriesQuery();

  const { register, control, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: initialValues?.name || '',
      price: initialValues?.price ?? 0,
      description: initialValues?.description || '',
      images: initialValues?.images || [''],
      categoryId: initialValues?.categoryId || ''
    }
  });

  // Let TypeScript treat 'images' as a valid FieldArrayPath for FormValues
  const { fields, append, remove } = useFieldArray<ProductFormValues, FieldArrayPath<ProductFormValues>>({ control, name: 'images' as FieldArrayPath<ProductFormValues> });

  useEffect(() => {
    if (categories.length && !watch('categoryId')) {
      setValue('categoryId', categories[0].id);
    }
  }, [categories, setValue, watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-text">Name : </label>
        <Input id="name" aria-invalid={!!errors.name} {...register('name')} className="mt-1" />
        {errors.name && <p className="mt-1 text-sm text-accent">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="price" className="text-sm font-medium text-text">Price : </label>
        <Input id="price" aria-invalid={!!errors.price} type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="mt-1" />
        {errors.price && <p className="mt-1 text-sm text-accent">{errors.price.message}</p>}
      </div>
      <div>
        <label htmlFor="description" className="text-sm font-medium text-text">Description : </label>
        <Textarea id="description" aria-invalid={!!errors.description} {...register('description')} className="mt-1" rows={4} />
        {errors.description && <p className="mt-1 text-sm text-accent">{errors.description.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-text">Images : </label>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input {...register(`images.${index}` as const)} className="flex-1" placeholder="https://..." />
              <Button type="button" variant="outline" className='rounded border-[.5px] hover:border-primary hover:bg-primary hover:text-primary-foreground cursor-pointer' onClick={() => remove(index)}>Remove</Button>
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" className="mt-2 rounded border-[.5px] hover:border-primary hover:bg-primary hover:text-primary-foreground cursor-pointer" onClick={() => append('')}>Add Image</Button>
        {errors.images && <p className="mt-1 text-sm text-accent">{(errors.images as unknown as { message?: string }).message as string}</p>}
      </div>
      <div className='w-full flex flex-col'>
        <label htmlFor="categoryId" className="text-sm font-medium text-text">Category : </label>
        <Select value={watch('categoryId')} onValueChange={(val) => setValue('categoryId', val, { shouldValidate: true })}>
          <SelectTrigger id="categoryId" aria-invalid={!!errors.categoryId} className="mt-1">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoryId && <p className="mt-1 text-sm text-accent">{errors.categoryId.message}</p>}
      </div>
      <Button type="submit" disabled={!!submitting} className='w-full rounded cursor-pointer'>
        {submitting ? 'Saving…' : 'Save'}
      </Button>
    </form>
  );
}