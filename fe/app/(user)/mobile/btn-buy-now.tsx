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
import https, { HttpError } from "@/lib/http";
import { ColorVariantType, MobileType } from "@/lib/validate/mobile";
import OrderApi from "@/lib/api/mobile/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const BtnBuyNow = ({
  product,
  colorVariants,
}: {
  product: MobileType;
  colorVariants: ColorVariantType;
}) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [quantityError, setQuantityError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const validateInputs = () => {
    let isValid = true;

    if (quantity < 1) {
      setQuantityError("Số lượng phải lớn hơn hoặc bằng 1");
      isValid = false;
    } else if (!Number.isInteger(quantity)) {
      setQuantityError("Số lượng phải là số nguyên");
      isValid = false;
    } else {
      setQuantityError(null);
    }

    if (!address.trim()) {
      setAddressError("Địa chỉ không được để trống");
      isValid = false;
    } else if (address.length < 5) {
      setAddressError("Địa chỉ phải có ít nhất 5 ký tự");
      isValid = false;
    } else {
      setAddressError(null);
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phone.trim()) {
      setPhoneError("Số điện thoại không được để trống");
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      setPhoneError("Số điện thoại phải là 10 chữ số");
      isValid = false;
    } else {
      setPhoneError(null);
    }

    return isValid;
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
    validateInputs();
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
    validateInputs();
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    validateInputs();
  };

  const handleBuyNow = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!validateInputs()) {
      event.preventDefault(); // Ngăn dialog đóng khi validation thất bại
      return;
    }

    try {
      const res = await OrderApi.addToCart({
        product,
        quantity,
        colorVariants,
      });
      console.log(res);
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
          colorVariant: {
            _id: colorVariants._id,
            color: colorVariants.color,
            image: colorVariants.image,
          },
        }
      );
      router.refresh();
      toast.success("Đặt hàng thành công");
      setQuantity(1);
      setAddress("");
      setPhone("");
      setQuantityError(null);
      setAddressError(null);
      setPhoneError(null);
      // Dialog sẽ đóng tự động khi thành công
    } catch (error) {
      event.preventDefault(); // Ngăn dialog đóng khi có lỗi API
      if (error instanceof HttpError) {
        console.log("Error:", error.status);
        if (error.status === 401) {
          setQuantityError("Vui lòng đăng nhập để mua hàng");
        }
      } else {
        console.log("Lỗi không xác định");
      }
    }
  };

  const handleConfirmPurchase = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    handleBuyNow(event);
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
              src={`http://localhost:8080${colorVariants.image}`}
              alt={product.name}
              width={64}
              height={64}
              className="object-cover rounded-lg border border-gray-300"
            />
            <div>
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-gray-600">{colorVariants.color}</p>
              <p className="">Giá: {product.finalPrice.toLocaleString()} VND</p>
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
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {quantityError && (
              <p className="text-red-500 text-sm mt-1">{quantityError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Địa chỉ
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập địa chỉ nhận hàng"
              required
            />
            {addressError && (
              <p className="text-red-500 text-sm mt-1">{addressError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập số điện thoại"
            />
            {phoneError && (
              <p className="text-red-500 text-sm mt-1">{phoneError}</p>
            )}
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
