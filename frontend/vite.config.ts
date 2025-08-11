import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    // allowedHosts: ["c0dea736e7ce.ngrok-free.app"], Utilice ngrok para probar el redireccionamiento a nuestro sitio web
  },
});
