/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Игнорировать ошибки TypeScript при сборке
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Игнорировать ошибки ESLint при сборке
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Оптимизация изображений (опционально)
  images: {
    domains: ['georgianbakery.com.ua'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
  