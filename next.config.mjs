/** @type {import('next').NextConfig} */
const nextConfig = {
  /* =========================
     Core
  ========================= */
  reactStrictMode: true,
  reactCompiler: true,

  swcMinify: true,
  compress: true,
  poweredByHeader: false,

  /* =========================
     Output / Hosting
     (для VPS, Docker, Node)
  ========================= */
  output: "standalone",

  /* =========================
     Images
  ========================= */
  images: {
    unoptimized: false,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "gruzynskavypichka.com",
        pathname: "/public/**",
      },
    ],
  },

  /* =========================
     Experimental
  ========================= */
  experimental: {
    optimizePackageImports: [
      "formik",
      "yup",
      "lodash",
    ],
  },

  /* =========================
     Headers (security + SEO)
  ========================= */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' https: data:; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'",
          },
        ],
      },
    ];
  },

  /* =========================
     Logging
  ========================= */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;

