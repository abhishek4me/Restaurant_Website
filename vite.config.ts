import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: 'https://abhishek4me.github.io/Restaurant_Website/', // Full URL
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
