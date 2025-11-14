// src/components/ui/container.tsx
"use client";
import { cn } from "@/lib/utils";
import React from "react";

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}
