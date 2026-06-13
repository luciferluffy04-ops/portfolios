/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Next.js 15 renamed this from experimental.serverComponentsExternalPackages
  serverExternalPackages: ['pdf-parse', 'mammoth'],
}

module.exports = nextConfig
