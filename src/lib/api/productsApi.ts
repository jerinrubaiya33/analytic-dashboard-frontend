// // src/lib/api/productsApi.ts
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
// }

// export interface AddProductRequest {
//   name: string;
//   price: number;
// }

// export const productsApi = createApi({
//   reducerPath: "productsApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000",
//     credentials: "include",
//   }),
//   tagTypes: ["Products"],
//   endpoints: (builder) => ({
//     // Get all products
//     getProducts: builder.query<Product[], void>({
//       query: () => "/api/products",
//       providesTags: ["Products"],
//     }),
    
//     // Add a new product
//     addProduct: builder.mutation<{ id: string; name: string; price: number }, AddProductRequest>({
//       query: (product) => ({
//         url: "/api/products",
//         method: "POST",
//         body: product,
//       }),
//       invalidatesTags: ["Products"],
//     }),
    
//     // Delete a product
//     deleteProduct: builder.mutation<void, string>({
//       query: (id) => ({
//         url: `/api/products/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Products"],
//     }),
//   }),
// });

// export const { 
//   useGetProductsQuery, 
//   useAddProductMutation, 
//   useDeleteProductMutation 
// } = productsApi;




// src/lib/api/productsApi.ts - UPDATED VERSION
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

const API_BASE = "https://analytic-dashboard-backend.vercel.app";

// Same token helper functions
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    credentials: "include",
    prepareHeaders: (headers) => {
      // CRITICAL: Add Authorization header for products API too!
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        console.log("🔐 Products API - Adding Authorization header");
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // Get all products
    getProducts: builder.query<Product[], void>({
      query: () => "/api/products",
      providesTags: ["Products"],
    }),

    // Add a new product
    addProduct: builder.mutation<{ id: string }, AddProductRequest>({
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

export const { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation } = productsApi;
