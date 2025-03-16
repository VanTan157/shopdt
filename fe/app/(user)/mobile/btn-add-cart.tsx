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
import { useState, useRef } from "react";
import { CartCreateType, ProductType } from "../../validate";
import https, { HttpError } from "@/lib/http";
import { toast } from "sonner";
import { useCartStore } from "@/lib/cartStore";
interface Product {
  product: ProductType;
}

const BtnAddCart = ({ product }: Product) => {
  const [quantity, setQuantity] = useState(1);
  const cartIconRef = useRef<HTMLDivElement | null>(null);
  const { incrementCartCount } = useCartStore();

  const handleAddCart = async () => {
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
      console.log(res);
      incrementCartCount(1);
      toast.success("Thêm vào giỏ hàng thành công");

      // Tạo hiệu ứng chuyển động
      const cartIcon = cartIconRef.current;
      if (cartIcon) {
        const clone = cartIcon.cloneNode(true) as HTMLElement;
        clone.style.position = "fixed";
        clone.style.top = `${cartIcon.getBoundingClientRect().top}px`;
        clone.style.left = `${cartIcon.getBoundingClientRect().left}px`;
        clone.style.zIndex = "1000";
        document.body.appendChild(clone);

        const avatarIcon = document.querySelector("#avatar-icon");
        if (avatarIcon) {
          const avatarRect = avatarIcon.getBoundingClientRect();
          clone.style.transition = "all 1s ease";
          clone.style.transform = `translate(${
            avatarRect.left - cartIcon.getBoundingClientRect().left
          }px, ${
            avatarRect.top - cartIcon.getBoundingClientRect().top
          }px) scale(0.1)`;
          clone.style.opacity = "0";

          setTimeout(() => {
            document.body.removeChild(clone);
          }, 1000);
        }
      }
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

  // const handleConfirmPurchase = () => {
  //   console.log({ product, quantity });
  //   setQuantity(1);
  //   handleBuyNow();
  // };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition">
          Thêm vào giỏ hàng
          <div ref={cartIconRef} className="inline-block ml-2">
            <Image
              src={`http://localhost:8080${product.image}`}
              alt={product.name}
              width={24}
              height={24}
              className="object-cover rounded-full"
            />
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Thông tin thêm hàng</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Image
              src={`http://localhost:8080${product.image}`}
              alt={product.name}
              width={64}
              height={64}
              className="object-cover rounded-lg border border-gray-300"
              priority
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
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleAddCart}>
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BtnAddCart;
