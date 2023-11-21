/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["takealot.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
