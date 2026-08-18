import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        {
          source: '/portfolio/:filename*',
          destination: '/api/media/:filename*',
        },
      ],
      fallback: [
        {
          source: '/portfolio/:filename*',
          destination: '/api/media/:filename*',
        },
      ],
    };
  },
};

export default nextConfig;
