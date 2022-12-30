/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fl.yelpcdn.com",
        pathname: "/**/**",
      },
    ],
  },
};

module.exports = nextConfig;
