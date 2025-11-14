// src/lib/redux/listeners/productsListener.ts
import { db } from "../../firebaseClient";
import { AppDispatch } from "../../store";
import { collection, DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { setProducts, setError, setLoading, Product } from "../slices/productsSlice";

export function subscribeToProducts(dispatch: AppDispatch) {
  dispatch(setLoading(true));
  
  const unsubscribe = onSnapshot(
    collection(db, "products"),
    (snapshot: QuerySnapshot<DocumentData>) => {
      const products: Product[] = [];
      snapshot.forEach((doc) => {
        products.push({ id: doc.id, ...(doc.data() as any) } as Product);
      });
      
      // Just set all products on every snapshot - Firestore handles this efficiently
      dispatch(setProducts(products));
    },
    (error) => {
      console.error("Products listener error:", error);
      dispatch(setError(error.message));
    }
  );

  return unsubscribe;
}