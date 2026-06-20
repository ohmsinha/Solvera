/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.70.191'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
