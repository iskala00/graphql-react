import { test, expect, describe } from "bun:test";
import { Kind } from "graphql";
import { gql, createGraphQLTag } from "./index.js";

describe("GraphQL Tag", () => {
  test("should create a DocumentNode-like object", () => {
    const query = gql`
      query GetUser($id: ID!) {
        user(id: $id) {
          id
          name
          email
        }
      }
    `;

    expect(query).toBeDefined();
    expect(query.kind).toBe(Kind.DOCUMENT);
    expect(query.definitions).toEqual([]);
  });

  test("should preserve raw query string", () => {
    const query = gql`
      query GetUser {
        user {
          id
          name
        }
      }
    `;

    expect((query as any).__raw).toContain("query GetUser");
    expect((query as any).__raw).toContain("user");
    expect((query as any).__raw).toContain("id");
    expect((query as any).__raw).toContain("name");
  });

  test("should support template interpolation", () => {
    const fieldName = "email";
    const query = gql`
      query GetUser {
        user {
          id
          name
          ${fieldName}
        }
      }
    `;

    expect((query as any).__raw).toContain("email");
  });

  test("should have toString method", () => {
    const query = gql`
      query GetUser {
        user {
          id
        }
      }
    `;

    expect(query.toString).toBeDefined();
    expect(typeof query.toString).toBe("function");
    if (query.toString) {
      expect(query.toString()).toContain("query GetUser");
    }
  });
});

describe("createGraphQLTag", () => {
  test("should create a configured tag function", () => {
    const customGql = createGraphQLTag({
      stripComments: false,
    });

    const query = customGql`
      # This is a comment
      query GetUser {
        user {
          id
        }
      }
    `;

    expect((query as any).__raw).toContain("# This is a comment");
  });

  test("should strip comments by default", () => {
    const customGql = createGraphQLTag();

    const query = customGql`
      # This is a comment
      query GetUser {
        user {
          id
        }
      }
    `;

    expect((query as any).__raw).not.toContain("# This is a comment");
    expect((query as any).__raw).toContain("query GetUser");
  });

  test("should apply custom transform", () => {
    const customGql = createGraphQLTag({
      transform: (query) => query.toUpperCase(),
    });

    const query = customGql`
      query getUser {
        user {
          id
        }
      }
    `;

    expect((query as any).__raw).toContain("QUERY GETUSER");
    expect((query as any).__raw).toContain("USER");
    expect((query as any).__raw).toContain("ID");
  });
});
