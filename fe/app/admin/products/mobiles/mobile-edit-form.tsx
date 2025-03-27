import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MobileType } from "@/lib/validate/mobile";
import Image from "next/image";
import { useState } from "react";

interface MobileEditProps {
  mobile: MobileType;
  onConfirm: (updatedMobile: MobileType) => void;
  onCancel: () => void;
}

const MobileEditForm = ({ mobile, onConfirm, onCancel }: MobileEditProps) => {
  const [editMobile, setEditMobile] = useState<MobileType>(mobile);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Hàm kiểm tra validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Kiểm tra các trường cơ bản
    if (!editMobile.name || editMobile.name.trim() === "") {
      newErrors.name = "Tên sản phẩm không được để trống";
    }

    if (!editMobile.StartingPrice || isNaN(editMobile.StartingPrice)) {
      newErrors.StartingPrice = "Giá khởi điểm phải là một số hợp lệ";
    } else if (editMobile.StartingPrice <= 0) {
      newErrors.StartingPrice = "Giá khởi điểm phải lớn hơn 0";
    }

    if (!editMobile.weight || isNaN(editMobile.weight)) {
      newErrors.weight = "Trọng lượng phải là một số hợp lệ";
    } else if (editMobile.weight <= 0) {
      newErrors.weight = "Trọng lượng phải lớn hơn 0";
    }
    if (
      editMobile.promotion &&
      (isNaN(editMobile.promotion) || editMobile.promotion < 0)
    ) {
      newErrors.promotion = "Khuyến mãi phải là một số không âm";
    }

    if (!editMobile.description || editMobile.description.trim() === "") {
      newErrors.description = "Mô tả không được để trống";
    }

    // Kiểm tra camera
    if (!editMobile.camera?.front || editMobile.camera.front.trim() === "") {
      newErrors.cameraFront = "Camera trước không được để trống";
    }
    if (!editMobile.camera?.rear || editMobile.camera.rear.trim() === "") {
      newErrors.cameraRear = "Camera sau không được để trống";
    }

    // Kiểm tra colorVariants
    editMobile.colorVariants.forEach((variant, index) => {
      if (!variant.color || variant.color.trim() === "") {
        newErrors[`color-${index}`] = "Tên màu không được để trống";
      }
      if (isNaN(variant.stock) || variant.stock < 0) {
        newErrors[`stock-${index}`] = "Số lượng phải là một số không âm";
      }
      if (!variant.image) {
        newErrors[`image-${index}`] = "Hình ảnh không được để trống";
      }
    });

    // Kiểm tra specifications
    if (
      !editMobile.specifications?.cpu ||
      editMobile.specifications.cpu.trim() === ""
    ) {
      newErrors.cpu = "CPU không được để trống";
    }
    if (
      !editMobile.specifications?.ram ||
      isNaN(editMobile.specifications.ram)
    ) {
      newErrors.ram = "RAM phải là một số hợp lệ";
    }
    if (
      !editMobile.specifications?.storage ||
      isNaN(editMobile.specifications.storage)
    ) {
      newErrors.storage = "Bộ nhớ phải là một số hợp lệ";
    }
    if (
      !editMobile.specifications?.battery ||
      isNaN(editMobile.specifications.battery)
    ) {
      newErrors.battery = "Pin phải là một số hợp lệ";
    }
    if (
      !editMobile.specifications?.screenSize ||
      isNaN(editMobile.specifications.screenSize)
    ) {
      newErrors.screenSize = "Kích thước màn hình phải là một số hợp lệ";
    }
    if (
      !editMobile.specifications?.resolution ||
      editMobile.specifications.resolution.trim() === ""
    ) {
      newErrors.resolution = "Độ phân giải không được để trống";
    }
    if (
      !editMobile.specifications?.os ||
      editMobile.specifications.os.trim() === ""
    ) {
      newErrors.os = "Hệ điều hành không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

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
          i === index ? { ...variant, image: file } : variant
        ),
      });
      // Xóa lỗi image nếu có
      setErrors((prev) => ({ ...prev, [`image-${index}`]: "" }));
    }
  };

  const handleAddColorVariant = () => {
    setEditMobile({
      ...editMobile,
      colorVariants: [
        ...editMobile.colorVariants,
        { _id: "", color: "", stock: 0, image: "" },
      ],
    });
  };

  const handleConfirm = () => {
    if (validateForm()) {
      onConfirm(editMobile);
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
                  onChange={(e) => {
                    setEditMobile({ ...editMobile, name: e.target.value });
                    setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="StartingPrice" className="mb-2">
                  Giá khởi điểm
                </Label>
                <Input
                  id="StartingPrice"
                  name="StartingPrice"
                  type="text"
                  value={editMobile?.StartingPrice || ""}
                  onChange={(e) => {
                    setEditMobile({
                      ...editMobile,
                      StartingPrice: parseFloat(e.target.value) || 0,
                    });
                    setErrors((prev) => ({ ...prev, StartingPrice: "" }));
                  }}
                />
                {errors.StartingPrice && (
                  <p className="text-red-500 text-sm">{errors.StartingPrice}</p>
                )}
              </div>
              <div>
                <Label htmlFor="promotion" className="mb-2">
                  Khuyến mãi (%)
                </Label>
                <Input
                  id="promotion"
                  name="promotion"
                  type="text"
                  value={editMobile?.promotion || ""}
                  onChange={(e) => {
                    setEditMobile({
                      ...editMobile,
                      promotion: parseFloat(e.target.value) || 0,
                    });
                    setErrors((prev) => ({ ...prev, promotion: "" }));
                  }}
                />
                {errors.promotion && (
                  <p className="text-red-500 text-sm">{errors.promotion}</p>
                )}
              </div>
              <div>
                <Label htmlFor="description" className="mb-2">
                  Mô tả
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editMobile?.description || ""}
                  onChange={(e) => {
                    setEditMobile({
                      ...editMobile,
                      description: e.target.value,
                    });
                    setErrors((prev) => ({ ...prev, description: "" }));
                  }}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>
              <div>
                <Label htmlFor="weight" className="mb-2">
                  Trọng lượng
                </Label>
                <Input
                  id="weight"
                  name="weight"
                  type="text"
                  value={editMobile?.weight || ""}
                  onChange={(e) => {
                    setEditMobile({
                      ...editMobile,
                      weight: parseFloat(e.target.value) || 0,
                    });
                    setErrors((prev) => ({ ...prev, weight: "" }));
                  }}
                />
                {errors.weight && (
                  <p className="text-red-500 text-sm">{errors.weight}</p>
                )}
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
                  onChange={(e) => {
                    setEditMobile({
                      ...editMobile,
                      camera: { ...editMobile.camera, front: e.target.value },
                    });
                    setErrors((prev) => ({ ...prev, cameraFront: "" }));
                  }}
                />
                {errors.cameraFront && (
                  <p className="text-red-500 text-sm">{errors.cameraFront}</p>
                )}
              </div>
              <div>
                <Label htmlFor="cameraRear" className="mb-2">
                  Camera sau
                </Label>
                <Input
                  id="cameraRear"
                  value={editMobile?.camera?.rear || ""}
                  onChange={(e) => {
                    setEditMobile({
                      ...editMobile,
                      camera: { ...editMobile.camera, rear: e.target.value },
                    });
                    setErrors((prev) => ({ ...prev, cameraRear: "" }));
                  }}
                />
                {errors.cameraRear && (
                  <p className="text-red-500 text-sm">{errors.cameraRear}</p>
                )}
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
                  key={variant?._id || index}
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
                      onChange={(e) => {
                        setEditMobile({
                          ...editMobile,
                          colorVariants: editMobile.colorVariants.map((v, i) =>
                            i === index ? { ...v, color: e.target.value } : v
                          ),
                        });
                        setErrors((prev) => ({
                          ...prev,
                          [`color-${index}`]: "",
                        }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors[`color-${index}`] && (
                      <p className="text-red-500 text-sm">
                        {errors[`color-${index}`]}
                      </p>
                    )}
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
                      type="text"
                      value={variant?.stock}
                      onChange={(e) => {
                        setEditMobile({
                          ...editMobile,
                          colorVariants: editMobile.colorVariants.map((v, i) =>
                            i === index
                              ? { ...v, stock: parseFloat(e.target.value) || 0 }
                              : v
                          ),
                        });
                        setErrors((prev) => ({
                          ...prev,
                          [`stock-${index}`]: "",
                        }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors[`stock-${index}`] && (
                      <p className="text-red-500 text-sm">
                        {errors[`stock-${index}`]}
                      </p>
                    )}
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
                    {previewImages[index] ? (
                      <Image
                        src={previewImages[index]}
                        alt={variant.color || `Màu ${index}`}
                        width={60}
                        height={60}
                        quality={100}
                        className="mt-2 rounded-md border border-gray-200"
                      />
                    ) : typeof variant?.image === "string" ? (
                      <Image
                        src={`http://localhost:8080${variant?.image}`}
                        alt={variant.color || `Màu ${index}`}
                        width={60}
                        height={60}
                        quality={100}
                        priority
                        unoptimized
                        className="mt-2 rounded-md border border-gray-200"
                      />
                    ) : null}
                    {errors[`image-${index}`] && (
                      <p className="text-red-500 text-sm">
                        {errors[`image-${index}`]}
                      </p>
                    )}
                  </div>
                  {editMobile.colorVariants.length > 1 && (
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
                  )}
                </div>
              ))}
              <Button
                onClick={handleAddColorVariant}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
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
                  onChange={(e) => {
                    setEditMobile({
                      ...editMobile,
                      specifications: {
                        ...editMobile.specifications,
                        cpu: e.target.value,
                      },
                    });
                    setErrors((prev) => ({ ...prev, cpu: "" }));
                  }}
                />
                {errors.cpu && (
                  <p className="text-red-500 text-sm">{errors.cpu}</p>
                )}
              </div>
              <div>
                <Label className="mb-2" htmlFor="ram">
                  RAM
                </Label>
                <Input
                  id="ram"
                  type="text"
                  value={editMobile?.specifications?.ram || ""}
                  onChange={(e) => {
                    setEditMobile({
                      ...editMobile,
                      specifications: {
                        ...editMobile.specifications,
                        ram: parseFloat(e.target.value) || 0,
                      },
                    });
                    setErrors((prev) => ({ ...prev, ram: "" }));
                  }}
                />
                {errors.ram && (
                  <p className="text-red-500 text-sm">{errors.ram}</p>
                )}
              </div>
              <div>
                <Label className="mb-2" htmlFor="storage">
                  Bộ nhớ
                </Label>
                <Input
                  id="storage"
                  type="text"
                  value={editMobile?.specifications?.storage || ""}
                  onChange={(e) => {
                    setEditMobile({
                      ...editMobile,
                      specifications: {
                        ...editMobile.specifications,
                        storage: parseFloat(e.target.value) || 0,
                      },
                    });
                    setErrors((prev) => ({ ...prev, storage: "" }));
                  }}
                />
                {errors.storage && (
                  <p className="text-red-500 text-sm">{errors.storage}</p>
                )}
              </div>
              <div>
                <Label className="mb-2" htmlFor="battery">
                  Pin
                </Label>
                <Input
                  id="battery"
                  type="text"
                  value={editMobile?.specifications?.battery || ""}
                  onChange={(e) => {
                    setEditMobile({
                      ...editMobile,
                      specifications: {
                        ...editMobile.specifications,
                        battery: parseFloat(e.target.value) || 0,
                      },
                    });
                    setErrors((prev) => ({ ...prev, battery: "" }));
                  }}
                />
                {errors.battery && (
                  <p className="text-red-500 text-sm">{errors.battery}</p>
                )}
              </div>
              <div>
                <Label className="mb-2" htmlFor="screenSize">
                  Kích thước màn hình
                </Label>
                <Input
                  id="screenSize"
                  type="text"
                  value={editMobile?.specifications?.screenSize || ""}
                  onChange={(e) => {
                    setEditMobile({
                      ...editMobile,
                      specifications: {
                        ...editMobile.specifications,
                        screenSize: parseFloat(e.target.value) || 0,
                      },
                    });
                    setErrors((prev) => ({ ...prev, screenSize: "" }));
                  }}
                />
                {errors.screenSize && (
                  <p className="text-red-500 text-sm">{errors.screenSize}</p>
                )}
              </div>
              <div>
                <Label className="mb-2" htmlFor="resolution">
                  Độ phân giải
                </Label>
                <Input
                  id="resolution"
                  value={editMobile?.specifications?.resolution || ""}
                  onChange={(e) => {
                    setEditMobile({
                      ...editMobile,
                      specifications: {
                        ...editMobile.specifications,
                        resolution: e.target.value,
                      },
                    });
                    setErrors((prev) => ({ ...prev, resolution: "" }));
                  }}
                />
                {errors.resolution && (
                  <p className="text-red-500 text-sm">{errors.resolution}</p>
                )}
              </div>
              <div>
                <Label className="mb-2" htmlFor="os">
                  Hệ điều hành
                </Label>
                <Input
                  id="os"
                  value={editMobile?.specifications?.os || ""}
                  onChange={(e) => {
                    setEditMobile({
                      ...editMobile,
                      specifications: {
                        ...editMobile.specifications,
                        os: e.target.value,
                      },
                    });
                    setErrors((prev) => ({ ...prev, os: "" }));
                  }}
                />
                {errors.os && (
                  <p className="text-red-500 text-sm">{errors.os}</p>
                )}
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
        <Button onClick={handleConfirm}>Xác nhận</Button>
      </div>
    </>
  );
};

export default MobileEditForm;
