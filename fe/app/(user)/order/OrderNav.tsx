"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function OrderNav() {
  const [selectedStatus, setSelectedStatus] = useState<string>("Tất cả");
  const router = useRouter();
  const { open } = useSidebar(); // Trạng thái Sidebar
  const handleClick = (item: string) => {
    setSelectedStatus(item);
    if (item === "Tất cả") return router.push(`/order`);
    router.push(`/order/${item}`);
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
    <div
      className={`fixed top-16 z-10 min-w-full bg-white border-b-2 border-gray-200 transition-all duration-300 ease-in-out ${
        open ? "left-64" : "left-0" // Điều chỉnh vị trí left thay vì padding-left
      }`}
      style={{ width: open ? "calc(100% - 16rem)" : "calc(100% - 4rem)" }} // Co dãn chiều rộng
    >
      <div className="flex justify-between items-center p-4 border-b-2 border-gray-200">
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
