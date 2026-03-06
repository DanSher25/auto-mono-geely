import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  base: "./",

  plugins: [

  ],

  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,

    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
      },
      output: {
        entryFileNames: "scripts/main.min.js",
        chunkFileNames: "scripts/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "";
          if (name.endsWith(".css")) return "css/style.min.css";
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(name)) return "images/[name][extname]";
          if (/\.(woff2?|ttf|otf|eot)$/i.test(name)) return "fonts/[name][extname]";
          return "assets/[name][extname]";
        },
      },
    },
  },
});
