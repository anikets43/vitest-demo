/// <reference types="vitest" />

import angular from "@analogjs/vite-plugin-angular";

import { defineConfig } from "vite";
import { resolve } from "path";

const commonStylesLocation = resolve(__dirname, "src/assets");

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      angular({
        inlineStylesExtension: "scss",
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: ["node_modules/", "src/assets"],
        },
      },
    },
    // resolve: {
    //   alias: {
    //     "variables": `${commonStylesLocation}/_variables.scss`
    //   },
    // },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["src/test-setup.ts"],
      include: ["**/*.spec.ts"],
      reporters: ["default"],
      // Vitest browser config
      browser: {
        enabled: true,
        name: "chromium",
        headless: true, // set to true in CI
        provider: "playwright",
      },
    },
    define: {
      "import.meta.vitest": mode !== "production",
    },
  };
});
