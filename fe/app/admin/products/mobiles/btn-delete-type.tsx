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
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"; // Giả sử bạn dùng Dialog từ thư viện Shadcn/UI
import { Button } from "@/components/ui/button";
import { useState } from "react";
import https, { HttpError } from "@/lib/http";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MobileTType } from "@/app/validate";

const BtnDeleteType = ({ types }: { types: MobileTType[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<string | undefined>();
  const router = useRouter();
  const handleSubmit = async () => {
    console.log(type);
    try {
      const res = await https.delete(`mobile-types/${type}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(res);
      toast.success("Xóa thành công");
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.message);
      } else toast.error("Lỗi không xác định");
    }
  };
  const handleExit = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
          Xóa loại sản phẩm
        </Button>
      </DialogTrigger>
      <DialogContent
        style={{ width: "70vw", maxWidth: "none", maxHeight: "90vh" }}
        className="overflow-y-auto p-8 text-xl"
      >
        <DialogHeader>
          <DialogTitle className="text-xl">Xóa loại sản phẩm mới</DialogTitle>
          <DialogDescription className="text-lg">
            Chọn loại sản phẩm bạn muốn xóa,{" "}
            <span className="text-red-500">
              Vui lòng xóa mọi sản phẩm thuộc loại sản phẩm này trước khi xóa
            </span>
          </DialogDescription>
        </DialogHeader>

        <Select onValueChange={(value) => setType(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn loại sản phẩm muốn xóa" />
          </SelectTrigger>
          <SelectContent>
            {types?.map((type) => (
              <SelectItem key={type._id} value={type._id}>
                {type.type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
            Xóa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BtnDeleteType;
