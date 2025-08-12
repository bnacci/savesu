import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    laravel({
      input: 'resources/js/app.tsx',
      ssr: 'resources/js/ssr.tsx',
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@typed': path.resolve(__dirname, 'resources/js/types.ts'),
      '@lib': path.resolve(__dirname, 'resources/js/lib'),
      '@components': path.resolve(__dirname, 'resources/js/components'),
      '@hooks': path.resolve(__dirname, 'resources/js/hooks'),
      '@layouts': path.resolve(__dirname, 'resources/js/layouts'),
      '@pages': path.resolve(__dirname, 'resources/js/pages'),
    },
  },
});
