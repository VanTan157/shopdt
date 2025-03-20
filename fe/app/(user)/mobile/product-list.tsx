"use client";

import React from "react";
import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { MobileType } from "@/lib/validate/mobile";

interface ProductListProps {
  products: MobileType[];
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
    <div className="bg-gray-50 min-h-screen">
      <div
        className={`grid ${getColumnCount()} gap-4 px-4 md:px-6 py-8 bg-gray-50`}
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
            style={{ height: "300px" }} // Đảm bảo chiều cao cố định cho tất cả thẻ
          >
            <Link
              href={`/mobile/mobile-item/${product._id}`}
              className="flex flex-col flex-grow"
            >
              {/* Image Container */}
              <div className="relative w-full h-40 overflow-hidden">
                <Image
                  src={`http://localhost:8080${product.colorVariants[0]?.image}`}
                  alt={product.name}
                  fill
                  priority
                  unoptimized
                  quality={80}
                  className="object-contain rounded-t-xl"
                />
                {product.IsPromotion && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                    Giảm {Math.round(product.promotion)}%
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3 flex flex-col flex-grow text-center space-y-1">
                <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {product.specifications?.storage}GB
                </p>
                <div className="flex justify-center items-center space-x-2">
                  <p className="text-sm font-semibold text-red-600">
                    {product.finalPrice.toLocaleString()}đ
                  </p>
                  {product.IsPromotion && (
                    <p className="text-xs text-gray-400 line-through">
                      {product.StartingPrice.toLocaleString()}đ
                    </p>
                  )}
                </div>
                <div className="flex justify-center items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </Link>
            <div className="px-3 pb-3">
              <button className="w-full flex justify-center items-center space-x-1 text-red-600 text-xs font-medium hover:text-red-700">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>Yêu thích</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
