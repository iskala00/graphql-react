// Type declarations for .gql and .graphql files
declare module "*.gql" {
  import type { GraphQLDocumentNode } from "graphql-loader";
  const documentNode: GraphQLDocumentNode;
  export default documentNode;
  export { documentNode };
}

declare module "*.graphql" {
  import type { GraphQLDocumentNode } from "graphql-loader";
  const documentNode: GraphQLDocumentNode;
  export default documentNode;
  export { documentNode };
}
