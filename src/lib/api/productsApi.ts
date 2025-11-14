// // src/lib/api/productsApi.ts - UPDATED VERSION
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

// const API_BASE = "https://analytic-dashboard-backend.vercel.app";

// // Same token helper functions
// const getToken = (): string | null => {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('auth_token');
//   }
//   return null;
// };

// export const productsApi = createApi({
//   reducerPath: "productsApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: API_BASE,
//     credentials: "include",
//     prepareHeaders: (headers) => {
//       // CRITICAL: Add Authorization header for products API too!
//       const token = getToken();
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//         console.log("🔐 Products API - Adding Authorization header");
//       }
//       headers.set('Content-Type', 'application/json');
//       return headers;
//     },
//   }),
//   tagTypes: ["Products"],
//   endpoints: (builder) => ({
//     // Get all products
//     getProducts: builder.query<Product[], void>({
//       query: () => "/api/products",
//       providesTags: ["Products"],
//     }),

//     // Add a new product
//     addProduct: builder.mutation<{ id: string }, AddProductRequest>({
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

// export const { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation } = productsApi;






// src/lib/api/productsApi.ts - COMPLETE FIX
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

// Token helper - MUST BE THE SAME AS IN authApi.ts
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
    prepareHeaders: (headers, { getState }) => {
      // Get token from localStorage
      const token = getToken();
      console.log("🔄 Products API - Token found:", !!token);
      
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        console.log("✅ Authorization header set");
      } else {
        console.log("❌ No token found for products API");
      }
      
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/api/products",
      providesTags: ["Products"],
    }),

    addProduct: builder.mutation<{ id: string }, AddProductRequest>({
      query: (product) => ({
        url: "/api/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

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
