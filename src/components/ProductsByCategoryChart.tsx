// // src/components/ProductsByCategoryChart.tsx
// "use client";
// import React from "react";
// import { useSelector } from "react-redux";
// import { selectProductsByCategoryChartData } from "@/src/lib/selectors/productAnalyticsSelectors";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function ProductsByCategoryChart() {
//   const data = useSelector(selectProductsByCategoryChartData);

//   if (!data || data.length === 0) return <p>No product data yet</p>;

//   return (
//     <div className="bg-white shadow rounded-lg p-4">
//       <h4 className="text-gray-700 font-semibold mb-2">Products by Category</h4>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="category" />
//           <YAxis allowDecimals={false} />
//           <Tooltip />
//           <Bar dataKey="count" fill="#3b82f6" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }





"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectProductsByCategoryChartData } from "@/src/lib/selectors/productAnalyticsSelectors";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function ProductsByCategoryChart() {
  const data = useSelector(selectProductsByCategoryChartData);

  if (!data || data.length === 0) return <p>No product data yet</p>;

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#f472b6"];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h4 className="text-gray-700 font-semibold mb-2">Products by Category</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
