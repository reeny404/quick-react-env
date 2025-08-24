#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createProject } from './createProject.js';
import { ProjectConfig } from './types.js';

const program = new Command();

program
  .name('init-env')
  .description('Initialize React + TypeScript + Tailwind + ESLint + Prettier + Husky project')
  .version('1.0.0')
  .argument('[project-name]', 'Project name')
  .option('-f, --framework <framework>', 'Framework selection (vite|next)', 'vite')
  .option('-y, --yes', 'Automatically answer yes to all questions')
  .action(async (projectName, options) => {
    try {
      console.log(chalk.blue.bold('🚀 Starting React Environment Setup Tool...\n'));

      let config: ProjectConfig;

      if (options.yes) {
        config = {
          projectName: projectName || 'my-react-app',
          framework: options.framework,
          useHusky: true,
          useESLint: true,
          usePrettier: true,
          packageManager: 'pnpm'
        };
      } else {
        config = await promptForConfig(projectName, options);
      }

      await createProject(config);
      
      console.log(chalk.green.bold('\n✅ Project created successfully!'));
      console.log(chalk.cyan('\nTo start your project, run:'));
      console.log(chalk.white(`  cd ${config.projectName}`));
      console.log(chalk.white(`  ${config.packageManager} install`));
      console.log(chalk.white(`  ${config.packageManager} run dev`));
      
    } catch (error) {
      console.error(chalk.red.bold('\n❌ An error occurred:'), error);
      process.exit(1);
    }
  });

async function promptForConfig(projectName?: string, options?: any): Promise<ProjectConfig> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter project name:',
      default: projectName || 'my-react-app',
      validate: (input: string) => {
        if (!input.trim()) return 'Project name is required.';
        if (!/^[a-z0-9-]+$/.test(input)) {
          return 'Project name can only contain lowercase letters, numbers, and hyphens.';
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'framework',
      message: 'Which framework would you like to use?',
      choices: [
        { name: 'Vite (Fast development environment)', value: 'vite' },
        { name: 'Next.js (SSR/SSG support)', value: 'next' }
      ],
      default: options?.framework || 'vite'
    },
    {
      type: 'list',
      name: 'packageManager',
      message: 'Select package manager:',
      choices: [
        { name: 'pnpm (Recommended)', value: 'pnpm' },
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' }
      ],
      default: 'pnpm'
    },
    {
      type: 'confirm',
      name: 'useESLint',
      message: 'Set up ESLint?',
      default: true
    },
    {
      type: 'confirm',
      name: 'usePrettier',
      message: 'Set up Prettier?',
      default: true
    },
    {
      type: 'confirm',
      name: 'useHusky',
      message: 'Set up Husky (Git hooks)?',
      default: true
    }
  ]);

  return {
    projectName: answers.projectName,
    framework: answers.framework,
    packageManager: answers.packageManager,
    useESLint: answers.useESLint,
    usePrettier: answers.usePrettier,
    useHusky: answers.useHusky
  };
}

program.parse();
