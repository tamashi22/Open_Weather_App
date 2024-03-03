import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import sass from "sass";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      images: path.resolve(__dirname, "./src/assets/images"),
      icons: path.resolve(__dirname, "./src/assets/icons"),
      components: `${path.resolve(__dirname, "./src/components/")}`,
      ui: `${path.resolve(__dirname, "./src/components/ui")}`,
    },
  },
});
