// // src/app/hooks/useAuth.ts
// "use client";

// import { useEffect, useState } from "react";
// import { useMeQuery } from "../lib/api/authApi";
// import { useRouter } from "next/navigation";

// export function useAuth(required: boolean = true) {
//   const router = useRouter();
//   const { data, isLoading, isError, error } = useMeQuery();
//   const [isChecking, setIsChecking] = useState(true);

//   useEffect(() => {
//     console.log("Auth Debug:", { 
//       isLoading, 
//       isError, 
//       data, 
//       error: (error as any)?.data,
//       required 
//     });

//     if (!isLoading) {
//       setIsChecking(false);
      
//       if (required && isError) {
//         console.log("Not authenticated, redirecting to login");
//         router.replace("/login");
//       }
//     }
//   }, [isLoading, isError, required, router, data, error]);

//   return {
//     user: data,
//     isLoading: isLoading || isChecking,
//     isAuthenticated: !!data && !isError,
//     error,
//   };
// }





// src/app/hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import { useMeQuery } from "../lib/api/authApi";
import { useRouter } from "next/navigation";

export function useAuth(required: boolean = true) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useMeQuery();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log(" Auth Debug:", { 
      isLoading, 
      isError, 
      data, 
      error: (error as any)?.data,
      required 
    });

    if (!isLoading) {
      setIsChecking(false);
      
      if (required && isError) {
        console.log(" Not authenticated, redirecting to login");
        router.replace("/login");
      }
    }
  }, [isLoading, isError, required, router, data, error]);

  return {
    user: data,
    isLoading: isLoading || isChecking,
    isAuthenticated: !!data && !isError,
    error,
    refetch,
  };
}
