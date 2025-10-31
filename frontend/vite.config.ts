import { defineConfig } from 'vite';

// Vite dev server proxy so frontend can call /api/* without CORS.
// During development these requests will be forwarded to the backend on port 3000.
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // keep the path unchanged
        rewrite: (path) => path,
      },
    },
  },
});
