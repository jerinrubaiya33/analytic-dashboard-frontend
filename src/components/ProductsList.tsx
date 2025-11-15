// // src/components/ProductsList.tsx
// "use client";
// import React from "react";
// import useProductsRealtime from "../hooks/useProductsRealtime";

// export default function ProductsList() {
//   const { products, loading, error } = useProductsRealtime({
//     orderByField: "createdAt",
//     limitCount: 200
//   });

//   if (loading) return <div>Loading products…</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   if (!products.length) return <div>No products</div>;

//   return (
//     <ul>
//       {products.map(p => (
//         <li key={p.id}>
//           <strong>{p.name}</strong> — ${p.price}
//         </li>
//       ))}
//     </ul>
//   );
// }
// src/components/ProductsList.tsx - CHECK THIS
"use client";

import React from "react";
import { useGetProductsQuery, useDeleteProductMutation } from "../lib/api/productsApi";

export default function ProductsList() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async (productId: string) => {
    try {
      console.log("🔄 Attempting to delete product:", productId);
      await deleteProduct(productId).unwrap();
      console.log("✅ Product deleted successfully");
    } catch (error) {
      console.error("❌ Failed to delete product:", error);
    }
  };

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>
          <span>{product.name} - ${product.price}</span>
          <button 
            onClick={() => handleDelete(product.id)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
}
