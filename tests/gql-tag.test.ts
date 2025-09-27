import { gql, createGraphQLTag } from "../src/index";
import { Kind } from "graphql";

describe("gql template literal tag", () => {
  it("should create a DocumentNode from GraphQL string", () => {
    const query = gql`
      query GetUser($id: ID!) {
        user(id: $id) {
          id
          name
        }
      }
    `;

    expect(query).toBeDefined();
    expect(query.kind).toBe(Kind.DOCUMENT);
    // Наша gql функция создает mock DocumentNode для bundler'ов
    // В runtime она будет заменена на настоящий parsed DocumentNode
    expect(query.definitions).toEqual([]);
    expect(query.toString).toBeDefined();
  });

  it("should handle variables in template literals", () => {
    const userFields = "id name email";
    const query = gql`
      query GetUser {
        user {
          ${userFields}
        }
      }
    `;

    expect(query).toBeDefined();
    expect(query.kind).toBe(Kind.DOCUMENT);
  });

  it("should create custom GraphQL tag with options", () => {
    const customGql = createGraphQLTag({
      stripComments: true,
      transform: (query) => query.replace(/\s+/g, " ").trim(),
    });

    const query = customGql`
      # This is a comment
      query GetUser {
        user {
          id
          name
        }
      }
    `;

    expect(query).toBeDefined();
    expect(query.kind).toBe(Kind.DOCUMENT);
  });

  it("should handle empty GraphQL string", () => {
    expect(() => {
      gql``;
    }).not.toThrow();
  });
});
