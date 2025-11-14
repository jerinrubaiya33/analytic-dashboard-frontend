// "use client";

// import React, { useState } from "react";
// import { useLoginMutation, useLogoutMutation } from "../lib/api/authApi";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [login, { isLoading, error, data }] = useLoginMutation();
//   const [logout] = useLogoutMutation();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       // login will send credentials and receive cookie from the server
//       const result = await login({ email, password }).unwrap();
//       console.log("login response:", result);
//       // do NOT store token from response if using httpOnly cookies — rely on cookie for subsequent requests
//     } catch (err) {
//       console.error("login failed:", err);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout().unwrap();
//       console.log("logged out");
//     } catch (err) {
//       console.error("logout failed", err);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="email"
//         />
//         <input
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="password"
//           type="password"
//         />
//         <button type="submit" disabled={isLoading}>
//           Login
//         </button>
//       </form>

//       {error && <div style={{ color: "red" }}>Login failed</div>}
//       {data && <div>Welcome {data.user?.email ?? "user"}</div>}

//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }
