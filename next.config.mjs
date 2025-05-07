/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/rag',
        destination: process.env.MEDRAG_BACKEND_URL || 'http://localhost:8000/rag',
      },
    ];
  },
};

export default nextConfig;
