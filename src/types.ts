export interface ProjectConfig {
  projectName: string;
  framework: 'vite' | 'next';
  packageManager: 'npm' | 'yarn' | 'pnpm';
  useESLint: boolean;
  usePrettier: boolean;
  useHusky: boolean;
}

export interface PackageJson {
  name: string;
  version: string;
  private?: boolean;
  type?: string;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  [key: string]: any;
}
