// src/app/dashboard/page.tsx
"use client"; 

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnalyticsSummary from "@/src/components/AnalyticsSummary";
import { subscribeToProducts } from "@/src/lib/redux/listeners/productsListener";
import ProductsByCategoryChart from "@/src/components/ProductsByCategoryChart"; 

export default function DashboardPage() {
  const dispatch = useDispatch();

  // Subscribe to Firestore products in real-time
  useEffect(() => {
    const unsubscribe = subscribeToProducts(dispatch);

    // Clean up on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <AnalyticsSummary />

      {/* Grid for analytics charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ProductsByCategoryChart />
        {/* can add more chart components here in the future */}
      </div>
    </div>
  );
}
