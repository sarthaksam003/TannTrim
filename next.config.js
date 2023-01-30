/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    loader: "akamai",
    path: "",
  },
  optimizeFonts: false,
};

module.exports = nextConfig;
