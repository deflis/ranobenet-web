const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // PWA
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  // MDX
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  env: {
    baseUrl: 'https://api.ranobe.net',
  },
};

module.exports = withPWA(withMDX(nextConfig));
