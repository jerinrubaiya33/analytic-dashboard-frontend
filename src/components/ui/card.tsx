// src/components/ui/card.tsx
"use client";
import { cn } from "@/lib/utils";
import React from "react";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn(" border bg-black shadow-sm p-4", className)}>{children}</div>;
}
