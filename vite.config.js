// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,          // <‑‑ le port que nous voulons absolument utiliser
    strictPort: true,    // échoue si le port n’est pas disponible (au lieu de basculer)
  },
});