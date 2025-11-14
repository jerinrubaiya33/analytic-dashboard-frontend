// // src/lib/selectors/__tests__/productAnalyticsSelectors.test.ts
// import test from 'node:test';
// import { expect } from 'expect';

// import {
//   selectTotalProducts,
//   selectProductsByCategory,
//   selectPriceStats,
// } from '../productAnalyticsSelectors';

// const state = {
//   products: {
//     items: [
//       { id: '1', category: 'Clothess', price: 10 },
//       { id: '2', category: 'Clothes', price: 20 },
//       { id: '3', category: 'Shoes', price: 50 },
//     ],
//   },
// } as any;


// test('selectTotalProducts', () => {
//   expect(selectTotalProducts(state)).toBe(3);
// });

// test('selectProductsByCategory', () => {
//   expect(selectProductsByCategory(state)).toEqual({ Clothes: 2, Shoes: 1 });
// });

// test('selectPriceStats', () => {
//   const stats = selectPriceStats(state);
//   expect(stats.count).toBe(3);
//   expect(Math.round(stats.average)).toBe(27); // 80/3 ~ 26.66
// });
