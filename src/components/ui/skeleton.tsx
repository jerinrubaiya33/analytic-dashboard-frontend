// src/components/ui/skeleton.tsx
"use client";
import { cn } from "@/lib/utils";
import React from "react";

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={cn("animate-pulse bg-gray-200 rounded", className)} />;
}
