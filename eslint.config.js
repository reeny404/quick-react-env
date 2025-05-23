import prettierConfig from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import sortImports from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist/**/*', 'node_modules/**/*']),
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettierConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    plugins: { sortImports },
    settings: {
      react: {
        version: '19.0.10',
      },
    },
    rules: {
      'sortImports/exports': 'error',
      'sortImports/imports': [
        'error',
        {
          groups: [
            ['^react$', '^react-', '^[^@./][^/]*$'],
            ['^@?\\w', '^@/(.*)$', '^\\.|\\.\\.'],
            ['^.+\\.?(css)$'],
          ],
        },
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-undef': 'error',
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': 'error',

      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],

      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-undef': 'error',
      'no-unused-vars': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-const-assign': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-alert': 'error',
      'no-await-in-loop': 'error',
    },
  },
]);
