const { withGraphQL } = require("../dist/index.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      // Turbopack configuration
    },
  },
};

module.exports = withGraphQL(nextConfig);
