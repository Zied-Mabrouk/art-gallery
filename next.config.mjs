/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'lh3.ggpht.com',
      },
      {
        hostname: 'lh4.ggpht.com',
      },
      {
        hostname: 'lh5.ggpht.com',
      },
      {
        protocol: 'https',
        hostname: '*.ggpht.com',
      },
    ],
  },
};

export default nextConfig;
