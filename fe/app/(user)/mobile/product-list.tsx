"use client";

import React from "react";
import Image from "next/image";
import { ProductType } from "../../validate";
import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";

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

  if (products.length === 0) {
    return (
      <h1 className="text-center text-gray-500 text-xl md:text-2xl font-medium py-12">
        Không có sản phẩm nào
      </h1>
    );
  }

  return (
    <div
      className={`grid ${getColumnCount()} gap-6 px-4 md:px-6 py-8 bg-gray-50`}
    >
      {products.map((product) => (
        <div
          key={product._id}
          className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
        >
          <Link
            href={`/mobile/mobile-item/${product._id}`}
            className="flex flex-col flex-grow"
          >
            {/* Image Container */}
            <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden">
              <Image
                src={`http://localhost:8080${product.image}`}
                alt={product.name}
                fill
                className="object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                quality={85}
              />
              {product.IsPromotion && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                  -{Math.round(product.promotion * 100)}%
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow text-center">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors duration-300">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm md:text-base mb-3 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
              <p className="text-red-600 font-bold text-base sm:text-lg md:text-xl">
                {product.finalPrice.toLocaleString()} VND
              </p>
            </div>
          </Link>

          {/* Buy Button */}
          <div className="px-4 pb-4">
            <button className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
              Mua ngay
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
