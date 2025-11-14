// src/components/ui/empty-state.tsx
"use client";
import React from "react";

export function EmptyState({ title, description }: { title?: string; description?: string }) {
  return (
    <div className="py-8 text-center text-black">
      <div className="text-lg font-medium">{title ?? "No items"}</div>
      {description && <div className="mt-1 text-sm">{description}</div>}
    </div>
  );
}
