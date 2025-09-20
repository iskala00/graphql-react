import type { DocumentNode } from "graphql";
import { Kind } from "graphql";
import type { GraphQLDocumentNode, GraphQLTagOptions } from "./types.js";

/**
 * GraphQL template literal tag
 * Supports Vite, Next.js (webpack), and Turbopack
 */
export function gql(
  strings: TemplateStringsArray,
  ...values: readonly any[]
): GraphQLDocumentNode {
  // Combine template strings and values
  let query = strings[0];
  for (let i = 0; i < values.length; i++) {
    query += String(values[i]) + strings[i + 1];
  }

  // Create a DocumentNode-like object
  const documentNode: GraphQLDocumentNode = {
    kind: Kind.DOCUMENT,
    definitions: [],
    loc: undefined,
  };

  // Add the raw query string for bundler processing
  // This allows bundlers to detect and transform GraphQL queries
  Object.defineProperty(documentNode, "__raw", {
    value: query?.trim() || "",
    enumerable: false,
    writable: false,
  });

  // Add a toString method for debugging
  Object.defineProperty(documentNode, "toString", {
    value: () => query?.trim() || "",
    enumerable: false,
    writable: false,
  });

  return documentNode;
}

/**
 * Create a configured GraphQL tag with options
 */
export function createGraphQLTag(options: GraphQLTagOptions = {}) {
  const { stripComments = true, transform } = options;

  return function configuredGql(
    strings: TemplateStringsArray,
    ...values: readonly any[]
  ): GraphQLDocumentNode {
    // Combine template strings and values
    let query = strings[0];
    for (let i = 0; i < values.length; i++) {
      query += String(values[i]) + strings[i + 1];
    }

    // Strip comments if enabled
    if (stripComments && query) {
      query = query.replace(/#[^\n\r]*/g, "");
    }

    // Apply custom transform if provided
    if (transform && query) {
      query = transform(query);
    }

    // Create DocumentNode
    const documentNode: GraphQLDocumentNode = {
      kind: Kind.DOCUMENT,
      definitions: [],
      loc: undefined,
    };

    // Add metadata
    Object.defineProperty(documentNode, "__raw", {
      value: query?.trim() || "",
      enumerable: false,
      writable: false,
    });

    Object.defineProperty(documentNode, "toString", {
      value: () => query?.trim() || "",
      enumerable: false,
      writable: false,
    });

    return documentNode;
  };
}

// Default export for convenience
export default gql;

// Re-export types and utilities
export type { DocumentNode } from "graphql";
export type {
  GraphQLDocumentNode,
  GraphQLTag,
  GraphQLTagOptions,
} from "./types.js";
export { graphqlPlugin } from "./vite.js";
export { withGraphQL } from "./webpack.js";
