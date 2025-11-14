// src/lib/tableColumns/productsColumns.ts
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/src/lib/redux/slices/productsSlice";

export const productsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: info => info.getValue() as string,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: info => `$${(info.getValue() as number)?.toFixed?.(2) ?? info.getValue()}`,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      const ts = getValue() as any;
      if (!ts) return "-";
      if ("toMillis" in ts) return new Date(ts.toMillis()).toLocaleString();
      if ("seconds" in ts) return new Date(ts.seconds * 1000).toLocaleString();
      return String(ts);
    },
  },
];
