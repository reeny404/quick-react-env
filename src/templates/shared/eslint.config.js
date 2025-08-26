import prettierConfig from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import sortImports from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist/**/*', 'node_modules/**/*', 'src/ui/**/*']),
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
            ['^@/(.*)$'],
            ['^\\.|\\.\\.'],
            ['^.+\\.?(css|scss|sass)$'],
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
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],

      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-undef': 'error',
      'no-unused-vars': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-const-assign': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-alert': 'error',
    },
  },
  {
    files: ['src/api/**/*.ts'],
    languageOptions: {
      globals: {
        RequestInit: 'readonly',
      },
    },
  },
  {
    files: [
      'src/components/elements/**/*.tsx',
      'src/components/modules/**/*.tsx',
      'src/components/layout/**/*.tsx',
      'src/pages/**/*.tsx',
      'src/App.tsx',
      'src/main.tsx',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@radix-ui/*'],
              message:
                'Radix UI 컴포넌트는 @/components/ui에서만 import할 수 있습니다.',
            },
          ],
        },
      ],
    },
  },
]);
