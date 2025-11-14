// src/components/ProductsModal.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface ProductFormInputs {
  name: string;
  price: number;
}

interface ProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductsModal({ isOpen, onClose }: ProductsModalProps) {
  const { register, handleSubmit, reset } = useForm<ProductFormInputs>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ProductFormInputs) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('auth_token'); // ← GET THE TOKEN
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // ← ADD THIS HEADER
        },
        credentials: "include",
        body: JSON.stringify({
          name: data.name,
          price: Number(data.price),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create product");
      }

      reset();
      onClose();
    } catch (err) {
      console.error("Error creating product:", err);
      alert("Failed to create product. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-black p-6 shadow-md w-full max-w-md border border-white">
        <h2 className="text-xl font-bold mb-4 text-white">Create Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 text-white"
            {...register("name", { required: true })}
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 border bg-red-600 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
