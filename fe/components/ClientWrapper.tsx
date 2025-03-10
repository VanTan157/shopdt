"use client";

import { useEffect } from "react";
import useRefreshToken from "@/hooks/useRefreshToken";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useRefreshToken();

  // Log để debug (tùy chọn)
  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

  return <>{children}</>;
}
