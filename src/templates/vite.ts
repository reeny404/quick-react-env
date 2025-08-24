import { ProjectConfig } from '../types.js';

export function getViteTemplate(config: ProjectConfig) {
  const packageJson = {
    name: config.projectName,
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "tsc -b && vite build",
      lint: "eslint .",
      format: "prettier --write .",
      preview: "vite preview",
      ...(config.useHusky && { prepare: "husky" })
    },
    dependencies: {
      "@tailwindcss/vite": "^4.1.7",
      "react": "^19.1.0",
      "react-dom": "^19.1.0",
      "tailwindcss": "^4.1.7"
    },
    devDependencies: {
      "@eslint/js": "^9.25.0",
      "@types/node": "^22.15.21",
      "@types/react": "^19.1.2",
      "@types/react-dom": "^19.1.2",
      "@vitejs/plugin-react": "^4.4.1",
      "eslint": "^9.25.0",
      "eslint-config-prettier": "^10.1.2",
      "eslint-plugin-prettier": "^5.2.6",
      "eslint-plugin-react": "^7.37.5",
      "eslint-plugin-react-hooks": "^5.2.0",
      "eslint-plugin-react-refresh": "^0.4.19",
      "eslint-plugin-simple-import-sort": "^12.1.1",
      "globals": "^16.0.0",
      "husky": "^9.1.7",
      "lint-staged": "^16.0.0",
      "typescript": "~5.8.3",
      "typescript-eslint": "^8.30.1",
      "vite": "^6.3.5",
      ...(config.usePrettier && { prettier: "^3.3.3" })
    },
    ...(config.useHusky && {
      "lint-staged": {
        "**/*.{ts,tsx}": [
          "tsc --noEmit",
          "eslint --fix",
          "prettier --write --ignore-unknown"
        ]
      }
    })
  };

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${config.projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})`;

  const tsconfig = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`;

  const tsconfigApp = `{
  "extends": "./tsconfig.json"
}`;

  const tsconfigNode = `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}`;

  const tailwindConfig = `import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
} satisfies Config`;



  const mainTsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

  const appTsx = `import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Vite + React + TypeScript + Tailwind
        </h1>
        <div className="space-y-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
          <p className="text-gray-600">
            Edit <code className="bg-gray-200 px-1 rounded">src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
    </div>
  )
}

export default App`;

  const indexCss = `@import "tailwindcss";`;

  const viteEnvDts = `/// <reference types="vite/client" />`;

  const viteSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>`;

  const readme = `# ${config.projectName}

This project is built with Vite + React + TypeScript + Tailwind CSS.

## Tech Stack

- **Vite** - Fast development environment
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
${config.useESLint ? '- **ESLint** - Code quality management' : ''}
${config.usePrettier ? '- **Prettier** - Code formatting' : ''}
${config.useHusky ? '- **Husky** - Git hooks' : ''}

## Getting Started

### Install dependencies
\`\`\`bash
${config.packageManager} install
\`\`\`

### Start development server
\`\`\`bash
${config.packageManager} run dev
\`\`\`

### Build for production
\`\`\`bash
${config.packageManager} run build
\`\`\`

### Lint code
\`\`\`bash
${config.packageManager} run lint
\`\`\`

### Format code
\`\`\`bash
${config.packageManager} run format
\`\`\`

## Project Structure

\`\`\`
src/
├── App.tsx          # Main app component
├── main.tsx         # App entry point
├── index.css        # Global styles
└── vite-env.d.ts    # Vite type definitions
\`\`\`
`;

  return {
    packageJson,
    html,
    viteConfig,
    tsconfig,
    tsconfigApp,
    tsconfigNode,
    tailwindConfig,
    mainTsx,
    appTsx,
    indexCss,
    viteEnvDts,
    viteSvg,
    readme
  };
}
