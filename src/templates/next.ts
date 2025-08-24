import { ProjectConfig } from '../types.js';

export function getNextTemplate(config: ProjectConfig) {
  const packageJson = {
    name: config.projectName,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint",
      format: "prettier --write .",
      ...(config.useHusky && { prepare: "husky" })
    },
    dependencies: {
      "next": "15.2.4",
      "react": "^19.1.0",
      "react-dom": "^19.1.0",
      "tailwindcss": "^4.1.7"
    },
    devDependencies: {
      "@types/node": "^22.15.21",
      "@types/react": "^19.1.2",
      "@types/react-dom": "^19.1.2",
      "eslint": "^9.25.0",
      "eslint-config-next": "15.2.4",
      "eslint-config-prettier": "^10.1.2",
      "eslint-plugin-prettier": "^5.2.6",
      "eslint-plugin-simple-import-sort": "^12.1.1",
      "husky": "^9.1.7",
      "lint-staged": "^16.0.0",
      "typescript": "~5.8.3",
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

  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
}

module.exports = nextConfig`;

  const tsconfig = `{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`;

  const tailwindConfig = `import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
} satisfies Config`;



  const layoutTsx = `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '${config.projectName}',
  description: 'Next.js + React + TypeScript + Tailwind CSS 프로젝트',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}`;

  const pageTsx = `'use client'

import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Next.js + React + TypeScript + Tailwind
        </h1>
        <div className="space-y-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
          <p className="text-gray-600">
            Edit <code className="bg-gray-200 px-1 rounded">src/app/page.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
    </main>
  )
}`;

  const globalsCss = `@import "tailwindcss";`;

  const readme = `# ${config.projectName}

This project is built with Next.js + React + TypeScript + Tailwind CSS.

## Tech Stack

- **Next.js 15** - React framework
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

### Start production server
\`\`\`bash
${config.packageManager} run start
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
├── app/
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
└── components/       # Reusable components
\`\`\`

## Next.js Features

- **App Router** - File-system based routing
- **Server Components** - Server-rendered components
- **Client Components** - Interactive client components
- **API Routes** - Serverless API endpoints
`;

  return {
    packageJson,
    nextConfig,
    tsconfig,
    tailwindConfig,
    layoutTsx,
    pageTsx,
    globalsCss,
    readme
  };
}
