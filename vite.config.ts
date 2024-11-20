import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const projectRootDir = resolve(__dirname, "src");

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      { find: "$assets", replacement: resolve(projectRootDir, "assets") },
      {
        find: "$components",
        replacement: resolve(projectRootDir, "components"),
      },
      { find: "$constants", replacement: resolve(projectRootDir, "constants") },
      { find: "$domain", replacement: resolve(projectRootDir, "domain") },
      { find: "$slices", replacement: resolve(projectRootDir, "store/slices") },
      { find: "$store", replacement: resolve(__dirname, "src/store") },
      { find: "$hooks", replacement: resolve(projectRootDir, "hooks") },
      { find: "$types", replacement: resolve(projectRootDir, "types") },
      { find: "$utils", replacement: resolve(projectRootDir, "utils") },
      { find: "$views", replacement: resolve(projectRootDir, "views") },
    ],
    dedupe: ["@mui/material", "@emotion/react"],
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
  },
});
