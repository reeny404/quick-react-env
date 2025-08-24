import { ProjectConfig } from '../types.js';

export function getESLintConfig(config: ProjectConfig) {
  const vite = `import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
${config.usePrettier ? `import prettier from 'eslint-plugin-prettier';` : ''}

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      ${config.usePrettier ? "'prettier': prettier," : ''}
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      ${config.usePrettier ? "'prettier/prettier': 'error'," : ''}
    },
  },
];`;

  const next = `{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "@typescript-eslint/recommended"
  ],
  "plugins": [
    "simple-import-sort"
    ${config.usePrettier ? ',\n    "prettier"' : ''}
  ],
  "rules": {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
    ${config.usePrettier ? ',\n    "prettier/prettier": "error"' : ''}
  }
}`;

  return { vite, next };
}
