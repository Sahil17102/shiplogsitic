/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
