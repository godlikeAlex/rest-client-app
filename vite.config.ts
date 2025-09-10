import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig(({ isSsrBuild }) => ({
  build: {
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
  ],
}));
