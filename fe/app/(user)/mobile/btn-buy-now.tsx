"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { CartCreateType, ProductType } from "../../validate";
import https, { HttpError } from "@/lib/http";
import { toast } from "sonner";

interface Product {
  product: ProductType;
}

const BtnBuyNow = ({ product }: Product) => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleBuyNow = async () => {
    try {
      const res = await https.post<CartCreateType>(
        "/order-items",
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
        { product_id: product._id, quantity }
      );
      const orderitem_ids = [res._id];
      console.log(orderitem_ids);
      await https.post(
        `/order`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
        {
          orderitem_ids: [res._id],
          address,
          phone_number: phone,
        }
      );
      toast.success("Đặt hàng thành công");
    } catch (error) {
      if (error instanceof HttpError) {
        console.log("Error:", error.status);
        if (error.status === 401) {
          toast.error("Vui lòng đăng nhập để mua hàng");
        }
      } else {
        console.log("Lỗi không xác định");
      }
    }
  };

  const handleConfirmPurchase = () => {
    console.log({ product, quantity, address, phone });
    setQuantity(1);
    setAddress("");
    setPhone("");
    handleBuyNow();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Mua ngay
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Thông tin mua hàng</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Image
              src={`http://localhost:8080${product.image}`}
              alt={product.name}
              width={64}
              height={64}
              className="object-cover rounded-lg border border-gray-300"
            />
            <div>
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-gray-600">
                Giá: {product.finalPrice.toLocaleString()} VND
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số lượng
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Địa chỉ
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập địa chỉ nhận hàng"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập số điện thoại"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmPurchase}>
            Xác nhận mua
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BtnBuyNow;
