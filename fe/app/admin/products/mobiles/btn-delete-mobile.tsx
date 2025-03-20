"use client";

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

const BtnDeleteMobile = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    console.log(id);
    try {
      const res = await https.delete(`mobiles/${id}`, {
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
        <Button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
          Xóa sản phẩm
        </Button>
      </DialogTrigger>
      <DialogContent
        style={{ width: "70vw", maxWidth: "none", maxHeight: "90vh" }}
        className="overflow-y-auto p-8 text-xl"
      >
        <DialogHeader>
          <DialogTitle className="text-xl">Xóa sản phẩm</DialogTitle>
          <DialogDescription className="text-lg">
            Bạn có chắc chắn muốn xóa sản phẩm này, sau khi xóa sản phẩm này sẽ
            mất vĩnh viễn!!!
          </DialogDescription>
        </DialogHeader>
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

export default BtnDeleteMobile;
