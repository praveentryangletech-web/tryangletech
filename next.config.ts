import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },

      {
        source: '/:path*.css',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/media/:filename*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(Taskopia_files|about-assets|service-2-assets|service3-assets|images|fonts|icons)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/portfolio/:file.:ext(webp|png|jpg|jpeg|svg|gif|avif|ico|WEBP|PNG|JPG|JPEG|SVG|GIF|AVIF|ICO)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*/css',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/Taskopia_files/css',
          destination: '/Taskopia_files/fonts.css',
        },
        {
          source: '/service3-assets/css',
          destination: '/service3-assets/fonts.css',
        },
        {
          source: '/Home3_files/css',
          destination: '/Home3_files/fonts.css',
        },
      ],
      afterFiles: [
        {
          source: '/portfolio/:file.:ext(webp|png|jpg|jpeg|svg|gif|avif|ico|WEBP|PNG|JPG|JPEG|SVG|GIF|AVIF|ICO)',
          destination: '/api/media/:file.:ext',
        },
      ],
      fallback: [
        {
          source: '/portfolio/:file.:ext(webp|png|jpg|jpeg|svg|gif|avif|ico|WEBP|PNG|JPG|JPEG|SVG|GIF|AVIF|ICO)',
          destination: '/api/media/:file.:ext',
        },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: '/location/:slug',
        destination: '/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
