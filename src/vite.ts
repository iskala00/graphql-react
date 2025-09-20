// Vite plugin interface
interface VitePlugin {
  name: string;
  transform?(code: string, id: string): { code: string; map: null } | null;
}

/**
 * Vite plugin for GraphQL template literals
 */
export function graphqlPlugin(): VitePlugin {
  return {
    name: "graphql",
    transform(code: string, id: string) {
      // Only process TypeScript/JavaScript files
      if (!/\.(tsx?|jsx?)$/.test(id)) {
        return null;
      }

      // Look for gql template literals
      const gqlRegex = /gql`([^`]+)`/g;
      let hasGraphQL = false;

      const transformedCode = code.replace(
        gqlRegex,
        (match: string, query: string) => {
          hasGraphQL = true;
          // Clean up the query
          const cleanQuery = query
            .replace(/\s+/g, " ")
            .replace(/\n/g, " ")
            .trim();

          // Return the same structure but with cleaned query
          return `gql\`${cleanQuery}\``;
        }
      );

      if (hasGraphQL) {
        return {
          code: transformedCode,
          map: null,
        };
      }

      return null;
    },
  };
}

export default graphqlPlugin;
