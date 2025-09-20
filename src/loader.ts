import { parse } from "graphql";
import type { GraphQLDocumentNode } from "./types.js";

/**
 * Turbopack/Webpack loader for .gql and .graphql files
 * Transforms GraphQL files into JavaScript modules that export a DocumentNode
 */
export default function graphqlFileLoader(source: string): string {
  // Clean up the GraphQL source
  const cleanedSource = source.trim().replace(/\r\n/g, "\n"); // Normalize line endings

  try {
    // Parse the GraphQL to validate and get AST
    const parsed = parse(cleanedSource);

    // Generate the JavaScript module that exports the parsed DocumentNode
    const moduleCode = `
import { parse } from "graphql";

const documentNode = parse(${JSON.stringify(cleanedSource)});

export default documentNode;
export { documentNode };
`.trim();

    return moduleCode;
  } catch (error) {
    // If parsing fails, throw a helpful error
    throw new Error(
      `GraphQL parsing error in file: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Alternative loader that preserves more GraphQL structure
 * Can be used for more advanced GraphQL processing
 */
export function advancedGraphqlLoader(source: string): string {
  const cleanedSource = source.trim();

  // Try to detect query type
  const queryType =
    cleanedSource
      .match(/^\s*(query|mutation|subscription|fragment)/i)?.[1]
      ?.toLowerCase() || "query";

  const moduleCode = `
import { Kind } from "graphql";

const documentNode = {
  kind: Kind.DOCUMENT,
  definitions: [],
  loc: undefined,
  __raw: ${JSON.stringify(cleanedSource)},
  __queryType: ${JSON.stringify(queryType)},
  toString: () => ${JSON.stringify(cleanedSource)},
};

// Add query type information
Object.defineProperty(documentNode, '__queryType', {
  value: ${JSON.stringify(queryType)},
  enumerable: false,
  writable: false,
});

export default documentNode;
export { documentNode };
`.trim();

  return moduleCode;
}

// Export types for TypeScript support
export type { GraphQLDocumentNode } from "./types.js";
