import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  images: {
    domains: ["192.168.0.106"], // Cho phép tải ảnh từ localhost
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.0.106:8080/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
