"use client";

import { useState } from "react";
import Image from "next/image";
import { CartType } from "../validate";
import https from "@/lib/http";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";

type CartClientProps = {
  initialCarts: CartType[];
};

const CartClient = ({ initialCarts }: CartClientProps) => {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { decrementCartCount } = useCartStore();

  const removeFromCart = async (id: string) => {
    console.log(id);
    try {
      const res = await https.delete(`order-items/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(res);
      decrementCartCount(1);
      router.refresh();
      toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else console.log("Lỗi không xác định");
    }
  };

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const editItem = (id: string) => {
    // Logic để chỉnh sửa sản phẩm
    console.log(`Edit item with id: ${id}`);
  };

  const buyNow = () => {
    // Logic mua ngay
    console.log("Buy now");
  };

  const totalSelectedPrice = initialCarts
    .filter((item) => selectedItems.includes(item._id))
    .reduce((total, item) => total + item.total_price, 0);

  return (
    <div className="container mx-auto">
      <ul className="space-y-6">
        {initialCarts.map((item) => (
          <li
            key={item._id}
            className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <div className="relative w-32 h-32 flex-shrink-0">
              <Image
                src={`http://localhost:8080${item.product_id.image}`}
                alt={item.product_id.name}
                fill
                sizes="100px"
                className="object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                quality={100}
              />
            </div>
            <div className="flex-1 ml-4">
              <h2 className="text-xl font-semibold">{item.product_id.name}</h2>
              <p className="text-gray-700">
                Unit Price: {item.unit_price.toLocaleString()} VNĐ
              </p>
              <p className="text-gray-700">Quantity: {item.quantity}</p>
              <p className="text-lg font-bold text-blue-600">
                Total: {item.total_price.toLocaleString()} VNĐ
              </p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-red-600"
                >
                  Remove
                </button>
                <button
                  onClick={() => toggleSelectItem(item._id)}
                  className={`text-white px-4 py-2 rounded-lg transition-colors duration-300 ${
                    selectedItems.includes(item._id)
                      ? "bg-blue-700 hover:bg-blue-800"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {selectedItems.includes(item._id)
                    ? "Unselect"
                    : "Select to Buy"}
                </button>
                <button
                  onClick={() => editItem(item._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-yellow-600"
                >
                  Edit
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-bold mt-6">
        Total: {totalSelectedPrice.toLocaleString()} VNĐ
      </h3>
      <button
        onClick={buyNow}
        disabled={selectedItems.length === 0}
        className={`mt-4  text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
          selectedItems.length === 0
            ? "bg-green-300 cursor-not-allowed"
            : "hover:bg-green-600 bg-green-500"
        }`}
      >
        Buy Now
      </button>
    </div>
  );
};

export default CartClient;
