/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.reservoir.tools'],
  },
};

module.exports = nextConfig;
