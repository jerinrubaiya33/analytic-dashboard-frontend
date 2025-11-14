// "use client";

// import Counter from "@/src/components/Counter";
// import { useEffect, useState } from "react";

// export default function Page() {
//   const [data, setData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Step 1: Login first to get the JWT cookie
//    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, {
//   method: "POST",
//   credentials: "include",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     email: "admin@example.com",
//     password: "password123",
//   }),
// })

//       .then((res) => {
//         if (!res.ok) throw new Error("Login failed");
//         return res.json();
//       })
//       .then(() => {
//         // Step 2: Fetch protected data
//         // return fetch("http://localhost:4000/api/protected", {
//          return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/protected`, {
//           method: "GET",
//           credentials: "include", // send cookie with request
//         });
//       })
//       .then((res) => {
//         if (!res.ok) throw new Error("Unauthorized or server error");
//         return res.json();
//       })
//       .then((data) => setData(data))
//       .catch((err) => setError(err.message));
//   }, []);

//   if (error) return <div>Error: {error}</div>;
//   if (!data) return <div>Loading...</div>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Protected Data</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>

//       {/*Added the Redux Counter here */}
//       <hr style={{ margin: "20px 0" }} />
//       <h2>Redux Counter Test</h2>
//       <Counter />
//     </div>
//   );
// }


"use client";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}

