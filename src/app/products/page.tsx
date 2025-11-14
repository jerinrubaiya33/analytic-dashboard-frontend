// // products/page.tsx (Delete version)
// "use client";

// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import { 
//   useGetProductsQuery, 
//   useAddProductMutation, 
//   useDeleteProductMutation 
// } from "../../lib/api/productsApi";

// interface Product {
//   id: string;
//   name: string;
//   price: number;
// }

// export default function ProductsPage() {
//   const { user, isLoading: authLoading } = useAuth();
//   const [newProductName, setNewProductName] = useState("");
//   const [newProductPrice, setNewProductPrice] = useState<number | "">("");

//   // Use RTK Query hooks for real API calls
//   const { 
//     data: products = [], 
//     isLoading: productsLoading, 
//     error: productsError,
//     refetch 
//   } = useGetProductsQuery();

//   const [addProduct, { isLoading: addingProduct, error: addError }] = useAddProductMutation();
//   const [deleteProduct, { isLoading: deletingProduct, error: deleteError }] = useDeleteProductMutation();

//   // Refresh products when component mounts
//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   const handleAddProduct = async () => {
//     if (!newProductName || newProductPrice === "") return;
    
//     try {
//       await addProduct({
//         name: newProductName,
//         price: Number(newProductPrice)
//       }).unwrap();
      
//       setNewProductName("");
//       setNewProductPrice("");
//       // No need to call refetch() - invalidatesTags will auto-refresh
//     } catch (err) {
//       console.error("Failed to add product:", err);
//     }
//   };

//   const handleDeleteProduct = async (id: string) => {
//     try {
//       await deleteProduct(id).unwrap();
//       // No need to call refetch() - invalidatesTags will auto-refresh
//     } catch (err) {
//       console.error("Failed to delete product:", err);
//     }
//   };

//   if (authLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-lg">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Products Management</h1>
//       <p className="mb-6">Welcome, {user?.email}</p>

//       {/* Error messages */}
//       {productsError && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           Error loading products
//         </div>
//       )}
//       {addError && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           Error adding product
//         </div>
//       )}
//       {deleteError && (
//         <div className="bg-red-100 border border-red-400 text-red-400 px-4 py-3 rounded mb-4">
//           Error deleting product
//         </div>
//       )}

//       {/* Add product form */}
//       <div className="mb-6 flex gap-2">
//         <input
//           type="text"
//           placeholder="Product Name"
//           className="border p-2 flex-1 rounded"
//           value={newProductName}
//           onChange={(e) => setNewProductName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           className="border p-2 w-24 rounded"
//           value={newProductPrice}
//           onChange={(e) => setNewProductPrice(Number(e.target.value))}
//         />
//         <button
//           onClick={handleAddProduct}
//           disabled={addingProduct}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
//         >
//           {addingProduct ? "Adding..." : "Add"}
//         </button>
//       </div>

//       {/* Products table */}
//       {productsLoading ? (
//         <div className="text-center py-4">Loading products...</div>
//       ) : (
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr className="bg-gray-900">
//               {/* <th className="border p-2 text-left">ID</th> */}
//               <th className="border p-2 text-left">Name</th>
//               <th className="border p-2 text-left">Price</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product: Product) => (
//               <tr key={product.id}>
//                 {/* <td className="border p-2">{product.id}</td> */}
//                 <td className="border p-2">{product.name}</td>
//                 <td className="border p-2">${product.price}</td>
//                 <td className="border p-2 text-center">
//                   <button
//                     onClick={() => handleDeleteProduct(product.id)}
//                     disabled={deletingProduct}
//                     className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:bg-red-400"
//                   >
//                     {deletingProduct ? "Deleting..." : "Delete"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {products.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="text-center p-4">
//                   No products found. Add your first product!
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }




// _________THIS ONE WORKS (RTK Query)) ________
// // src/app/products/page.tsx
// "use client";
// import React, { useState } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import useProductsRealtime, { Product } from "@/src/hooks/useProductsRealtime";
// import { db } from "@/src/lib/firebaseClient";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import ProductsRealtime from "@/src/components/ProductsRealtime";

