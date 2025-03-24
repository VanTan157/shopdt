"use client";

import { MobileType } from "@/lib/validate/mobile";
import Image from "next/image";
import { useState } from "react";
import BtnAddCart from "../../btn-add-cart";
import BtnBuyNow from "../../btn-buy-now";

const MobileItem = ({ product }: { product: MobileType }) => {
  const [count, setCount] = useState(0);

  const handleClick = (value: number) => {
    // Chỉ cho phép click nếu stock > 0
    if (product.colorVariants[value].stock > 0) {
      setCount(value);
      console.log(value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Phần ảnh sản phẩm */}
        <div className="relative flex flex-col items-center">
          <div className="relative w-full max-w-[400px] h-[400px] bg-white p-4">
            <Image
              src={`http://localhost:8080${product.colorVariants[count]?.image}`}
              alt={`${product.name} - ${product.colorVariants[count]?.color}`}
              fill
              className="object-contain rounded-lg"
              priority
              unoptimized
              quality={85}
            />
            {product.IsPromotion && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                Giảm {Math.round(product.promotion)}%
              </div>
            )}
          </div>
          <div className="mt-3 text-center text-sm font-medium text-gray-700">
            {product.colorVariants[count]?.color}
          </div>
        </div>

        {/* Phần thông tin sản phẩm */}
        <div className="space-y-5">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center space-x-4">
            <p className="text-2xl md:text-3xl font-semibold text-red-600">
              {product.finalPrice.toLocaleString()} VND
            </p>
            {product.IsPromotion && (
              <p className="text-lg text-gray-400 line-through">
                {product.StartingPrice.toLocaleString()} VND
              </p>
            )}
          </div>

          {/* Hiển thị các màu sắc */}
          <div className="space-y-3">
            <p className="text-base font-semibold text-gray-800">Màu sắc:</p>
            <div className="flex flex-wrap gap-3">
              {product.colorVariants.map((variant, index) => {
                const isOutOfStock = variant.stock === 0;
                return (
                  <div
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                      isOutOfStock
                        ? "cursor-not-allowed opacity-50 border border-gray-300"
                        : `cursor-pointer ${
                            count === index
                              ? "bg-blue-50 border border-blue-500"
                              : "border border-gray-200 hover:border-blue-400"
                          }`
                    }`}
                  >
                    <Image
                      src={`http://localhost:8080${variant.image}`}
                      alt={variant.color}
                      width={50}
                      height={50}
                      className="object-contain rounded-md"
                    />
                    <span className="text-xs text-gray-700 mt-2 text-center">
                      {variant.color}
                    </span>
                    <span className="text-xs text-gray-700 mt-2 text-center">
                      Kho: {variant.stock}
                    </span>
                    {isOutOfStock && (
                      <span className="text-xs text-red-500 mt-1 font-semibold">
                        Hết hàng
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex space-x-4">
            <BtnBuyNow
              product={product}
              colorVariants={product.colorVariants[count]}
            />
            <BtnAddCart
              product={product}
              colorVariants={product.colorVariants[count]}
            />
          </div>
        </div>
      </div>

      {/* Thông tin chi tiết */}
      <div className="mt-8 bg-white p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Thông tin chi tiết
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="font-medium">Kích thước màn hình:</span>
            <span>{product.specifications?.screenSize} inch</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="font-medium">Độ phân giải:</span>
            <span>{product.specifications?.resolution}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="font-medium">CPU:</span>
            <span>{product.specifications?.cpu}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="font-medium">RAM:</span>
            <span>{product.specifications?.ram} GB</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="font-medium">Dung lượng:</span>
            <span>{product.specifications?.storage} GB</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="font-medium">Pin:</span>
            <span>{product.specifications?.battery} mAh</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="font-medium">Camera sau:</span>
            <span>{product.camera?.rear}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="font-medium">Camera trước:</span>
            <span>{product.camera?.front}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="font-medium">Trọng lượng:</span>
            <span>{product.weight} g</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="font-medium">Hệ điều hành:</span>
            <span>{product.specifications?.os}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileItem;
