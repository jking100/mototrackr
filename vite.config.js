import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

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
  },
  server: {
    https: {
      key: fs.readFileSync(import.meta.env.VITE_SSL_KEY),
      cert: fs.readFileSync(import.meta.env.VITE_SSL_CERT_FILE)
    },
    host: '0.0.0.0',
    port: 5173
  }
})
