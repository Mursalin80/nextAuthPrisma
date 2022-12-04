/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  sw: 'sw.js',
  // scope: '/app',
});

const nextConfig = withPWA({
  reactStrictMode: true,

  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'tailwindui.com',
    ],
  },
});

module.exports = nextConfig;
