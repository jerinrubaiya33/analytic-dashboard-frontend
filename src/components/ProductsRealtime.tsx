// src/components/ProductsRealtime.tsx
"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/lib/redux/store";
// import { RootState } from "@reduxjs/toolkit/query";
import { subscribeToProducts } from "../lib/redux/listeners/productsListener";
import { RootState } from "../lib/store";

export default function ProductsRealtime() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const unsubscribe = subscribeToProducts(dispatch);
    return () => unsubscribe(); // cleanup
  }, [dispatch]);

  if (loading) return <div>Loading products…</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {items.map((p) => (
        <li key={p.id}>
          {p.name} — ${p.price}
        </li>
      ))}
    </ul>
  );
}
