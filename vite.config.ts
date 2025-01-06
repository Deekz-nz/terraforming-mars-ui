import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',      
    port: Number(process.env.PORT) || 4173,  // Convert PORT to a number
    strictPort: true
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 4173,  // Convert PORT to a number
    strictPort: true
  }
});
