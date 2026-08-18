import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        {
          source: '/portfolio/:file(.+\\.(?:webp|png|jpg|jpeg|svg|gif|avif))',
          destination: '/api/media/:file',
        },
      ],
    };
  },
};

export default nextConfig;
