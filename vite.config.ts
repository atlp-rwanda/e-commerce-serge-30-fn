/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
    globals: true,
    include: ['tests/**/*.test.{js,ts,jsx,tsx}', 'tests/**/*.spec.{js,ts,jsx,tsx}'],
    coverage: {
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      provider: 'v8',
      reporter: ['text', 'lcov']
    },
  },
})
