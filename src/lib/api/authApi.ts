// // src/lib/api/authApi.ts
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export interface LoginRequest {
//   email: string;
//   password: string;
// }

// export interface LoginResponse {
//   message: string;
//   user?: { email: string };
//   token?: string;
// }

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://analytic-dashboard-backend.vercel.app";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: API_BASE,
//     credentials: "include", // allows cookies (important for auth)
//   }),
//   tagTypes: ["Me"], // used to refetch after login/logout
//   endpoints: (builder) => ({
//     login: builder.mutation<LoginResponse, LoginRequest>({
//       query: (credentials) => ({
//         url: "/api/login",
//         method: "POST",
//         body: credentials,
//         headers: { "Content-Type": "application/json" },
//       }),
//       async onQueryStarted(_, { dispatch, queryFulfilled }) {
//         try {
//           await queryFulfilled;
//           dispatch(authApi.util.invalidateTags(["Me"])); // triggers refetch
//         } catch (err) {
//           console.error("Login error:", err);
//         }
//       },
//     }),

//     me: builder.query<{ email: string }, void>({
//       query: () => "/api/me",
//       providesTags: ["Me"],
//     }),

//     logout: builder.mutation<{ message: string }, void>({
//       query: () => ({
//         url: "/api/logout",
//         method: "POST",
//       }),
//       async onQueryStarted(_, { dispatch, queryFulfilled }) {
//         try {
//           await queryFulfilled;
//           dispatch(authApi.util.invalidateTags(["Me"]));
//         } catch (err) {
//           console.error("Logout error:", err);
//         }
//       },
//     }),
//   }),
// });

// export const { useLoginMutation, useMeQuery, useLogoutMutation } = authApi;
// export default authApi;







// src/lib/api/authApi.ts - FIXED VERSION
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user?: { email: string };
  token?: string;
}

// FIXED: Use production URL, not localhost
const API_BASE = "https://analytic-dashboard-backend.vercel.app";

// Helper to manage token in localStorage
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        console.log("🔐 Adding Authorization header with token");
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ["Me"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/api/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          
          if (data.token) {
            setToken(data.token);
            console.log("✅ Token stored in localStorage:", data.token.substring(0, 20) + "...");
          }
          
          dispatch(authApi.util.invalidateTags(["Me"]));
        } catch (err) {
          console.error("Login error:", err);
          removeToken();
        }
      },
    }),

    me: builder.query<{ email: string }, void>({
      query: () => "/api/me",
      providesTags: ["Me"],
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/api/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          removeToken();
          dispatch(authApi.util.invalidateTags(["Me"]));
        } catch (err) {
          console.error("Logout error:", err);
          removeToken();
        }
      },
    }),
  }),
});

export const { useLoginMutation, useMeQuery, useLogoutMutation } = authApi;
export default authApi;
