import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// Carga la variable de entorno VITE_API_URL
// Por si uno lee esto: se usa para no tener que cambiar la URL del backend
// cada vez que probás en local o producción.
// Si no existe, usa http://localhost:10000 como valor por defecto (backend local)

// URL del backend en producción (Render) o local
const API_URL = process.env.VITE_API_URL || "http://localhost:10000";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    allowedHosts: ["7289ba75b98d.ngrok-free.app"], // temporal 
    //allowedHosts: ["0.0.0.0"], // permite accesos desde túneles o hosts locales
  },
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify(API_URL),
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
        admin: "src/pages/admin/admin.html",
        carrito: "src/pages/cart/carrito.html",
        ayuda: "src/pages/help/ayuda.html",
        paquete: "src/pages/packages/paquete.html",
        emailVerificado: "email-verificado.html"
      },
    },
  },
});