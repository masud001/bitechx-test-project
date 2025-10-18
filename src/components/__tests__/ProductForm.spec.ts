import { describe, it, expect } from 'vitest';
import { productFormSchema, type ProductFormValues } from '@/components/ProductForm';

describe('ProductForm schema', () => {
  it('rejects short name', () => {
    const data = {
      name: 'A',
      price: 10,
      description: 'desc',
      images: ['https://example.com/a.jpg'],
      categoryId: '1'
    } as ProductFormValues;
    const res = productFormSchema.safeParse(data);
    expect(res.success).toBe(false);
  });

  it('rejects non-positive price', () => {
    const data = {
      name: 'Valid Name',
      price: -5,
      description: 'desc',
      images: ['https://example.com/a.jpg'],
      categoryId: '1'
    } as ProductFormValues;
    const res = productFormSchema.safeParse(data);
    expect(res.success).toBe(false);
  });

  it('rejects invalid image URL', () => {
    const data = {
      name: 'Valid Name',
      price: 5,
      description: 'desc',
      images: ['not-a-url'],
      categoryId: '1'
    } as ProductFormValues;
    const res = productFormSchema.safeParse(data);
    expect(res.success).toBe(false);
  });

  it('accepts valid values', () => {
    const data = {
      name: 'Valid Name',
      price: 9.99,
      description: 'Optional description',
      images: ['https://example.com/a.jpg'],
      categoryId: '1'
    } as ProductFormValues;
    const res = productFormSchema.safeParse(data);
    expect(res.success).toBe(true);
  });
});