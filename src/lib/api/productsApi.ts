// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const productsApi = createApi({
//   reducerPath: "productsApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000",
//     credentials: "include"
//   }),
//   endpoints: (builder) => ({
//     getProducts: builder.query<any[], void>({
//       query: () => "/products"
//     })
//   })
// });

// export const { useGetProductsQuery } = productsApi;
// export default productsApi;



// src/lib/api/productsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface AddProductRequest {
  name: string;
  price: number;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000",
    credentials: "include",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // Get all products
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Products"],
    }),
    
    // Add a new product
    addProduct: builder.mutation<{ id: string; name: string; price: number }, AddProductRequest>({
      query: (product) => ({
        url: "/api/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    
    // Delete a product
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useAddProductMutation, 
  useDeleteProductMutation 
} = productsApi;