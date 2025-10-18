import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store';

export type Category = {
  id: string;
  name: string;
  image?: string | null;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  images: string[];
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  category?: Category;
};

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  tagTypes: ['Products', 'Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], { offset?: number; limit?: number; categoryId?: string } | void>({
      query: (params) => {
        const query = new URLSearchParams();
        if (params?.offset !== undefined) query.set('offset', String(params.offset));
        if (params?.limit !== undefined) query.set('limit', String(params.limit));
        if (params?.categoryId) query.set('categoryId', params.categoryId);
        const qs = query.toString();
        return qs ? `/products?${qs}` : '/products';
      },
      providesTags: (result) =>
        result
          ? [
              { type: 'Products', id: 'LIST' },
              ...result.map((p) => ({ type: 'Product' as const, id: p.id }))
            ]
          : [{ type: 'Products', id: 'LIST' }]
    }),
    searchProducts: builder.query<Product[], { searchedText: string }>({
      query: ({ searchedText }) => `/products/search?searchedText=${encodeURIComponent(searchedText)}`,
      providesTags: (result) =>
        result
          ? [
              { type: 'Products', id: 'SEARCH' },
              ...result.map((p) => ({ type: 'Product' as const, id: p.id }))
            ]
          : [{ type: 'Products', id: 'SEARCH' }]
    }),
    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `/products/${slug}`,
      providesTags: (result) => (result ? [{ type: 'Product', id: result.id }] : [])
    }),
    createProduct: builder.mutation<Product, { categoryId: string; description?: string; images: string[]; name: string; price: number }>({
      query: (body) => ({ url: '/products', method: 'POST', body }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    }),
    updateProduct: builder.mutation<Product, { id: string; body: Partial<Pick<Product, 'name' | 'description' | 'price' | 'images'>> & { categoryId?: string } }>({
      query: ({ id, body }) => ({ url: `/products/${id}`, method: 'PUT', body }),
      invalidatesTags: (result) => (result ? [{ type: 'Product', id: result.id }, { type: 'Products', id: 'LIST' }] : [{ type: 'Products', id: 'LIST' }])
    }),
    deleteProduct: builder.mutation<{ id: string }, string>({
      query: (id) => ({ url: `/products/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    })
  })
});

export const {
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;