import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Restaurant_Website/', // Just the path, not full URL
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

