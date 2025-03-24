"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";
import https from "@/lib/http";
import { toast } from "sonner";

const BtnAdd = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<"USER" | "ADMIN">("USER");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const newUser = {
        name,
        email,
        password,
        type,
      };

      const response = await https.post(
        `/users`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          type: newUser.type,
        }
      );
      console.log(response);
      router.refresh();
      toast.success("Lưu người dùng thành công");

      setName(""); // Reset form sau khi thêm thành công
      setEmail("");
      setPassword("");
      setType("USER");
      setIsOpen(false); // Đóng dialog
    } catch (error) {
      setIsOpen(true);
      if (error instanceof Error) {
        toast.error(error.message);
      } else toast.error("Lỗi không xác định");
    }
  };

  // Hàm reset form khi nhấn Hủy
  const handleCancel = () => {
    setName("");
    setEmail("");
    setPassword("");
    setType("USER");
    setIsOpen(false); // Đóng dialog
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
          Thêm người dùng
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Thêm người dùng mới</AlertDialogTitle>
          <AlertDialogDescription>
            Điền thông tin để thêm một người dùng mới vào hệ thống.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          {/* Trường Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Tên
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
              placeholder="Nhập tên người dùng"
            />
          </div>

          {/* Trường Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              placeholder="Nhập email"
              type="email"
            />
          </div>

          {/* Trường Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Mật khẩu
            </label>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              placeholder="Nhập mật khẩu"
              type="password"
            />
          </div>

          {/* Trường Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium">
              Loại tài khoản
            </label>
            <Select
              value={type}
              onValueChange={(value: "USER" | "ADMIN") => setType(value)}
            >
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
          <AlertDialogCancel onClick={handleCancel}>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Thêm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BtnAdd;
