"use client";

import React from "react";
import Image from "next/image";
import { ProductType } from "../validate";
import { useSidebar } from "@/components/ui/sidebar";

interface ProductListProps {
  products: ProductType[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { open } = useSidebar();

  const getColumnCount = () => {
    return open
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";
  };

  return (
    <div
      className={`grid ${getColumnCount()} gap-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen`}
    >
      {products.map((product) => (
        <div
          key={product._id}
          className="group relative shadow-lg rounded-xl p-5 bg-white hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100 overflow-hidden hover:-translate-y-1"
        >
          {/* Enhanced Image Container */}
          <div className="relative w-full h-40 mb-4 overflow-hidden rounded-lg">
            <Image
              src={`http://localhost:8080${product.image}`}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
              quality={100}
              priority
            />
            {/* Image Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Product Info */}
          <div className="flex flex-col flex-grow text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors duration-300">
              {product.name}
            </h2>
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
            <p className="text-red-600 font-bold text-xl">
              {product.price.toLocaleString()} VND
            </p>
          </div>

          {/* Enhanced Buy Button */}
          <button className="mt-4 w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 rounded-lg font-medium transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:scale-105 active:scale-95">
            Mua ngay
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
