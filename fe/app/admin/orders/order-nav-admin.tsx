"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function OrderNavAdmin() {
  const [selectedStatus, setSelectedStatus] = useState<string>("Tất cả");
  const router = useRouter();
  const handleClick = (item: string) => {
    setSelectedStatus(item);
    if (item === "Tất cả") return router.push(`/order`);
    router.push(`/admin/orders/${item}`);
  };
  const status = [
    "Tất cả",
    "Đang chờ xác nhận",
    "Đã xác nhận",
    "Đang vận chuyển",
    "Hoàn thành",
    "Đã hủy",
  ];

  return (
    <div className="min-w-full bg-white border-b-2 border-gray-200 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center border-b-2 border-gray-200">
        <div className="flex items-center space-x-4">
          {status.map((item) => (
            <button
              key={item}
              onClick={() => handleClick(item)}
              className={`text-sm font-semibold px-4 py-2 rounded-md transition ${
                selectedStatus === item
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex space-x-4 pb-1 px-4 overflow-x-auto whitespace-nowrap"></div>
      </div>
    </div>
  );
}