// export default function ProductsPage() {
//   const { user, isLoading: authLoading } = useAuth();
//   const [newProductName, setNewProductName] = useState("");
//   const [newProductPrice, setNewProductPrice] = useState<number | "">("");

//   // Listen to Firestore products in real time
//   const { products, loading, error } = useProductsRealtime({
//     orderByField: "createdAt",
//     limitCount: 200,
//   });

//   //  Add a new product
//   const handleAddProduct = async () => {
//     if (!newProductName || newProductPrice === "") return;
//     try {
//       await addDoc(collection(db, "products"), {
//         name: newProductName,
//         price: Number(newProductPrice),
//         createdAt: serverTimestamp(), // use Firestore server timestamp
//       });
//       setNewProductName("");
//       setNewProductPrice("");
//     } catch (err) {
//       console.error("Error adding product:", err);
//     }
//   };

//   // Route protection
//   if (authLoading) return <div>Checking authentication...</div>;
//   if (!user) return <div>You must be logged in to access this page.</div>;

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Products Management</h1>
//       <p className="mb-6">Welcome, {user.email}</p>

//       {/* Add product form */}
//       <div className="mb-6 flex gap-2">
//         <input
//           type="text"
//           placeholder="Product Name"
//           className="border p-2 flex-1 rounded"
//           value={newProductName}
//           onChange={(e) => setNewProductName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           className="border p-2 w-24 rounded"
//           value={newProductPrice}
//           onChange={(e) => setNewProductPrice(Number(e.target.value))}
//         />
//         <button
//           onClick={handleAddProduct}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add
//         </button>
//       </div>

//       {/*  Products list */}
//       {loading ? (
//         <div>Loading products…</div>
//       ) : error ? (
//         <div className="text-red-600">Error: {error.message}</div>
//       ) : products.length === 0 ? (
//         <div>No products yet.</div>
//       ) : (
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr className="bg-gray-900 text-white">
//               <th className="border p-2 text-left">Name</th>
//               <th className="border p-2 text-left">Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product: Product) => (
//               <tr key={product.id}>
//                 <td className="border p-2">{product.name}</td>
//                 <td className="border p-2">${product.price}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       <ProductsRealtime />
//     </div>
//   );
// }











// // src/app/products/page.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "@/src/lib/store";
// import { subscribeToProducts } from "@/src/lib/redux/listeners/productsListener";
// import { db } from "@/src/lib/firebaseClient";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { useAuth } from "@/src/hooks/useAuth";

// export default function ProductsPage() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { items: products, loading, error } = useSelector(
//     (state: RootState) => state.products
//   );

//   const { user, isLoading: authLoading } = useAuth();

//   const [newProductName, setNewProductName] = useState("");
//   const [newProductPrice, setNewProductPrice] = useState<number | "">("");

//   //  Subscribe to Firestore products in real-time via Redux listener
//   useEffect(() => {
//     const unsubscribe = subscribeToProducts(dispatch);
//     return () => unsubscribe(); // cleanup on unmount
//   }, [dispatch]);

//   // Add a new product
//   const handleAddProduct = async () => {
//     if (!newProductName || newProductPrice === "") {
//       alert("Please enter both product name and price.");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "products"), {
//         name: newProductName,
//         price: Number(newProductPrice),
//         createdAt: serverTimestamp(),
//       });

//       setNewProductName("");
//       setNewProductPrice("");
//     } catch (err) {
//       console.error("Error adding product:", err);
//       alert("Failed to add product. Check console for details.");
//     }
//   };

//   // Route protection
//   if (authLoading) return <div>Checking authentication...</div>;
//   if (!user) return <div>You must be logged in to access this page.</div>;

//   // Helper function to safely get timestamp in milliseconds
//   const getTime = (product: any) => {
//     if (!product.createdAt) return 0;
//     if ("toMillis" in product.createdAt) return product.createdAt.toMillis();
//     if ("seconds" in product.createdAt) return product.createdAt.seconds * 1000;
//     return 0;
//   };

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Products Management</h1>
//       <p className="mb-6">Welcome, {user.email}</p>

