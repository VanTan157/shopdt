"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";

interface MobileNavProps {
  product_types: { _id: string; type: string }[] | null;
}

export default function MobileNav({ product_types }: MobileNavProps) {
  const pathname = usePathname();
  const { open } = useSidebar(); // Trạng thái Sidebar

  return (
    <div
      className={`fixed top-16 z-10 min-w-full  bg-gray-700 border-b-2 border-gray-200 transition-all duration-300 ease-in-out ${
        open ? "left-64" : "left-0" // Điều chỉnh vị trí left thay vì padding-left
      }`}
      style={{ width: open ? "calc(100% - 16rem)" : "calc(100% - 4rem)" }} // Co dãn chiều rộng
    >
      <div className="flex space-x-4 pb-1 px-4 overflow-x-auto whitespace-nowrap">
        {product_types?.map((product_type) => {
          const isActive = pathname === `/mobile/${product_type._id}`;
          return (
            <div
              key={product_type._id}
              className={`hover:cursor-pointer transition-all duration-300 py-2 ${
                isActive
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-900 hover:text-red-500 border-b-2 border-transparent hover:border-red-500"
              }`}
            >
              <Link href={`/mobile/${product_type._id}`} className="text-white">
                {product_type.type}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
