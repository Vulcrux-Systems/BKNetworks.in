import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "randomuser.me" },
    ],
  },
};

export default nextConfig;
