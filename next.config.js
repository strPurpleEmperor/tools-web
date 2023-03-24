/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: process.env.BASE_PATH,
  assetPrefix: process.env.BASE_URL,
};

module.exports = nextConfig;
