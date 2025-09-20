// Example of using .gql and .graphql files with the loader
// This would work after configuring Turbopack/webpack

// Import GraphQL files directly
// import GetUser from "./queries/GetUser.gql";
// import CreateUser from "./queries/CreateUser.graphql";
// import UserFragment from "./queries/UserFragment.gql";

// For now, let's simulate what the loader would generate
import { Kind } from "graphql";
import type { GraphQLDocumentNode } from "../src/types.js";

// Simulated output from GetUser.gql
const GetUser: GraphQLDocumentNode = {
  kind: Kind.DOCUMENT,
  definitions: [],
  loc: undefined,
  __raw: "query GetUser($id: ID!) { user(id: $id) { id name email avatar } }",
  toString: () =>
    "query GetUser($id: ID!) { user(id: $id) { id name email avatar } }",
};

// Simulated output from CreateUser.graphql
const CreateUser: GraphQLDocumentNode = {
  kind: Kind.DOCUMENT,
  definitions: [],
  loc: undefined,
  __raw:
    "mutation CreateUser($input: CreateUserInput!) { createUser(input: $input) { id name email success } }",
  toString: () =>
    "mutation CreateUser($input: CreateUserInput!) { createUser(input: $input) { id name email success } }",
};

// Usage examples
console.log("GetUser query:", GetUser.toString?.());
console.log("CreateUser mutation:", CreateUser.toString?.());
console.log(
  "Both have __raw property:",
  "__raw" in GetUser && "__raw" in CreateUser
);

// Use with GraphQL clients
// const result = await client.query({ query: GetUser, variables: { id: '1' } });
// const mutation = await client.mutate({ mutation: CreateUser, variables: { input: {...} } });

export { GetUser, CreateUser };
