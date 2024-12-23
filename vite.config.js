import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

//needed to fix definition error for __dirname
//https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
