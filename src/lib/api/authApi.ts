// // src/lib/api/authApi.ts
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export interface LoginRequest {
//   email: string;
//   password: string;
// }

// export interface LoginResponse {
//   message: string;
//   user?: { email: string };
// }

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: API_BASE,
//     credentials: "include", // required for HTTP-only cookies
//   }),
//   tagTypes: ["Me"], // <--- ADD THIS
//   endpoints: (builder) => ({
//     login: builder.mutation<LoginResponse, LoginRequest>({
//       query: (credentials) => ({
//         url: "/api/login",
//         method: "POST",
//         body: credentials,
//       }),
//       async onQueryStarted(args, { dispatch, queryFulfilled }) {
//         try {
//           await queryFulfilled;
//           dispatch(authApi.util.invalidateTags(["Me"])); // Now TS knows "Me" is valid
//         } catch {}
//       },
//     }),
//     me: builder.query<{ email: string }, void>({
//       query: () => "/api/me",
//       providesTags: ["Me"], // TypeScript is happy now
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
//         } catch {}
//       },
//     }),
//   }),
// });

// export const { useLoginMutation, useMeQuery, useLogoutMutation } = authApi;
// export default authApi;









// _______________SLEEEEEEEEPPPPPP___________
// src/lib/api/authApi.ts
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

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    credentials: "include", // allows cookies (important for auth)
  }),
  tagTypes: ["Me"], // used to refetch after login/logout
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/api/login",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authApi.util.invalidateTags(["Me"])); // triggers refetch
        } catch (err) {
          console.error("Login error:", err);
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
          dispatch(authApi.util.invalidateTags(["Me"]));
        } catch (err) {
          console.error("Logout error:", err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useMeQuery, useLogoutMutation } = authApi;
export default authApi;