/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [],
  test: {
    include: ["**/*.test.ts"],
    globals: true,
    environment: "node", // And not jsdom : the frontend logic is separated from React
  }, 
});
