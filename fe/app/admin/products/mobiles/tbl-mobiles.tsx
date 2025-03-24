"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import { MobileTType, MobileType } from "@/lib/validate/mobile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MobileDetail from "./mobile-detail";

const MobileTable = ({
  mobiles,
}: // type,
{
  mobiles: MobileType[];
  type?: MobileTType[];
}) => {
  const [promotionFilter, setPromotionFilter] = useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [searchName, setSearchName] = useState<string>("");
  const [sortField, setSortField] = useState<keyof MobileType | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [open, setOpen] = useState<boolean>(false);
  const [mobile, setMobile] = useState<MobileType>();

  // Hàm xử lý sắp xếp
  const handleSort = (field: keyof MobileType) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Lọc và sắp xếp danh sách sản phẩm
  const filteredAndSortedMobiles = useMemo(() => {
    let result = [...mobiles];

    // Lọc theo khuyến mãi
    result = result.filter((mobile) => {
      const matchesPromotion =
        promotionFilter === "all" ||
        (promotionFilter === "yes" && mobile.IsPromotion) ||
        (promotionFilter === "no" && !mobile.IsPromotion);

      // Lọc theo trạng thái khả dụng
      const matchesAvailability =
        availabilityFilter === "all" ||
        (availabilityFilter === "yes" && mobile.isAvailable) ||
        (availabilityFilter === "no" && !mobile.isAvailable);

      // Lọc theo tên sản phẩm
      const matchesSearch = mobile.name
        .toLowerCase()
        .includes(searchName.toLowerCase());

      return matchesPromotion && matchesAvailability && matchesSearch;
    });

    // Sắp xếp
    if (sortField) {
      result.sort((a, b) => {
        const valueA = a[sortField];
        const valueB = b[sortField];

        if (sortField === "createdAt") {
          return sortOrder === "asc"
            ? new Date(valueA as string).getTime() -
                new Date(valueB as string).getTime()
            : new Date(valueB as string).getTime() -
                new Date(valueA as string).getTime();
        }

        if (typeof valueA === "number" && typeof valueB === "number") {
          return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        }

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortOrder === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        return 0;
      });
    }

    return result;
  }, [
    mobiles,
    promotionFilter,
    availabilityFilter,
    searchName,
    sortField,
    sortOrder,
  ]);

  const handleFilterChange = (value: string) => {
    setPromotionFilter(value);
  };

  const handleAvailabilityFilterChange = (value: string) => {
    setAvailabilityFilter(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const OpenMobileDetail = ({ mobile }: { mobile?: MobileType }) => {
    setOpen(true);
    setMobile(mobile);
    console.log(open);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <MobileDetail
        open={open}
        setOpen={setOpen}
        mobile={mobile}
        setMobile={setMobile}
      />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Quản lý sản phẩm
      </h1>

      {/* Bộ lọc và tìm kiếm */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        {/* Bộ lọc Khuyến mãi */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            Khuyến mãi:
          </label>
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

        {/* Bộ lọc Trạng thái khả dụng */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Khả dụng:</label>
          <Select
            value={availabilityFilter}
            onValueChange={handleAvailabilityFilterChange}
          >
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
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Tìm kiếm:</label>
          <Input
            value={searchName}
            onChange={handleSearchChange}
            placeholder="Nhập tên sản phẩm..."
            className="w-64 h-10"
          />
        </div>
      </div>

      {/* Bảng sản phẩm */}
      <div className="border rounded-lg shadow-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead
                className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Tên sản phẩm{" "}
                {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer"
                onClick={() => handleSort("StartingPrice")}
              >
                Giá khởi điểm{" "}
                {sortField === "StartingPrice" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-700">
                Khuyến mãi
              </TableHead>
              <TableHead
                className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer"
                onClick={() => handleSort("finalPrice")}
              >
                Giá cuối cùng{" "}
                {sortField === "finalPrice" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-700">
                Đang khuyến mãi
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-700">
                Khả dụng
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-700">
                Màu sắc
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedMobiles.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className="text-center py-4 text-gray-500"
                >
                  Không tìm thấy sản phẩm nào.
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedMobiles.map((mobile) => (
                <TableRow
                  onClick={() => OpenMobileDetail({ mobile })}
                  key={mobile._id}
                  className="hover:bg-gray-50"
                >
                  {/* Tên sản phẩm */}
                  <TableCell className="px-4 py-3">{mobile.name}</TableCell>

                  {/* Giá khởi điểm */}
                  <TableCell className="px-4 py-3">
                    {mobile.StartingPrice.toLocaleString("vi-VN")} VNĐ
                  </TableCell>

                  {/* Khuyến mãi */}
                  <TableCell className="px-4 py-3">
                    {mobile.promotion}%
                  </TableCell>

                  {/* Giá cuối cùng */}
                  <TableCell className="px-4 py-3">
                    {mobile.finalPrice.toLocaleString("vi-VN")} VNĐ
                  </TableCell>

                  {/* Trạng thái khuyến mãi */}
                  <TableCell className="px-4 py-3">
                    {mobile.IsPromotion ? (
                      <span className="text-green-500 font-medium">Có</span>
                    ) : (
                      <span className="text-red-500 font-medium">Không</span>
                    )}
                  </TableCell>

                  {/* Trạng thái khả dụng */}
                  <TableCell className="px-4 py-3">
                    {mobile.isAvailable ? (
                      <span className="text-green-500 font-medium">Có</span>
                    ) : (
                      <span className="text-red-500 font-medium">Không</span>
                    )}
                  </TableCell>

                  {/* Thời gian tạo */}

                  {/* Màu sắc */}
                  <TableCell className="px-4 py-3">
                    {mobile.colorVariants
                      .map((variant) => variant.color)
                      .join(", ")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MobileTable;
