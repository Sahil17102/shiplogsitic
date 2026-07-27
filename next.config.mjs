/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
