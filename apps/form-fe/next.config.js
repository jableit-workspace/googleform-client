/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@repo/ui', '@repo/utils', 'lucide-react', 'react-hook-form'],
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  productionBrowserSourceMaps: false,
  cleanDistDir: true,
  swcMinify: true,
  experimental: {
    esmExternals: true,
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  pageExtensions: ['tsx', 'ts'],
};
