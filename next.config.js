/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'tailwindui.com',
    ],
  },
};

module.exports = nextConfig;
