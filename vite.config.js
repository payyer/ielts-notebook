import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Absolute base so assets load correctly on nested URLs like /lesson/list-1
  base: '/',
});
