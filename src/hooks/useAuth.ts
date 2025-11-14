// "use client";

// import { useEffect } from "react";
// import { useMeQuery } from "../lib/api/authApi";
// import { useRouter } from "next/navigation";

// export function useAuth() {
//   const { data, isLoading, isError } = useMeQuery();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading &&  (isError || !data)) {
//       // Redirect to login if not authenticated
//       router.replace("/login");
//     }
//   }, [isLoading, isError, data, router]);

//   return { user: data, isLoading, isAuthenticated: !!data };
// }


// import { useEffect } from "react";
// import { useMeQuery } from "../lib/api/authApi";
// import { useRouter } from "next/navigation";

// export function useAuth(redirectIfUnauthenticated = true) {
//   // Fetch logged-in user
//   const { data, isLoading, isError, refetch } = useMeQuery();
//   const router = useRouter();

//   useEffect(() => {
//     // Only redirect if not loading and we explicitly know user is unauthenticated
//     if (!isLoading && (isError || !data) && redirectIfUnauthenticated) {
//       router.replace("/login");
//     }
//   }, [isLoading, isError, data, router, redirectIfUnauthenticated]);

//   return { user: data, isLoading, isAuthenticated: !!data, refetch };
// }



// src/app/hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import { useMeQuery } from "../lib/api/authApi";
import { useRouter } from "next/navigation";

export function useAuth(required: boolean = true) {
  const router = useRouter();
  const { data, isLoading, isError, error } = useMeQuery();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log("Auth Debug:", { 
      isLoading, 
      isError, 
      data, 
      error: (error as any)?.data,
      required 
    });

    if (!isLoading) {
      setIsChecking(false);
      
      if (required && isError) {
        console.log("Not authenticated, redirecting to login");
        router.replace("/login");
      }
    }
  }, [isLoading, isError, required, router, data, error]);

  return {
    user: data,
    isLoading: isLoading || isChecking,
    isAuthenticated: !!data && !isError,
    error,
  };
}