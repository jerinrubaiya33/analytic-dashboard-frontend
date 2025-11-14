// src/lib/selectors/productAnalyticsSelectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Basic input selector: return products as array
const selectProductsRaw = (state: RootState) => state.products.items;

/*
  If items is a map/object like { id: product }, convert to array:
  const toArray = (items: Record<string, Product> | Product[]) =>
    Array.isArray(items) ? items : Object.values(items);
*/
const toArray = (items: any) => (Array.isArray(items) ? items : Object.values(items));

export const selectProducts = createSelector(
  [selectProductsRaw],
  (items) => toArray(items)
);

/* Basic metrics */

// 1) Total products
export const selectTotalProducts = createSelector(
  [selectProducts],
  (products) => products.length
);

// 2) Products by category { categoryName: count }
export const selectProductsByCategory = createSelector(
  [selectProducts],
  (products) =>
    products.reduce((acc: Record<string, number>, p: any) => {
      const cat = p.category ?? 'Uncategorized';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {})
);
export const selectProductsByCategoryChartData = createSelector(
  [selectProductsByCategory],
  (byCategory) => Object.entries(byCategory).map(([category, count]) => ({ category, count }))
);

// 3) Products by subCategory nested { category: { subCategory: count } }
export const selectProductsBySubCategory = createSelector(
  [selectProducts],
  (products) =>
    products.reduce((acc: Record<string, Record<string, number>>, p: any) => {
      const cat = p.category ?? 'Uncategorized';
      const sub = p.subCategory ?? 'Other';
      acc[cat] = acc[cat] || {};
      acc[cat][sub] = (acc[cat][sub] || 0) + 1;
      return acc;
    }, {})
);

// 4) Count available / out-of-stock
export const selectAvailabilityCounts = createSelector(
  [selectProducts],
  (products) => {
    let available = 0;
    let outOfStock = 0;
    for (const p of products) {
      // define availability by your logic: boolean or stock number
      if (typeof p.available === 'boolean') {
        if (p.available) available++;
        else outOfStock++;
      } else if (typeof p.stock === 'number') {
        if (p.stock > 0) available++;
        else outOfStock++;
      } else {
        // fallback: treat as available
        available++;
      }
    }
    return { available, outOfStock, total: products.length };
  }
);

// 5) Average / min / max price
export const selectPriceStats = createSelector([selectProducts], (products) => {
  let count = 0;
  let sum = 0;
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (const p of products) {
    const price = typeof p.price === 'number' ? p.price : parseFloat(p.price ?? NaN);
    if (!Number.isFinite(price)) continue;
    count++;
    sum += price;
    if (price < min) min = price;
    if (price > max) max = price;
  }
  return {
    count,
    average: count === 0 ? 0 : sum / count,
    min: count === 0 ? 0 : min,
    max: count === 0 ? 0 : max,
  };
});

/* Time-based / trend metrics */

// Helper: parse createdAt to timestamp (ms)
const toTs = (v: any) => {
  if (!v) return NaN;
  if (typeof v === 'number') return v;
  const num = Number(v);
  if (!Number.isNaN(num)) return num;
  const d = Date.parse(String(v));
  return Number.isNaN(d) ? NaN : d;
};

// 6) Products added in last N days
export const selectProductsAddedLastNDays = (nDays = 7) =>
  createSelector([selectProducts], (products) => {
    const cutoff = Date.now() - nDays * 24 * 60 * 60 * 1000;
    return products.filter((p: any) => {
      const ts = toTs(p.createdAt);
      return Number.isFinite(ts) && ts >= cutoff;
    }).length;
  });

// 7) Daily counts for last N days (useful for charts)
export const selectDailyAddCounts = (nDays = 7) =>
  createSelector([selectProducts], (products) => {
    const dayMs = 24 * 60 * 60 * 1000;
    const now = Date.now();
    const buckets: Record<string, number> = {};
    for (let i = nDays - 1; i >= 0; i--) {
      const d = new Date(now - i * dayMs);
      const key = d.toISOString().slice(0, 10); // 'YYYY-MM-DD'
      buckets[key] = 0;
    }
    for (const p of products) {
      const ts = toTs(p.createdAt);
      if (!Number.isFinite(ts)) continue;
      const dateKey = new Date(ts).toISOString().slice(0, 10);
      if (dateKey in buckets) buckets[dateKey]++;
    }
    // convert to array for charts (ordered)
    return Object.keys(buckets).map((k) => ({ date: k, count: buckets[k] }));
  });

/*Ranking / Top lists */

// 8) Top N categories by product count
export const selectTopCategories = (n = 5) =>
  createSelector([selectProductsByCategory], (byCat) => {
    return Object.entries(byCat)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, n);
  });
