/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 1000,

  images: {
    domains: ['dl.airtable.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  transpilePackages: ['crypto-js'],
};

module.exports = nextConfig;
