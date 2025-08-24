import { ProjectConfig } from '../types.js';
import fs from 'fs-extra';
import path from 'path';

export async function copyViteTemplate(projectPath: string, config: ProjectConfig): Promise<void> {
  const templateDir = path.join(process.cwd(), 'src', 'templates', 'vite');
  
  // Copy all files from vite template directory
  await fs.copy(templateDir, projectPath);
  
  // Replace placeholders in copied files
  await replacePlaceholders(projectPath, config);
}

async function replacePlaceholders(projectPath: string, config: ProjectConfig): Promise<void> {
  const files = [
    'package.json',
    'index.html',
    'README.md',
    'src/app/layout.tsx'
  ];

  for (const file of files) {
    const filePath = path.join(projectPath, file);
    if (await fs.pathExists(filePath)) {
      let content = await fs.readFile(filePath, 'utf-8');
      content = content.replace(/\{\{projectName\}\}/g, config.projectName);
      content = content.replace(/\{\{packageManager\}\}/g, config.packageManager);
      await fs.writeFile(filePath, content);
    }
  }
}
