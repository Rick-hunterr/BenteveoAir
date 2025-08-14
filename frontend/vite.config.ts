import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// Carga la variable de entorno VITE_API_URL
//Por si uno lee esto lo que hice fue crear una env para no tener que estar cambiando la URL del backend
//cada vez que quiero probar algo en local o en produccion
//Si no existe, usa http://localhost:10000 como valor por defecto (la URL del backend en local)
const API_URL = process.env.VITE_API_URL || "http://localhost:10000";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      // esto es ssolo para desarrollo local
      "/api": {
        target: API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    allowedHosts: ["033fcfca19db.ngrok-free.app"], //Temporal
  },
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify(API_URL),
  },
});
