// src/lib/firebaseClient.ts
"use client"
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  // add other fields if needed
};

// initialize app (safe for Next.js client)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// Optional: enable offline persistence (wrap in try/catch)
try {
  // enableIndexedDbPersistence(db); // uncomment if you want offline caching
} catch (e) {
  // console.warn("IndexedDB persistence not enabled:", e);
}
