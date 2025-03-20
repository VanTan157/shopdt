"use client";

import { useState } from "react";
import { MobileTType, MobileType } from "@/app/validate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import https from "@/lib/http";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MobileFormData {
  name: string;
  StartingPrice: string;
  promotion: string;
  description: string;
  mobile_type_id: string;
  image?: File | string | null; // Hỗ trợ cả File (khi upload mới) và string (ảnh hiện tại)
}

const BtnEditMobile = ({
  mobile,
  type,
}: {
  mobile: MobileType;
  type: MobileTType[];
}) => {
  console.log(mobile);
  const [formData, setFormData] = useState<MobileFormData>({
    name: mobile.name,
    StartingPrice: mobile.StartingPrice.toString(), // Chuyển số thành chuỗi để hiển thị
    promotion: mobile.promotion.toString(), // Chuyển số thành chuỗi
    description: mobile.description,
    mobile_type_id: mobile?.mobile_type_id?._id,
    image: mobile.image,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(
    `http://localhost:8080${mobile.image}`
  ); // Hiển thị ảnh hiện tại làm preview
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  console.log(formData.image);
  // Danh sách mobile types (giả sử bạn lấy từ API, cần truyền vào hoặc fetch)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, image: mobile.image }));
      setPreviewImage(mobile.image);
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, mobile_type_id: value }));
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("StartingPrice", formData.StartingPrice);
      data.append("promotion", formData.promotion);
      data.append("description", formData.description);
      data.append("mobile_type_id", formData.mobile_type_id);
      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }

      const response = await https.patch(
        `/mobiles/${mobile._id}`,
        {
          credentials: "include",
        },
        data
      );

      console.log(response);

      toast.success("Cập nhật sản phẩm thành công");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Lỗi không xác định");
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      name: mobile.name,
      StartingPrice: mobile.StartingPrice.toString(),
      promotion: mobile.promotion.toString(),
      description: mobile.description,
      mobile_type_id: mobile.mobile_type_id._id,
      image: mobile.image,
    });
    setPreviewImage(mobile.image);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">
          Sửa sản phẩm
        </Button>
      </DialogTrigger>
      <DialogContent
        style={{ width: "70vw", maxWidth: "none", maxHeight: "90vh" }}
        className="overflow-y-auto p-8 text-xl"
      >
        <DialogHeader>
          <DialogTitle className="text-xl">Sửa sản phẩm</DialogTitle>
          <DialogDescription className="text-lg">
            Cập nhật thông tin của sản phẩm mobile.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="pb-2">
              Tên sản phẩm
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nhập tên sản phẩm"
              className="p-2"
            />
          </div>

          <div>
            <Label htmlFor="StartingPrice" className="pb-2">
              Giá khởi điểm
            </Label>
            <Input
              id="StartingPrice"
              name="StartingPrice"
              value={formData.StartingPrice}
              onChange={handleInputChange}
              placeholder="Nhập giá khởi điểm (VNĐ)"
              type="number"
              className="p-2"
            />
          </div>

          <div>
            <Label htmlFor="promotion" className="pb-2">
              Khuyến mãi (%)
            </Label>
            <Input
              id="promotion"
              name="promotion"
              value={formData.promotion}
              onChange={handleInputChange}
              placeholder="Nhập % khuyến mãi (mặc định 0)"
              type="number"
              className="p-2"
            />
          </div>

          <div>
            <Label htmlFor="description" className="pb-2">
              Mô tả
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả sản phẩm"
              className="p-2"
            />
          </div>

          <div>
            <Label htmlFor="mobile_type_id" className="pb-2">
              Loại sản phẩm
            </Label>
            <Select
              value={formData.mobile_type_id}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="p-2">
                <SelectValue placeholder="Chọn loại sản phẩm" />
              </SelectTrigger>
              <SelectContent>
                {type.map((mobileType) => (
                  <SelectItem key={mobileType._id} value={mobileType._id}>
                    {mobileType.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="image" className="pb-2">
              Hình ảnh
            </Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              onChange={handleFileChange}
              className="p-2"
            />
            {previewImage && (
              <div className="mt-2">
                <Label>Xem trước ảnh:</Label>
                <div className="relative w-24 h-24">
                  <Image
                    src={previewImage}
                    alt="Preview"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button
            onClick={handleCancel}
            className="h-8 px-4 bg-gray-500 hover:bg-gray-600"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            className="h-8 px-4 bg-blue-500 hover:bg-blue-600"
          >
            Cập nhật
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BtnEditMobile;
