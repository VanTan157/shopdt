/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect } from "react";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useUser } from "@/app/UserContext";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { refreshToken } = useUser();

  // Chỉ gọi useRefreshToken nếu refreshToken không phải là undefined
  const { isAuthenticated } =
    refreshToken !== undefined ? useRefreshToken() : { isAuthenticated: false };

  useEffect(() => {}, [isAuthenticated]);

  return <>{children}</>;
}
