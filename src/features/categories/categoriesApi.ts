import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store';

export type Category = {
  id: string;
  name: string;
  image?: string | null;
  description?: string | null;
  createdAt?: string;
};

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], { offset?: number; limit?: number } | void>({
      query: (params) => {
        const query = new URLSearchParams();
        if (params?.offset !== undefined) query.set('offset', String(params.offset));
        if (params?.limit !== undefined) query.set('limit', String(params.limit));
        const qs = query.toString();
        return qs ? `/categories?${qs}` : '/categories';
      },
      providesTags: (result) => (result ? [{ type: 'Categories', id: 'LIST' }] : [{ type: 'Categories', id: 'LIST' }])
    }),
    searchCategories: builder.query<Category[], { searchedText: string }>({
      query: ({ searchedText }) => `/categories/search?searchedText=${encodeURIComponent(searchedText)}`,
      providesTags: [{ type: 'Categories', id: 'SEARCH' }]
    })
  })
});

export const { useGetCategoriesQuery, useSearchCategoriesQuery } = categoriesApi;