import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    loader: "src/loader.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  target: "esnext",
  platform: "neutral",
  treeshake: true,
  splitting: false,
  bundle: true,
  external: ["graphql"],
  onSuccess: "cp types/graphql.d.ts dist/graphql.d.ts",
});
