// next.config.js with Turbopack configuration
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.{gql,graphql}": {
          loaders: ["graphql-loader/loader"],
          as: "*.ts",
        },
      },
    },
  },
};

module.exports = nextConfig;
