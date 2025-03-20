"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"; // Giả sử bạn dùng Dialog từ thư viện Shadcn/UI
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import https, { HttpError } from "@/lib/http";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const BtnAddType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    console.log(type);
    try {
      const res = await https.post(
        "mobile-types",
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
        { type }
      );
      console.log(res);
      toast.success("Thêm thành công");
      router.refresh();
      setIsOpen(false);
      setType("");
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.message);
      } else toast.error("Lỗi không xác định");
    }
  };
  const handleExit = () => {
    setType("");
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
          Thêm loại sản phẩm
        </Button>
      </DialogTrigger>
      <DialogContent
        style={{ width: "70vw", maxWidth: "none", maxHeight: "90vh" }}
        className="overflow-y-auto p-8 text-xl"
      >
        <DialogHeader>
          <DialogTitle className="text-xl">Thêm loại sản phẩm mới</DialogTitle>
          <DialogDescription className="text-lg">
            Điền thông tin để thêm một loại sản phẩm mới vào hệ thống.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="pb-2">
              Tên
            </Label>
            <Input
              id="name"
              name="name"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Nhập tên"
              className="p-2"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button
            onClick={handleExit}
            className="h-8 px-4  bg-gray-500 hover:bg-gray-600"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            className="h-8 px-4  bg-blue-500 hover:bg-blue-600"
          >
            Thêm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BtnAddType;
