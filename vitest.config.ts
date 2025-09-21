import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig({ command: 'serve', mode: 'test', isSsrBuild: false }),
  defineConfig({
    test: {
      environment: 'jsdom',
      silent: true,
      setupFiles: './src/tests/setup.ts',
      coverage: {
        provider: 'v8',
        reporter: ['html', 'text'],
        thresholds: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        exclude: [
          './src/routes.ts',
          './src/tests/setupTests.{js,ts}',
          './src/**/*.d.ts',
          './src/app/entry.client.tsx',
          './src/app/entry.server.tsx',
        ],
      },
      globals: true,
    },
  })
);
