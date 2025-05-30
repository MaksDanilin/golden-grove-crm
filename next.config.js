/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  experimental: {
    externalDir: true,
  },
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com'],
    unoptimized: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
