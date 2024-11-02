const nextConfig = {
  reactStrictMode: false,
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);