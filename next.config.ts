import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://prueba-kohl-phi-76.vercel.app/api/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
      },
    ],
  },
};

export default nextConfig;