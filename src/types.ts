import type { DocumentNode } from "graphql";

/**
 * Extended DocumentNode with additional properties for bundler support
 */
export interface GraphQLDocumentNode extends DocumentNode {
  __raw?: string;
  toString?(): string;
}

/**
 * GraphQL template literal tag function type
 */
export interface GraphQLTag {
  (
    strings: TemplateStringsArray,
    ...values: readonly any[]
  ): GraphQLDocumentNode;
}

/**
 * Options for GraphQL tag configuration
 */
export interface GraphQLTagOptions {
  /**
   * Whether to include source location information
   * @default false
   */
  includeLocation?: boolean;

  /**
   * Whether to strip comments from the query
   * @default true
   */
  stripComments?: boolean;

  /**
   * Custom transformer function for the query string
   */
  transform?: (query: string) => string;
}
