import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // tudo que começar com /api/
        destination: "http://localhost:8000/api/:path*", // redireciona para seu backend
      },
    ];
  },
};

export default nextConfig;