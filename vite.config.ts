/// <reference types="vitest"/>

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// mas facil simular un dom que un navegador
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom'
  }
})
