import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all requests starting with /api to backend
      '/api': {
        target: 'http://localhost:5000', // Your backend
        changeOrigin: true,               // Needed to modify origin header
        // Do NOT rewrite if your backend routes start with /api
        // rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
});
