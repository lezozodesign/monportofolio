// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { env } from 'node:process';

// https://vite.dev/config/
export default defineConfig({
  base: env.GITHUB_ACTIONS === 'true' ? '/monportofolio/' : '/',
  plugins: [react()],
  server: {
    port: 5173,          // <‑‑ le port que nous voulons absolument utiliser
    strictPort: true,    // échoue si le port n’est pas disponible (au lieu de basculer)
  },
});