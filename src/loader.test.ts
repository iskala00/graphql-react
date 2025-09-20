import { test, expect, describe } from "bun:test";
import graphqlFileLoader, { advancedGraphqlLoader } from "./loader.js";

describe("GraphQL File Loader", () => {
  test("should transform GraphQL query into JavaScript module", () => {
    const source = `
      query GetUser($id: ID!) {
        user(id: $id) {
          id
          name
          email
        }
      }
    `;

    const result = graphqlFileLoader(source);

    expect(result).toContain('import { Kind } from "graphql"');
    expect(result).toContain("kind: Kind.DOCUMENT");
    expect(result).toContain("export default documentNode");
    expect(result).toContain("export { documentNode }");
    expect(result).toContain("GetUser");
  });

  test("should handle mutations", () => {
    const source = `
      mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          id
          success
        }
      }
    `;

    const result = graphqlFileLoader(source);

    expect(result).toContain("CreateUser");
    expect(result).toContain("mutation");
  });
});
