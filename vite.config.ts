import { defineConfig } from "vite";
import path from "path";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({ eslint: { lintCommand: "eslint src" }, overlay: false }),
  ],
  resolve: {
    alias: {
      src: path.resolve("src/"),
      "@soaltee-loyalty": path.resolve("src"),
      "@soaltee-loyalty/assets": path.resolve("src/assets"),
      "@soaltee-loyalty/schema": path.resolve("src/schema"),
      "@soaltee-loyalty/constant": path.resolve("src/constant"),
      "@soaltee-loyalty/hooks": path.resolve("src/hooks"),
      "@soaltee-loyalty/components": path.resolve("src/components"),
      "@soaltee-loyalty/pages": path.resolve("src/pages"),
      "@soaltee-loyalty/providers": path.resolve("src/providers"),
      "@soaltee-loyalty/routes": path.resolve("src/routes"),
      "@soaltee-loyalty/service": path.resolve("src/service"),
      "@soaltee-loyalty/theme": path.resolve("src/theme"),
      "@soaltee-loyalty/translations": path.resolve("src/translations"),
      "@soaltee-loyalty/interface": path.resolve("src/interface"),
      "@soaltee-loyalty/utility": path.resolve("src/utility"),
    },
  },
});
