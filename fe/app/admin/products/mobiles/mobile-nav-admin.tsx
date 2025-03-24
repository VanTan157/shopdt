"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MobileTType } from "@/lib/validate/mobile";
export default function MobileNavAdmin({
  mobileType,
}: {
  mobileType: MobileTType[];
}) {
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const router = useRouter();
  const handleClick = (item: string) => {
    setSelectedStatus(item);
    if (item === "Tất cả") return router.push(`/admin/products/mobiles`);
    router.push(`/admin/products/mobiles/${item}`);
  };

  return (
    <div className="min-w-full bg-white border-b-2 border-gray-200 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center border-b-2 border-gray-200">
        <div className="flex items-center space-x-4">
          {mobileType?.map((item) => (
            <button
              key={item._id}
              onClick={() => handleClick(item._id)}
              className={`text-sm font-semibold px-4 py-2 rounded-md transition ${
                selectedStatus === item._id
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {item.type}
            </button>
          ))}
        </div>
        <div className="flex space-x-4 pb-1 px-4 overflow-x-auto whitespace-nowrap"></div>
      </div>
    </div>
  );
}
