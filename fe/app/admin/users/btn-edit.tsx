"use client";

import { useState } from "react";
import { AccountType } from "@/app/validate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import https from "@/lib/http";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const BtnEdit = ({ user }: { user: AccountType }) => {
  const [name, setName] = useState(user.name);
  const [type, setType] = useState(user.type);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const updatedUser = {
        _id: user._id,
        name,
        type,
      };
      console.log(updatedUser);
      const response = await https.patch(
        `/users/${updatedUser._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          name: updatedUser.name,
          type: updatedUser.type,
        }
      );
      console.log(response);
      router.refresh();
      toast.success("Lưu người dùng thành công");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else toast.error("Lỗi không xác định");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
          Edit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Chỉnh sửa thông tin người dùng</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có thể chỉnh sửa tên và loại tài khoản. Email và mật khẩu không
            thể thay đổi.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Tên
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              value={user.email}
              disabled
              className="mt-1 bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Mật khẩu
            </label>
            <Input
              id="password"
              value="********"
              disabled
              className="mt-1 bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium">
              Loại tài khoản
            </label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Chọn loại tài khoản" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Lưu</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BtnEdit;
