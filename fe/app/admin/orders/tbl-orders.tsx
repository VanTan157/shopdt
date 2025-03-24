"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { OrderMobileType } from "@/lib/validate/order";
import OrderApi from "@/lib/api/mobile/order"; // API để quản lý đơn hàng

const TblOrder = ({ orders }: { orders: OrderMobileType[] }) => {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchOrderId, setSearchOrderId] = useState<string>("");

  // Hàm xử lý xác nhận
  const XacNhan = async (orderId: string) => {
    try {
      // Gọi API để chuyển trạng thái sang "Đã xác nhận" (bạn sẽ thêm sau)
      // Ví dụ: await OrderApi.updateOrderStatus(orderId, "Đã xác nhận");
      console.log(`Xác nhận đơn hàng ${orderId}`);
      toast.success("Đơn hàng đã được xác nhận!");
      router.refresh(); // Refresh để cập nhật dữ liệu
    } catch (error) {
      toast.error("Không thể xác nhận đơn hàng!");
      console.error(error);
    }
  };

  // Hàm xử lý vận chuyển
  const VanChuyen = async (orderId: string) => {
    try {
      // Gọi API để chuyển trạng thái sang "Đang vận chuyển" (bạn sẽ thêm sau)
      // Ví dụ: await OrderApi.updateOrderStatus(orderId, "Đang vận chuyển");
      console.log(`Chuyển đơn hàng ${orderId} sang vận chuyển`);
      toast.success("Đơn hàng đã chuyển sang trạng thái vận chuyển!");
      router.refresh(); // Refresh để cập nhật dữ liệu
    } catch (error) {
      toast.error("Không thể cập nhật trạng thái vận chuyển!");
      console.error(error);
    }
  };

  // Hàm xử lý hủy đơn hàng
  const handleCancelOrder = async (orderId: string) => {
    try {
      //   const res = await OrderApi.updateOrderStatus(orderId, "Đã hủy");
      toast.success("Đơn hàng đã được hủy!");
      router.refresh();
    } catch (error) {
      toast.error("Không thể hủy đơn hàng!");
      console.error(error);
    }
  };

  // Lọc danh sách đơn hàng
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Lọc theo trạng thái
    result = result.filter((order) => {
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      // Lọc theo mã đơn hàng
      const matchesSearch = order._id
        .toLowerCase()
        .includes(searchOrderId.toLowerCase());

      return matchesStatus && matchesSearch;
    });

    return result;
  }, [orders, statusFilter, searchOrderId]);

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOrderId(e.target.value);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Quản lý đơn hàng
      </h1>

      {/* Bộ lọc và tìm kiếm */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        {/* Bộ lọc trạng thái */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            Trạng thái:
          </label>
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-40 h-10">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Đang chờ xác nhận">
                Đang chờ xác nhận
              </SelectItem>
              <SelectItem value="Đã xác nhận">Đã xác nhận</SelectItem>
              <SelectItem value="Đang vận chuyển">Đang vận chuyển</SelectItem>
              <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
              <SelectItem value="Đã hủy">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Tìm kiếm:</label>
          <Input
            value={searchOrderId}
            onChange={handleSearchChange}
            placeholder="Nhập mã đơn hàng..."
            className="w-64 h-10"
          />
        </div>
      </div>

      {/* Bảng đơn hàng */}
      <div className="border rounded-lg shadow-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-700">
                Mã đơn hàng
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-700">
                Khách hàng
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-700">
                Sản phẩm
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-700">
                Tổng tiền
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-700">
                Số điện thoại
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-700">
                Địa chỉ
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-700">
                Trạng thái
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-semibold text-gray-700">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-4 text-gray-500"
                >
                  Không tìm thấy đơn hàng nào.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <TableCell className="px-4 py-3 text-gray-800">
                    {order._id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-800">
                    {order.user_id} {/* Có thể thay bằng tên nếu có API */}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-800">
                    {order.orderitem_ids.map((item) => (
                      <div key={item._id}>
                        {item.mobile_id.name} - {item.colorVariant.color} (x
                        {item.quantity})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-800">
                    {order.total_amount.toLocaleString("vi-VN")} VNĐ
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-800">
                    {order.phone_number}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-800">
                    {order.address}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-800">
                    {order.status === "Đang chờ xác nhận" ? (
                      <span className="text-yellow-500 font-medium">
                        {order.status}
                      </span>
                    ) : order.status === "Đã xác nhận" ? (
                      <span className="text-blue-500 font-medium">
                        {order.status}
                      </span>
                    ) : order.status === "Đang vận chuyển" ? (
                      <span className="text-orange-500 font-medium">
                        {order.status}
                      </span>
                    ) : order.status === "Hoàn thành" ? (
                      <span className="text-green-500 font-medium">
                        {order.status}
                      </span>
                    ) : (
                      <span className="text-red-500 font-medium">
                        {order.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 flex space-x-2">
                    <Button
                      onClick={() =>
                        order.status === "Đang chờ xác nhận"
                          ? XacNhan(order._id)
                          : VanChuyen(order._id)
                      }
                      disabled={
                        order.status === "Đang vận chuyển" ||
                        order.status === "Hoàn thành" ||
                        order.status === "Đã hủy"
                      }
                      className={`${
                        order.status === "Đang vận chuyển" ||
                        order.status === "Hoàn thành" ||
                        order.status === "Đã hủy"
                          ? "bg-green-300 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white`}
                    >
                      {order.status === "Đang chờ xác nhận"
                        ? "Xác nhận"
                        : order.status === "Đã xác nhận"
                        ? "Vận chuyển"
                        : "Đã vận chuyển"}
                    </Button>
                    <Button
                      onClick={() => handleCancelOrder(order._id)}
                      disabled={order.status !== "Đang chờ xác nhận"}
                      className={`${
                        order.status !== "Đang chờ xác nhận"
                          ? "bg-red-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white`}
                    >
                      Hủy
                    </Button>
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

export default TblOrder;
