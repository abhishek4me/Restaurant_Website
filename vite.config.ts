import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Restaurant_Website/', // This is the key fix for GitHub Pages
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
