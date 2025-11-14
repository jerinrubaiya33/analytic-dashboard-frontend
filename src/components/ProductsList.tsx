// src/components/ProductsList.tsx
"use client";
import React from "react";
import useProductsRealtime from "../hooks/useProductsRealtime";

export default function ProductsList() {
  const { products, loading, error } = useProductsRealtime({
    orderByField: "createdAt",
    limitCount: 200
  });

  if (loading) return <div>Loading products…</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!products.length) return <div>No products</div>;

  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>
          <strong>{p.name}</strong> — ${p.price}
        </li>
      ))}
    </ul>
  );
}
