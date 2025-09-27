import { graphqlPlugin } from "../src/vite";

describe("Vite GraphQL Plugin", () => {
  const plugin = graphqlPlugin();

  it("should create plugin with correct name", () => {
    expect(plugin.name).toBe("graphql");
    expect(plugin.resolveId).toBeDefined();
    expect(plugin.load).toBeDefined();
    expect(plugin.transform).toBeDefined();
  });

  it("should resolve .gql and .graphql files", () => {
    if (plugin.resolveId) {
      expect(plugin.resolveId("test.gql")).toBe("test.gql");
      expect(plugin.resolveId("test.graphql")).toBe("test.graphql");
      expect(plugin.resolveId("test.js")).toBe(null);
    }
  });

  it("should return null from load function", () => {
    if (plugin.load) {
      expect(plugin.load("test.gql")).toBe(null);
      expect(plugin.load("test.graphql")).toBe(null);
    }
  });

  it("should transform GraphQL content to JavaScript", () => {
    const graphqlContent = `
      query GetUser {
        user {
          id
          name
        }
      }
    `;

    if (plugin.transform) {
      const result = plugin.transform(graphqlContent, "test.gql");

      expect(result).toBeDefined();
      if (result) {
        expect(result.code).toContain('import { parse } from "graphql"');
        expect(result.code).toContain("const documentNode = parse(");
        expect(result.code).toContain("export default documentNode");
        expect(result.code).toContain("export { documentNode }");
        expect(result.map).toBe(null);
      }
    }
  });

  it("should handle plugin options", () => {
    const pluginWithOptions = graphqlPlugin({
      validate: false,
      stripComments: false,
    });

    expect(pluginWithOptions.name).toBe("graphql");
  });

  it("should not transform non-GraphQL files", () => {
    if (plugin.transform) {
      const result = plugin.transform("const x = 1;", "test.js");
      expect(result).toBe(null);
    }
  });
});
