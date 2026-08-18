import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/portfolio/:filename*',
        destination: '/api/media/:filename*',
      },
    ];
  },
};

export default nextConfig;
