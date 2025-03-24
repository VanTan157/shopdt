import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MobileType } from "@/lib/validate/mobile";
import Image from "next/image";
import { useState } from "react";

interface MobileEditProps {
  mobile: MobileType;
  onConfirm: (updatedMobile: MobileType) => void;
  onCancel: () => void;
}

const MobileEditForm = ({ mobile, onConfirm, onCancel }: MobileEditProps) => {
  console.log(mobile);

  const [editMobile, setEditMobile] = useState<MobileType>(mobile);

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

      // Lưu file thực tế vào state thay vì chỉ tên
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

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="basic">
          <AccordionTrigger>Thông tin cơ bản</AccordionTrigger>
          <AccordionContent>
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
                    setEditMobile({ ...editMobile, name: e.target.value })
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="camera">
          <AccordionTrigger>Camera</AccordionTrigger>
          <AccordionContent>
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
                      camera: { ...editMobile.camera, front: e.target.value },
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
                      camera: { ...editMobile.camera, rear: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colorVariants">
          <AccordionTrigger>Màu sắc</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              {editMobile?.colorVariants?.map((variant, index) => (
                <div
                  key={variant?._id}
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
                      value={variant?.color}
                      onChange={(e) =>
                        setEditMobile({
                          ...editMobile,
                          colorVariants: editMobile.colorVariants.map(
                            (variant, i) =>
                              i === index
                                ? { ...variant, color: e.target.value }
                                : variant
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
                      value={variant?.stock}
                      onChange={(e) =>
                        setEditMobile({
                          ...editMobile,
                          colorVariants: editMobile.colorVariants.map(
                            (variant, i) =>
                              i === index
                                ? {
                                    ...variant,
                                    stock: parseFloat(e.target.value),
                                  }
                                : variant
                          ),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <Label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor={`image-${index}`}
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
                    {previewImages[index] ? (
                      <Image
                        src={previewImages[index]}
                        alt={variant.color}
                        width={60}
                        height={60}
                        quality={100}
                        className="mt-2 rounded-md border border-gray-200"
                      />
                    ) : typeof variant?.image === "string" ? (
                      <Image
                        src={`http://localhost:8080${variant?.image}`}
                        alt={variant.color}
                        width={60}
                        height={60}
                        quality={100}
                        priority
                        unoptimized
                        className="mt-2 rounded-md border border-gray-200"
                      />
                    ) : null}
                  </div>
                  <Button
                    variant="destructive"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Xóa
                  </Button>
                </div>
              ))}
              <Button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Thêm màu mới
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="specifications">
          <AccordionTrigger>Thông số kỹ thuật</AccordionTrigger>
          <AccordionContent>
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
                        ram: parseFloat(e.target.value),
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
                        storage: parseFloat(e.target.value),
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
                        battery: parseFloat(e.target.value),
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
                        battery: parseFloat(e.target.value),
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tags">
          <AccordionTrigger>Thẻ</AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button onClick={() => onConfirm(editMobile)}>Xác nhận</Button>
      </div>
    </>
  );
};

export default MobileEditForm;
