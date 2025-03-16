"use client";

import ReqApi from "@/lib/ResApi";
import { useEffect, useState } from "react";

const useRefreshToken = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Hàm gọi API refresh token
  const refreshToken = async () => {
    try {
      await ReqApi.refreshToken();
      setIsAuthenticated(true); // Xác nhận vẫn đăng nhập
    } catch (error) {
      console.error("Lỗi refresh token:", error);
      setIsAuthenticated(false); // Đăng xuất nếu refresh thất bại
    }
  };

  useEffect(() => {
    // Refresh ngay khi mount để kiểm tra trạng thái ban đầu
    refreshToken();
    // Refresh định kỳ mỗi 14 phút (trước khi accessToken hết hạn 15 phút)
    const interval = setInterval(() => {
      refreshToken();
    }, 14 * 60 * 1000); // 14 phút = 840000ms
    return () => clearInterval(interval);
  }, []);

  return { isAuthenticated, refreshToken };
};

export default useRefreshToken;
