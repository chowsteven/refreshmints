/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'api.reservoir.tools',
      'i.seadn.io',
      'lh3.googleusercontent.com',
      'openseauserdata.com',
    ],
  },
};

module.exports = nextConfig;
