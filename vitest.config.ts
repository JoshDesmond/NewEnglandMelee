/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => ({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['src/test/**/*'],
    },
    // Load all environment variables from .env files
    env: loadEnv(mode, process.cwd(), ''),
  },
})); 