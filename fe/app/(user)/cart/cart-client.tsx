"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderItemMobileType } from "@/lib/validate/order";
import OrderApi from "@/lib/api/mobile/order";

const CartClient = ({
  initialCarts,
}: {
  initialCarts: OrderItemMobileType[];
}) => {
  console.log(initialCarts);
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { decrementCartCount } = useCartStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<{ phone?: string; address?: string }>(
    {}
  ); // State lưu lỗi

  const removeFromCart = async (id: string) => {
    console.log(id);
    try {
      const res = await OrderApi.removeOrderItem(id);
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

  const buyNow = () => {
    setIsModalOpen(true);
  };

  // Hàm validate dữ liệu
  const validateForm = (): boolean => {
    const newErrors: { phone?: string; address?: string } = {};

    // Validate số điện thoại
    if (!phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Số điện thoại phải là 10 chữ số";
    } else if (!/^0\d{9}$/.test(phone)) {
      newErrors.phone = "Số điện thoại phải bắt đầu bằng 0";
    }

    // Validate địa chỉ
    if (!address.trim()) {
      newErrors.address = "Địa chỉ không được để trống";
    } else if (address.length < 5) {
      newErrors.address = "Địa chỉ phải ít nhất 10 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  const handleConfirmPurchase = async () => {
    if (!validateForm()) {
      return; // Dừng nếu validation thất bại
    }

    try {
      const res = await OrderApi.addOrderItemInOrder({
        selectedItems,
        phone,
        address,
      });
      console.log(res);
      setPhone(""); // Reset form
      setAddress("");
      setErrors({}); // Reset lỗi
      setIsModalOpen(false);
      toast.success("Đặt hàng thành công!");
      decrementCartCount(selectedItems.length);
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else toast.error("Lỗi không xác định");
    }
  };

  const totalSelectedPrice =
    initialCarts.length > 0 &&
    initialCarts
      .filter((item) => selectedItems.includes(item._id))
      .reduce((total, item) => total + item.total_price, 0);

  return (
    <div className="container mx-auto">
      {initialCarts.length > 0 ? (
        <div>
          <ul className="space-y-6">
            {initialCarts.map((item) => (
              <li
                key={item._id}
                className="flex items-center py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={`http://localhost:8080${item.colorVariant.image}`}
                    alt={item.mobile_id.name}
                    fill
                    sizes="100px"
                    className="object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                    quality={100}
                  />
                </div>
                <div className="flex-1 ml-4">
                  <h2 className="text-xl font-semibold">
                    {item.mobile_id.name} - {item.colorVariant.color}
                  </h2>
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
            className={`mt-4 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
              selectedItems.length === 0
                ? "bg-green-300 cursor-not-allowed"
                : "hover:bg-green-600 bg-green-500"
            }`}
          >
            Buy Now
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">Trống</p>
      )}
      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <DialogOverlay />
        <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
          <DialogDescription>
            Hệ thống đang xử lý yêu cầu của bạn.
          </DialogDescription>
          <DialogTitle>Nhập thông tin giao hàng</DialogTitle>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrors((prev) => ({ ...prev, phone: "" })); // Xóa lỗi khi nhập
                }}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Địa chỉ"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setErrors((prev) => ({ ...prev, address: "" })); // Xóa lỗi khi nhập
                }}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirmPurchase}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Xác nhận
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartClient;
