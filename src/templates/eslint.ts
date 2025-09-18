import fs from 'fs-extra';
import path from 'path';
import { ProjectConfig } from '../types.js';

export async function copyESLintConfig(
  projectPath: string,
  config: ProjectConfig,
): Promise<void> {
  const currentFileUrl = import.meta.url;
  const currentDir = path.dirname(new URL(currentFileUrl).pathname);

  // Windows 경로 문제 해결
  const normalizedDir =
    process.platform === 'win32'
      ? currentDir.replace(/^\/([A-Za-z]):/, '$1:')
      : currentDir;

  const templateDir = path.join(normalizedDir, 'shared');

  switch (config.framework) {
    case 'vite':
      await fs.copy(
        path.join(templateDir, 'eslint.config.js'),
        path.join(projectPath, 'eslint.config.js'),
      );
      break;
    case 'next':
      await fs.copy(
        path.join(templateDir, 'eslint.config.mjs'),
        path.join(projectPath, 'eslint.config.mjs'),
      );
      break;
    default:
      throw new Error(`Unsupported framework: ${config.framework}`);
  }
}
