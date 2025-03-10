import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost"], // Cho phép tải ảnh từ localhost
  },
};

export default nextConfig;
