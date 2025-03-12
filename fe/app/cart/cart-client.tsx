"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CartType } from "../validate";

type CartClientProps = {
  initialCarts: CartType[];
};

const CartClient = ({ initialCarts }: CartClientProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  // Xử lý khi nhấn nút "Mua ngay"
  const handleBuyNow = () => {
    if (selectedItems.length > 0) {
      console.log("Các sản phẩm đã chọn:", selectedItems);
    }
  };

  return (
    <>
      {initialCarts?.length > 0 ? (
        <div className="grid gap-6">
          {initialCarts.map((cart) => (
            <div
              key={cart._id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <Checkbox
                  id={`checkbox-${cart._id}`}
                  className="w-6 h-6 border-2 border-gray-600 rounded-md cursor-pointer"
                  onCheckedChange={(checked: boolean) =>
                    handleCheckboxChange(cart._id, checked)
                  }
                />
              </div>
              {/* Hình ảnh sản phẩm */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={`http://localhost:8080${cart.product_id.image}`}
                  alt={cart.product_id.name}
                  fill
                  sizes="100px"
                  className="object-cover rounded-md"
                  quality={100}
                />
              </div>
              {/* Thông tin sản phẩm */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {cart.product_id.name}
                </h2>
                <p className="text-gray-600">
                  Đơn giá:{" "}
                  <span className="font-medium">
                    {cart.unit_price.toLocaleString()} VNĐ
                  </span>
                </p>
                <p className="text-gray-600">
                  Số lượng: <span className="font-medium">{cart.quantity}</span>
                </p>
                <p className="text-lg font-bold text-blue-600">
                  Tổng: {cart.total_price.toLocaleString()} VNĐ
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <Button className="bg-green-500 hover:bg-green-600">Sửa</Button>
                <Button className="bg-red-500 hover:bg-red-600">Xóa</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          Giỏ hàng của bạn đang trống.
        </p>
      )}

      {/* Nút Mua ngay */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={handleBuyNow}
          disabled={selectedItems.length === 0}
          className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ${
            selectedItems.length > 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Mua ngay
        </Button>
      </div>
    </>
  );
};

export default CartClient;
