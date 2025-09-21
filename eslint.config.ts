import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';

import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';

import vitest from '@vitest/eslint-plugin';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'],
      jsxA11y.flatConfigs.recommended,
      reactHooks.configs['recommended-latest'],
    ],
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    extends: [
      jestDom.configs['flat/recommended'],
      testingLibrary.configs['flat/react'],
      vitest.configs.all,
    ],
  },
  globalIgnores(['server/**/*', '.react-router/**/*', '.netlify/**/*']),
]);
