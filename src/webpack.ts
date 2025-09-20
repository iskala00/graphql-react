/**
 * Webpack loader for GraphQL template literals
 * Compatible with Next.js and Turbopack
 */

interface WebpackLoaderContext {
  callback: (error: Error | null, content?: string, sourceMap?: any) => void;
  async: () => (error: Error | null, content?: string, sourceMap?: any) => void;
  resourcePath: string;
}

/**
 * Webpack loader function
 */
export default function graphqlLoader(
  this: WebpackLoaderContext,
  source: string
) {
  const callback = this.async();

  try {
    // Only process files that might contain GraphQL
    if (!/gql`/.test(source)) {
      return callback(null, source);
    }

    // Transform GraphQL template literals
    const transformedSource = source.replace(
      /gql`([^`]+)`/g,
      (match, query) => {
        // Clean up the query
        const cleanQuery = query
          .replace(/\s+/g, " ")
          .replace(/\n/g, " ")
          .trim();

        return `gql\`${cleanQuery}\``;
      }
    );

    callback(null, transformedSource);
  } catch (error) {
    callback(error as Error);
  }
}

/**
 * Next.js webpack configuration helper
 */
export function withGraphQL(nextConfig: any = {}) {
  return {
    ...nextConfig,
    webpack: (config: any, options: any) => {
      // Add GraphQL loader for template literals
      config.module.rules.push({
        test: /\.(tsx?|jsx?)$/,
        use: {
          loader: require.resolve("./webpack.js"),
        },
        exclude: /node_modules/,
      });

      // Add GraphQL file loader for .gql and .graphql files
      config.module.rules.push({
        test: /\.(gql|graphql)$/,
        use: {
          loader: require.resolve("./loader.js"),
        },
        exclude: /node_modules/,
      });

      // Call the original webpack function if it exists
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  };
}
