"use client";

import React from "react";
import Image from "next/image";
import { ProductType } from "../validate";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

interface ProductListProps {
  products: ProductType[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { open } = useSidebar(); // Lấy trạng thái sidebar

  console.log(products);

  // Điều chỉnh số cột dựa trên trạng thái sidebar
  const getColumnCount = () => {
    if (open) {
      return "grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"; // Giảm cột khi sidebar mở
    }
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"; // Cột mặc định khi sidebar đóng
  };

  return (
    <div
      className={`grid ${getColumnCount()} gap-6 p-6 bg-gray-50 min-h-screen`}
    >
      {products.map((product) => (
        <div
          key={product._id}
          className="shadow-lg rounded-xl p-5 bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full border border-gray-100 hover:border-gray-200"
        >
          <div className="relative w-full h-56 mb-5 overflow-hidden rounded-lg">
            <Image
              src={`http://localhost:8080${product.image}`}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex flex-col flex-grow text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
              {product.name}
            </h2>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
            <p className="text-red-600 font-semibold text-lg mb-4">
              {product.price.toLocaleString()} VND
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-3">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full sm:w-auto"
                size="sm"
              >
                Thêm giỏ hàng
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full sm:w-auto"
                size="sm"
              >
                Mua Ngay
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
