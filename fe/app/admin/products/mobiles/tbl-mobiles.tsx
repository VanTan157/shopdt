"use client";

import { MobileType } from "@/app/validate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";

const MobileTable = ({ mobiles }: { mobiles: MobileType[] }) => {
  const [promotionFilter, setPromotionFilter] = useState<string>("all"); // Bộ lọc mặc định là "Tất cả"
  const [searchName, setSearchName] = useState<string>("");

  // Hàm lọc danh sách sản phẩm dựa trên promotionFilter
  const filteredMobiles = mobiles.filter((mobile) => {
    // Lọc theo khuyến mãi
    const matchesPromotion =
      promotionFilter === "all" ||
      (promotionFilter === "yes" && mobile.IsPromotion) ||
      (promotionFilter === "no" && !mobile.IsPromotion);

    // Lọc theo tên sản phẩm
    const matchesSearch = mobile.name
      .toLowerCase()
      .includes(searchName.toLowerCase());

    return matchesPromotion && matchesSearch;
  });

  const handleFilterChange = (value: string) => {
    setPromotionFilter(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  return (
    <div className="overflow-x-auto pr-4 pt-4">
      <div className="mb-4 flex items-center space-x-4">
        {/* Bộ lọc Khuyến mãi */}
        <div className="flex items-center space-x-2">
          <label className="text-lg font-medium">Khuyến mãi:</label>
          <Select value={promotionFilter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-40 h-10">
              <SelectValue placeholder="Chọn bộ lọc" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="yes">Có</SelectItem>
              <SelectItem value="no">Không</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="flex items-center space-x-2">
          <label className="text-lg font-medium">Tìm kiếm:</label>
          <Input
            value={searchName}
            onChange={handleSearchChange}
            placeholder="Nhập tên sản phẩm..."
            className="w-64 h-10"
          />
        </div>
      </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-left">
              Hình ảnh
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Tên sản phẩm
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Giá khởi điểm
            </th>

            <th className="border border-gray-200 px-4 py-2 text-left">
              Khuyến mãi
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Giá cuối cùng
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Đang khuyến mãi
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredMobiles.map((mobile) => (
            <tr key={mobile._id} className="hover:bg-gray-50">
              {/* Hình ảnh */}
              <td className="border border-gray-200 px-4 py-2">
                <div className="relative w-16 h-16">
                  <Image
                    src={`http://localhost:8080${mobile.image}`}
                    alt={mobile.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </td>

              {/* Tên sản phẩm */}
              <td className="border border-gray-200 px-4 py-2">
                {mobile.name}
              </td>

              {/* Giá khởi điểm */}
              <td className="border border-gray-200 px-4 py-2">
                {mobile.StartingPrice.toLocaleString("vi-VN")} VNĐ
              </td>

              {/* Khuyến mãi */}
              <td className="border border-gray-200 px-4 py-2">
                {mobile.promotion}%
              </td>

              {/* Giá cuối cùng */}
              <td className="border border-gray-200 px-4 py-2">
                {mobile.finalPrice.toLocaleString("vi-VN")} VNĐ
              </td>

              {/* Trạng thái khuyến mãi */}
              <td className="border border-gray-200 px-4 py-2">
                {mobile.IsPromotion ? (
                  <span className="text-green-500">Có</span>
                ) : (
                  <span className="text-red-500">Không</span>
                )}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <Button>Sửa</Button>
                <Button>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MobileTable;
