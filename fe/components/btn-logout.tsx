"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const BtnLogout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    console.log("logout");
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message);
        throw new Error(errorData.message || "Đăng xuất thất bại");
      }

      console.log("Đăng xuất thành công!");
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Đăng nhập thất bại"); // Default error message
      }
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default BtnLogout;
