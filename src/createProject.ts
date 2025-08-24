import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';
import { ProjectConfig } from './types.js';
import { copyViteTemplate } from './templates/vite.js';
import { copyNextTemplate } from './templates/next.js';
import { getESLintConfig } from './templates/eslint.js';
import { getPrettierConfig } from './templates/prettier.js';
import { getHuskyConfig } from './templates/husky.js';

export async function createProject(config: ProjectConfig): Promise<void> {
  const projectPath = path.resolve(process.cwd(), config.projectName);
  
  const spinner = ora('Creating project directory...').start();
  
  try {
    await fs.ensureDir(projectPath);
    spinner.succeed('Project directory created');
  } catch (error) {
    spinner.fail('Failed to create project directory');
    throw error;
  }

  spinner.text = 'Creating base files...';
  spinner.start();

  try {
    if (config.framework === 'vite') {
      await copyViteTemplate(projectPath, config);
    } else {
      await copyNextTemplate(projectPath, config);
    }
    spinner.succeed('Base files created');
  } catch (error) {
    spinner.fail('Failed to create base files');
    throw error;
  }

  if (config.useESLint) {
    spinner.text = 'Setting up ESLint...';
    spinner.start();
    
    try {
      await setupESLint(projectPath, config);
      spinner.succeed('ESLint configured');
    } catch (error) {
      spinner.fail('Failed to configure ESLint');
      throw error;
    }
  }

  if (config.usePrettier) {
    spinner.text = 'Setting up Prettier...';
    spinner.start();
    
    try {
      await setupPrettier(projectPath, config);
      spinner.succeed('Prettier configured');
    } catch (error) {
      spinner.fail('Failed to configure Prettier');
      throw error;
    }
  }

  if (config.useHusky) {
    spinner.text = 'Setting up Husky...';
    spinner.start();
    
    try {
      await setupHusky(projectPath, config);
      spinner.succeed('Husky configured');
    } catch (error) {
      spinner.fail('Failed to configure Husky');
      throw error;
    }
  }

  spinner.text = 'Installing dependencies...';
  spinner.start();
  
  try {
    await installDependencies(projectPath, config);
    spinner.succeed('Dependencies installed');
  } catch (error) {
    spinner.fail('Failed to install dependencies');
    throw error;
  }
}

async function setupESLint(projectPath: string, config: ProjectConfig): Promise<void> {
  const eslintConfig = getESLintConfig(config);
  
  if (config.framework === 'vite') {
    await fs.writeFile(path.join(projectPath, 'eslint.config.js'), eslintConfig.vite);
  } else {
    await fs.writeFile(path.join(projectPath, '.eslintrc.json'), eslintConfig.next);
  }
}

async function setupPrettier(projectPath: string, config: ProjectConfig): Promise<void> {
  const prettierConfig = getPrettierConfig();
  await fs.writeFile(path.join(projectPath, '.prettierrc'), prettierConfig);
  await fs.writeFile(path.join(projectPath, '.prettierignore'), '.gitignore\nnode_modules\n.next\nout');
}

async function setupHusky(projectPath: string, config: ProjectConfig): Promise<void> {
  const huskyConfig = getHuskyConfig(config);
  
  await fs.ensureDir(path.join(projectPath, '.husky'));
  await fs.writeFile(path.join(projectPath, '.husky/pre-commit'), huskyConfig.preCommit);
  
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  

  if (!packageJson['lint-staged']) {
    packageJson['lint-staged'] = {
      '**/*.{ts,tsx}': [
        'tsc --noEmit',
        'eslint --fix',
        'prettier --write --ignore-unknown'
      ]
    };
  }
  
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}

async function installDependencies(projectPath: string, config: ProjectConfig): Promise<void> {
  const originalCwd = process.cwd();
  
  try {
    process.chdir(projectPath);
    
    const installCommand = config.packageManager === 'pnpm' ? 'pnpm install' :
                          config.packageManager === 'yarn' ? 'yarn install' :
                          'npm install';
    

    execSync(installCommand, { stdio: 'inherit' });
    
    if (config.useHusky) {
      execSync('npx husky init', { stdio: 'inherit' });
    }
    
  } finally {
    process.chdir(originalCwd);
  }
}
