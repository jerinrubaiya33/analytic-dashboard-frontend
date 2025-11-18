// import { useEffect, useState, useRef } from "react";
// import {
//   collection,
//   query,
//   orderBy,
//   onSnapshot,
//   where,
//   limit,
//   Query,
//   DocumentData,
//   QuerySnapshot,
//   Unsubscribe,
//   WhereFilterOp,
// } from "firebase/firestore";
// import { db } from "../lib/firebaseClient";

// export type Product = {
//   id: string;
//   name: string;
//   price: number;
//   category?: string;
//   createdAt?: any;
// };

// type UseProductsResult = {
//   products: Product[];
//   loading: boolean;
//   error: Error | null;
//   lastSnapshot?: QuerySnapshot<DocumentData>;
// };

// export default function useProductsRealtime(
//   opts?: {
//     whereClause?: [string, WhereFilterOp, any];
//     orderByField?: string;
//     limitCount?: number;
//   }
// ): UseProductsResult {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//   const snapshotRef = useRef<QuerySnapshot<DocumentData> | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     let q: Query<DocumentData> = collection(db, "products");

//     if (opts?.whereClause) {
//       const [field, op, value] = opts.whereClause;
//       q = query(q, where(field, op, value));
//     }

//     if (opts?.orderByField) {
//       q = query(q, orderBy(opts.orderByField, "desc"));
//     }

//     if (opts?.limitCount && opts.limitCount > 0) {
//       q = query(q, limit(opts.limitCount));
//     }

//     //  Always replace state on each snapshot to ensure full sync
//     const unsubscribe: Unsubscribe = onSnapshot(
//       q,
//       (snap) => {
//         snapshotRef.current = snap;
//         const allProducts = snap.docs.map(
//           (doc) => ({ id: doc.id, ...(doc.data() as any) } as Product)
//         );
//         setProducts(allProducts);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("Products realtime listener error:", err);
//         setError(err);
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, [
//     opts?.whereClause ? JSON.stringify(opts.whereClause) : null,
//     opts?.orderByField,
//     opts?.limitCount,
//   ]);

//   return {
//     products,
//     loading,
//     error,
//     lastSnapshot: snapshotRef.current ?? undefined,
//   };
// }



"use client";
import { useEffect, useState, useRef } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  limit,
  Query,
  DocumentData,
  QuerySnapshot,
  Unsubscribe,
  WhereFilterOp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebaseClient";

export type Product = {
  id: string;
  name: string;
  price: number;
  category?: string;
  createdAt?: Timestamp | null;
};

type UseProductsResult = {
  products: Product[];
  loading: boolean;
  error: Error | null;
  lastSnapshot?: QuerySnapshot<DocumentData>;
};

export default function useProductsRealtime(opts?: {
  whereClause?: [string, WhereFilterOp, any];
  orderByField?: string;
  limitCount?: number;
}): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const snapshotRef = useRef<QuerySnapshot<DocumentData> | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let q: Query<DocumentData> = collection(db, "products");

    if (opts?.whereClause) {
      const [field, op, value] = opts.whereClause;
      q = query(q, where(field, op, value));
    }

    if (opts?.limitCount && opts.limitCount > 0) {
      q = query(q, limit(opts.limitCount));
    }

    const unsubscribe: Unsubscribe = onSnapshot(
      q,
      (snap) => {
        snapshotRef.current = snap;

        // Incremental updates
        setProducts((prev) => {
          let updated = [...prev];

          snap.docChanges().forEach((change) => {
            const doc = change.doc;
            const data = { id: doc.id, ...(doc.data() as any) } as Product;

            if (change.type === "added") {
              if (!updated.find((p) => p.id === data.id)) {
                updated.push(data);
              }
            } else if (change.type === "modified") {
              updated = updated.map((p) => (p.id === data.id ? data : p));
            } else if (change.type === "removed") {
              updated = updated.filter((p) => p.id !== data.id);
            }
          });

          // Sort client-side if orderByField exists
          if (opts?.orderByField) {
            const field = opts.orderByField;
            updated.sort((a, b) => {
              const aVal =
                (a as any)[field] instanceof Timestamp
                  ? (a as any)[field].toMillis()
                  : 0;
              const bVal =
                (b as any)[field] instanceof Timestamp
                  ? (b as any)[field].toMillis()
                  : 0;
              return bVal - aVal; // descending
            });
          }

          return updated;
        });

        setLoading(false);
      },
      (err) => {
        console.error("Products realtime listener error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [
    opts?.whereClause ? JSON.stringify(opts.whereClause) : null,
    opts?.orderByField,
    opts?.limitCount,
  ]);

  return {
    products,
    loading,
    error,
    lastSnapshot: snapshotRef.current ?? undefined,
  };
}
