/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      enabled: true,
    },
  },
  // 明確禁用 Turbopack
  turbo: false,
}

module.exports = nextConfig