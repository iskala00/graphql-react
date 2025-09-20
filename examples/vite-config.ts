import { defineConfig } from "vite";
import { graphqlPlugin } from "../src/index.js";

export default defineConfig({
  plugins: [
    graphqlPlugin(),
    // Другие плагины...
  ],
  build: {
    lib: {
      entry: "src/main.ts",
      name: "MyLib",
      formats: ["es"],
    },
  },
});
