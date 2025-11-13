/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;
