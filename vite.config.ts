import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import removeConsole from 'vite-plugin-remove-console';

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: isSsrBuild
      ? {
          input: './server/app.ts',
        }
      : undefined,
  },

  plugins: [
    // NEED FOR CODE GEN LIB
    nodePolyfills({
      include: ['util', 'querystring'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
    !process.env.VITEST && reactRouter(),
    tsconfigPaths(),
    removeConsole(),
  ],
}));
