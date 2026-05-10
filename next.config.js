const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    silenceDeprecations: ["import"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "hermanoscars.com", pathname: "/wp-content/uploads/**" },
      { protocol: "https", hostname: "backend.hermanoscars.com", pathname: "/wp-content/uploads/**" },
    ],
  },
  async rewrites() {
    return [
      { source: "/cart/:path*", destination: "https://backend.hermanoscars.com/cart/:path*" },
      { source: "/checkout/:path*", destination: "https://backend.hermanoscars.com/checkout/:path*" },
      { source: "/wp-admin/:path*", destination: "https://backend.hermanoscars.com/wp-admin/:path*" },
      { source: "/wp-json/:path*", destination: "https://backend.hermanoscars.com/wp-json/:path*" },
      { source: "/wp-login.php", destination: "https://backend.hermanoscars.com/wp-login.php" },
      { source: "/my-account/:path*", destination: "https://backend.hermanoscars.com/my-account/:path*" },
    ];
  },
};
module.exports = withNextIntl(nextConfig);
