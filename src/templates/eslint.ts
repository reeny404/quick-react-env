import { ProjectConfig } from '../types.js';
import fs from 'fs-extra';
import path from 'path';

export async function copyESLintConfig(projectPath: string, config: ProjectConfig): Promise<void> {
  const templateDir = path.join(process.cwd(), 'src', 'templates', 'eslint');
  
  if (config.framework === 'vite') {
    const configFile = config.usePrettier ? 'vite.config.prettier.js' : 'vite.config.js';
    await fs.copy(path.join(templateDir, configFile), path.join(projectPath, 'eslint.config.js'));
  } else {
    const configFile = config.usePrettier ? 'next.prettier.json' : 'next.json';
    await fs.copy(path.join(templateDir, configFile), path.join(projectPath, '.eslintrc.json'));
  }
}
