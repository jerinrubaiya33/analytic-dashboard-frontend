"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectAvailabilityCounts,
  selectPriceStats,
  selectProductsAddedLastNDays,
  selectProductsByCategory,
  selectTopCategories,
  selectTotalProducts,
} from '../lib/selectors/productAnalyticsSelectors';

export default function AnalyticsSummary() {
  const total = useSelector(selectTotalProducts);
  const byCategory = useSelector(selectProductsByCategory);
  const availability = useSelector(selectAvailabilityCounts);
  const priceStats = useSelector(selectPriceStats);
  const topCats = useSelector(selectTopCategories(3));
  const addedLast7 = useSelector(selectProductsAddedLastNDays(7));

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Products */}
      <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
        <h4 className="text-gray-600 font-semibold mb-2">Total Products</h4>
        <p className="text-3xl font-bold text-blue-600">{total}</p>
      </div>

      {/* Availability */}
      <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
        <h4 className="text-gray-600 font-semibold mb-2">Available / Out of Stock</h4>
        <p className="text-2xl font-medium">
          <span className="text-green-600">{availability.available}</span> /{' '}
          <span className="text-red-600">{availability.outOfStock}</span>
        </p>
      </div>

      {/* Avg Price */}
      <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
        <h4 className="text-gray-600 font-semibold mb-2">Average Price</h4>
        <p className="text-2xl font-bold text-blue-600">${priceStats.average.toFixed(2)}</p>
      </div>

      {/* Top Categories
      <div className="bg-white shadow rounded-lg p-6 col-span-1 md:col-span-3">
        <h4 className="text-gray-600 font-semibold mb-4">Top Categories</h4>
        <div className="flex flex-wrap gap-4">
          {topCats.map((t) => (
            <div
              key={t.category}
              className="bg-blue-50 text-blue-800 font-medium px-3 py-1 rounded-full"
            >
              {t.category} — {t.count}
            </div>
          ))}
        </div>
      </div> */}

      {/* Products Added Last 7 Days */}
      <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
        <h4 className="text-gray-600 font-semibold mb-2">Added Last 7 Days</h4>
        <p className="text-2xl font-bold text-blue-600">{addedLast7}</p>
      </div>

      {/* Products by Category (Sample) */}
      {/* <div className="bg-white shadow rounded-lg p-6 col-span-1 md:col-span-2">
        <h4 className="text-gray-600 font-semibold mb-2">Products by Category (Sample)</h4>
        <ul className="list-disc list-inside space-y-1">
          {Object.entries(byCategory).map(([cat, count]) => (
            <li key={cat}>
              <span className="font-medium">{cat}:</span> {count}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}