//       {/*  Add product form */}
//       <div className="mb-6 flex gap-2">
//         <input
//           type="text"
//           placeholder="Product Name"
//           className="border p-2 flex-1 rounded"
//           value={newProductName}
//           onChange={(e) => setNewProductName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           className="border p-2 w-24 rounded"
//           value={newProductPrice}
//           onChange={(e) =>
//             setNewProductPrice(
//               e.target.value === "" ? "" : Number(e.target.value)
//             )
//           }
//         />
//         <button
//           onClick={handleAddProduct}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add
//         </button>
//       </div>

//       {/* Products table */}
//       {loading ? (
//         <div>Loading products…</div>
//       ) : error ? (
//         <div className="text-red-600">Error: {error}</div>
//       ) : products.length === 0 ? (
//         <div>No products yet.</div>
//       ) : (
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr className="bg-gray-900 text-white">
//               <th className="border p-2 text-left">Name</th>
//               <th className="border p-2 text-left">Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products
//               .slice()
//               .sort((a, b) => getTime(b) - getTime(a)) // newest first
//               .map((product) => (
//                 <tr key={product.id}>
//                   <td className="border p-2">{product.name}</td>
//                   <td className="border p-2">${product.price}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }




// src/app/products/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/src/lib/store";
import { subscribeToProducts } from "@/src/lib/redux/listeners/productsListener";
import { productsColumns } from "@/src/lib/tableColumns/productsColumns";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/src/components/ui/table";
import { Card } from "@/src/components/ui/card";
import { Container } from "@/src/components/ui/container";
import { Skeleton } from "@/src/components/ui/skeleton";
import { EmptyState } from "@/src/components/ui/empty-state";
import { useAuth } from "@/src/hooks/useAuth";

// Modal
import ProductsModal from "@/src/components/ProductsModal";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading, error } = useSelector((state: RootState) => state.products);
  const { user, isLoading: authLoading } = useAuth();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // subscribe to products
  useEffect(() => {
    const unsubscribe = subscribeToProducts(dispatch);
    return () => unsubscribe();
  }, [dispatch]);

  // sorting state
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: products,
    columns: productsColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Delete product using Express API
  const handleDeleteProduct = async (productId: string) => {
    // if (!confirm("Are you sure you want to delete this product?")) {
    //   return;
    // }

    setDeleteLoading(productId);
    try {
     // const response = await fetch(`http://localhost:4000/api/products/${productId}`, {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${productId}`, {
        method: "DELETE",
        credentials: "include", // Important for sending cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete product");
      }

      console.log("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Check console for details.");
    } finally {
      setDeleteLoading(null);
    }
  };

  // auth
  if (authLoading) return <div>Checking authentication…</div>;
  if (!user) return <div>You must be logged in.</div>;

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-2xl font-semibold mb-4">Product Management</h1>

        {/* Create Product Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Product
        </button>

        {/* Products Modal */}
        <ProductsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <Card>
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-6 w-1/3" />
              <div className="grid grid-cols-4 gap-2">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
              </div>
            </div>
          ) : error ? (
            <div className="text-red-600">Error: {error}</div>
          ) : products.length === 0 ? (
            <EmptyState title="No products yet" description="Add products to see them here." />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableHead
                          key={header.id}
                          className="cursor-pointer select-none"
                          onClick={() => {
                            const colId = header.column.id;
                            if (table.getState().sorting?.[0]?.id === colId) {
                              const current = table.getState().sorting[0];
                              if (current?.desc) table.setSorting([{ id: colId, desc: false }]);
                              else table.setSorting([]);
                            } else {
                              table.setSorting([{ id: colId, desc: true }]);
                            }
                          }}
                        >
                          {header.isPlaceholder ? null : (
                            <div className="flex items-center gap-2">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {table.getState().sorting?.[0]?.id === header.column.id ? (
                                table.getState().sorting[0].desc ? <span>↓</span> : <span>↑</span>
                              ) : null}
                            </div>
                          )}
                        </TableHead>
                      ))}
                      {/* Extra header for delete button */}
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row) => {
                    const product = row.original; // Use row.original to get the product data
                    return (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                        {/* Delete button */}
                        <TableCell>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            disabled={deleteLoading === product.id}
                            className="px-2 py-1 text-red-600 border rounded hover:bg-red-50 disabled:opacity-50"
                          >
                            {deleteLoading === product.id ? "Deleting..." : "Delete"}
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </div>
    </Container>
  );
}
