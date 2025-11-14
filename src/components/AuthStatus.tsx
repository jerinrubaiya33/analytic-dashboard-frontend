// "use client";

// import { useLogoutMutation, useMeQuery } from "../lib/api/authApi";

// export default function AuthStatus() {
//   const { data, isLoading, error } = useMeQuery();
//   const [logout] = useLogoutMutation();

//   if (isLoading) return <div>Checking login...</div>;
//   if (error) return <div>Not logged in</div>;

//   return (
//     <div>
//       <p>Logged in as: {data?.email}</p>
//       <button onClick={() => logout()}>Logout</button>
//     </div>
//   );
// }




// "use client";

// import { useLogoutMutation, useMeQuery } from "../lib/api/authApi";

// export default function AuthStatus() {
//   const { data, isLoading, isError, refetch } = useMeQuery();
//   const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

//   const handleLogout = async () => {
//     try {
//       await logout().unwrap();
//       refetch(); // refetch me to update UI
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   if (isLoading) return <div>Checking login...</div>;
//   if (isError || !data) return <div>Not logged in</div>;

//   return (
//     <div className="p-4 border rounded shadow">
//       <p className="mb-2">
//         Logged in as: <strong>{data?.email ?? "Unknown"}</strong>
//       </p>
//       <button
//         onClick={handleLogout}
//         disabled={logoutLoading}
//         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//       >
//         {logoutLoading ? "Logging out..." : "Logout"}
//       </button>
//     </div>
//   );
// }
