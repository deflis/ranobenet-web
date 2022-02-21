const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  pwa: {
    runtimeCaching,
  },
};

module.exports = withPWA(nextConfig);
