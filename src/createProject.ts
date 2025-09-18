import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';
import { ProjectConfig } from './types.js';
import { copyESLintConfig } from './templates/eslint.js';
import { getPrettierConfig } from './templates/prettier.js';
import { getHuskyConfig } from './templates/husky.js';

export async function createProject(config: ProjectConfig): Promise<void> {
  const projectPath = path.resolve(process.cwd(), config.projectName);
  
  const spinner = ora('Creating project...').start();
  
  try {
    if (config.framework === 'vite') {
      await createViteProject(projectPath, config);
    } else {
      await createNextProject(projectPath, config);
    }
    spinner.succeed('Base project created');
  } catch (error) {
    spinner.fail('Failed to create base project');
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

  spinner.text = 'Setting up VSCode configuration...';
  spinner.start();
  
  try {
    await setupVSCodeConfig(projectPath, config);
    spinner.succeed('VSCode configuration added');
  } catch (error) {
    spinner.fail('Failed to setup VSCode configuration');
    throw error;
  }

  spinner.text = 'Installing additional dependencies...';
  spinner.start();
  
  try {
    await installAdditionalDependencies(projectPath, config);
    spinner.succeed('Additional dependencies installed');
  } catch (error) {
    spinner.fail('Failed to install additional dependencies');
    throw error;
  }
}

async function createViteProject(projectPath: string, config: ProjectConfig): Promise<void> {
  const originalCwd = process.cwd();
  
  try {
    const parentDir = path.dirname(projectPath);
    const projectName = path.basename(projectPath);
    
    process.chdir(parentDir);
    
    const createCommand = `npx create-vite@latest ${projectName} --template react-ts --yes`;
    execSync(createCommand, { stdio: 'inherit' });
    
  } finally {
    process.chdir(originalCwd);
  }
}

async function createNextProject(projectPath: string, config: ProjectConfig): Promise<void> {
  const originalCwd = process.cwd();
  
  try {
    const parentDir = path.dirname(projectPath);
    const projectName = path.basename(projectPath);
    
    process.chdir(parentDir);
    
    const createCommand = `npx create-next-app@latest ${projectName} --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes`;
    execSync(createCommand, { stdio: 'inherit' });
    
  } finally {
    process.chdir(originalCwd);
  }
}

async function setupESLint(projectPath: string, config: ProjectConfig): Promise<void> {
  await copyESLintConfig(projectPath, config);
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

async function setupVSCodeConfig(projectPath: string, config: ProjectConfig): Promise<void> {
  const vscodeDir = path.join(projectPath, '.vscode');
  await fs.ensureDir(vscodeDir);
  
  // extensions.json 파일 복사
  const extensionsJsonPath = path.join(__dirname, 'templates', 'shared', '.vscode', 'extensions.json');
  const targetExtensionsPath = path.join(vscodeDir, 'extensions.json');
  await fs.copy(extensionsJsonPath, targetExtensionsPath);
  
  // settings.json 파일 복사
  const settingsJsonPath = path.join(__dirname, 'templates', 'shared', '.vscode', 'settings.json');
  const targetSettingsPath = path.join(vscodeDir, 'settings.json');
  await fs.copy(settingsJsonPath, targetSettingsPath);
}

async function installAdditionalDependencies(projectPath: string, {useESLint, usePrettier, useHusky, framework, packageManager}: ProjectConfig): Promise<void> {
  const originalCwd = process.cwd();
  
  try {
    process.chdir(projectPath);
    
    await ensurePackageManager(packageManager);
    
    const additionalDeps = [];
    
    if (useESLint) {
      if (framework === 'vite') {
        additionalDeps.push('@typescript-eslint/eslint-plugin', '@typescript-eslint/parser', 'eslint-plugin-simple-import-sort');
      } else {
        additionalDeps.push('eslint-plugin-simple-import-sort');
      }
    }
    
    if (usePrettier) {
      additionalDeps.push('prettier');
      if (useESLint) {
        additionalDeps.push('eslint-plugin-prettier');
      }
    }
    
    if (useHusky) {
      additionalDeps.push('husky', 'lint-staged');
    }
    
    if (additionalDeps.length > 0) {
      const installCommand = packageManager === 'npm' 
        ? `${packageManager} install --save-dev ${additionalDeps.join(' ')}` 
        : `${packageManager} add -D ${additionalDeps.join(' ')}`;
      
      execSync(installCommand, { stdio: 'inherit' });
    }
    
    if (useHusky) {
      execSync('npx husky init', { stdio: 'inherit' });
    }
    
  } finally {
    process.chdir(originalCwd);
  }
}

async function ensurePackageManager(packageManager: string) {
  try {
    execSync(`${packageManager} --version`, { stdio: 'ignore' });
  } catch (error) {
    console.log(chalk.yellow(`${packageManager} is not installed. Installing it now...`));
    
    switch (packageManager) {
      case 'pnpm':
        execSync('npm install -g pnpm', { stdio: 'inherit' });
        console.log(chalk.green('pnpm installed successfully!'));
        break;
      case 'yarn':
        execSync('npm install -g yarn', { stdio: 'inherit' });
        console.log(chalk.green('yarn installed successfully!'));
        break;
      case 'npm':
        throw new Error('npm is not available. Please install Node.js.');
      default:
        throw new Error(`Unknown package manager: ${packageManager}`);
    }
  }
}