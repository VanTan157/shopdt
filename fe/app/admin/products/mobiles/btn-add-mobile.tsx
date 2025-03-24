"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MobileTType, MobileType } from "@/lib/validate/mobile";
import Image from "next/image";
import { useState } from "react";

const BtnAddMobile = ({ type }: { type: MobileTType[] }) => {
  const [editMobile, setEditMobile] = useState<MobileType>({
    _id: "",
    name: "",
    StartingPrice: 0,
    promotion: 0,
    finalPrice: 0,
    IsPromotion: false,
    isAvailable: true,
    mobile_type_id: { _id: "", type: "" },
    colorVariants: [],
    specifications: {
      cpu: "",
      ram: 0,
      storage: 0,
      battery: 0,
      screenSize: 0,
      resolution: "",
      os: "",
    },
    tags: [],
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      const newPreviewImages = [...previewImages];
      newPreviewImages[index] = previewUrl;
      setPreviewImages(newPreviewImages);

      setEditMobile({
        ...editMobile,
        colorVariants: editMobile.colorVariants.map((variant, i) =>
          i === index
            ? { ...variant, image: file as unknown as string | File }
            : variant
        ),
      });
    }
  };

  // Hàm thêm một colorVariant mới
  const handleAddColorVariant = () => {
    setEditMobile({
      ...editMobile,
      colorVariants: [
        ...editMobile.colorVariants,
        { _id: "", color: "", stock: 0, image: "" }, // Thêm một variant mới với giá trị mặc định
      ],
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
          Tạo sản phẩm
        </DialogTrigger>
        <DialogContent
          style={{ width: "80vw", maxWidth: "none", maxHeight: "90vh" }}
          className="overflow-auto"
        >
          <DialogHeader>
            <DialogTitle>Thêm sản phẩm mới</DialogTitle>
            <DialogDescription>
              Nhập đầy đủ các thông tin của sản phẩm
            </DialogDescription>
          </DialogHeader>

          {/* Các trường thông tin cơ bản */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="mb-2">
                Tên
              </Label>
              <Input
                id="name"
                name="name"
                value={editMobile?.name}
                onChange={(e) =>
                  setEditMobile({
                    ...editMobile,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="StartingPrice" className="mb-2">
                Giá khởi điểm
              </Label>
              <Input
                id="StartingPrice"
                name="StartingPrice"
                type="number"
                value={editMobile?.StartingPrice || ""}
                onChange={(e) =>
                  setEditMobile({
                    ...editMobile,
                    StartingPrice: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="promotion" className="mb-2">
                Khuyến mãi (%)
              </Label>
              <Input
                id="promotion"
                name="promotion"
                type="number"
                value={editMobile?.promotion || ""}
                onChange={(e) =>
                  setEditMobile({
                    ...editMobile,
                    promotion: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="description" className="mb-2">
                Mô tả
              </Label>
              <Input
                id="description"
                name="description"
                value={editMobile?.description || ""}
                onChange={(e) =>
                  setEditMobile({
                    ...editMobile,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div>
            <Label className="mb-2">Loại</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {type.map((t) => (
                  <SelectItem key={t._id} value={t._id}>
                    {t.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Camera */}
          <div className="space-y-2">
            <div>
              <Label htmlFor="cameraFront" className="mb-2">
                Camera trước
              </Label>
              <Input
                id="cameraFront"
                value={editMobile?.camera?.front || ""}
                onChange={(e) =>
                  setEditMobile({
                    ...editMobile,
                    camera: {
                      ...editMobile.camera,
                      front: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="cameraRear" className="mb-2">
                Camera sau
              </Label>
              <Input
                id="cameraRear"
                value={editMobile?.camera?.rear || ""}
                onChange={(e) =>
                  setEditMobile({
                    ...editMobile,
                    camera: {
                      ...editMobile.camera,
                      rear: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          {/* Color Variants */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            {editMobile?.colorVariants?.map((variant, index) => (
              <div
                key={index} // Sử dụng index làm key vì đây là form mới, không có _id
                className="flex items-center gap-4 p-4 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <Label
                    htmlFor={`color-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tên màu
                  </Label>
                  <Input
                    id={`color-${index}`}
                    value={variant?.color || ""}
                    onChange={(e) =>
                      setEditMobile({
                        ...editMobile,
                        colorVariants: editMobile.colorVariants.map((v, i) =>
                          i === index ? { ...v, color: e.target.value } : v
                        ),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <Label
                    htmlFor={`stock-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Số lượng
                  </Label>
                  <Input
                    id={`stock-${index}`}
                    type="number"
                    value={variant?.stock || ""}
                    onChange={(e) =>
                      setEditMobile({
                        ...editMobile,
                        colorVariants: editMobile.colorVariants.map((v, i) =>
                          i === index
                            ? { ...v, stock: parseFloat(e.target.value) || 0 }
                            : v
                        ),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <Label
                    htmlFor={`image-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Hình ảnh
                  </Label>
                  <Input
                    id={`image-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                  {previewImages[index] && (
                    <Image
                      src={previewImages[index]}
                      alt={variant.color || `Màu ${index}`}
                      width={60}
                      height={60}
                      quality={100}
                      className="mt-2 rounded-md border border-gray-200"
                    />
                  )}
                </div>
                <Button
                  variant="destructive"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  onClick={() =>
                    setEditMobile({
                      ...editMobile,
                      colorVariants: editMobile.colorVariants.filter(
                        (_, i) => i !== index
                      ),
                    })
                  }
                >
                  Xóa
                </Button>
              </div>
            ))}
            <Button
              onClick={handleAddColorVariant}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Thêm màu mới
            </Button>
          </div>

          {/* Specifications */}
          <div className="space-y-2">
            <div>
              <Label className="mb-2" htmlFor="cpu">
                CPU
              </Label>
              <Input
                id="cpu"
                value={editMobile?.specifications?.cpu || ""}
                onChange={(e) =>
                  setEditMobile({
                    ...editMobile,
                    specifications: {
                      ...editMobile.specifications,
                      cpu: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="ram">
                RAM
              </Label>
              <Input
                id="ram"
                type="number"
                value={editMobile?.specifications?.ram || ""}
                onChange={(e) =>
                  setEditMobile({
                    ...editMobile,
                    specifications: {
                      ...editMobile.specifications,
                      ram: parseFloat(e.target.value) || 0,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="storage">
                Bộ nhớ
              </Label>
              <Input
                id="storage"
                type="number"
                value={editMobile?.specifications?.storage || ""}
                onChange={(e) =>
                  setEditMobile({
                    ...editMobile,
                    specifications: {
                      ...editMobile.specifications,
                      storage: parseFloat(e.target.value) || 0,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="battery">
                Pin
              </Label>
              <Input
                id="battery"
                type="number"
                value={editMobile?.specifications?.battery || ""}
                onChange={(e) =>
                  setEditMobile({
                    ...editMobile,
                    specifications: {
                      ...editMobile.specifications,
                      battery: parseFloat(e.target.value) || 0,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="screenSize">
                Kích thước màn hình
              </Label>
              <Input
                id="screenSize"
                type="number"
                value={editMobile?.specifications?.screenSize || ""}
                onChange={(e) =>
                  setEditMobile({
                    ...editMobile,
                    specifications: {
                      ...editMobile.specifications,
                      screenSize: parseFloat(e.target.value) || 0, // Sửa lỗi từ battery thành screenSize
                    },
                  })
                }
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="resolution">
                Độ phân giải
              </Label>
              <Input
                id="resolution"
                value={editMobile?.specifications?.resolution || ""}
                onChange={(e) =>
                  setEditMobile({
                    ...editMobile,
                    specifications: {
                      ...editMobile.specifications,
                      resolution: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="os">
                Hệ điều hành
              </Label>
              <Input
                id="os"
                value={editMobile?.specifications?.os || ""}
                onChange={(e) =>
                  setEditMobile({
                    ...editMobile,
                    specifications: {
                      ...editMobile.specifications,
                      os: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            {editMobile?.tags?.map((tag, index) => (
              <Input
                key={index}
                value={tag}
                onChange={(e) =>
                  setEditMobile({
                    ...editMobile,
                    tags: editMobile.tags.map((t, i) =>
                      i === index ? e.target.value : t
                    ),
                  })
                }
              />
            ))}
          </div>

          {/* Nút Hủy và Xác nhận */}
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline">Hủy</Button>
            <Button>Xác nhận</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BtnAddMobile;
