import fs from 'fs-extra';
import path from 'path';

async function test(config) {
  console.log('\n----------------- TEST START -----------------');
  console.log('Testing with direct configuration...', config);

  const testProjectName = config.projectName;

  if (await fs.pathExists(testProjectName)) {
    await fs.remove(testProjectName);
  }

  const { createProject } = await import('../dist/createProject.js');
  try {
    await createProject(config);
    console.log('Project created successfully!');

    const eslintConfigPath = path.join(testProjectName, 'eslint.config.js');
    const sharedConfigPath = path.join(
      '..',
      'src',
      'templates',
      'shared',
      'eslint.config.js',
    );

    if (!(await fs.pathExists(eslintConfigPath))) {
      console.log('ESLint config file was not created');
      process.exit(1);
    }

    const projectConfig = await fs.readFile(eslintConfigPath, 'utf8');
    const templateConfig = await fs.readFile(sharedConfigPath, 'utf8');

    if (projectConfig !== templateConfig) {
      console.log('ESLint config file content does not match');
      process.exit(1);
    }

    console.log('ESLint config file was copied correctly');
    console.log('File overwrite functionality is working');
    console.log('\n✔ All tests passed!\n');
  } catch (error) {
    console.error('Error during test:', error);
    process.exitCode = 1;
  } finally {
    await fs.remove(testProjectName);
    console.log('\nTest directory cleaned up');
    console.log('----------------- TEST END -----------------');
  }
}

await test({
  projectName: 'test-create-vite',
  framework: 'vite',
  packageManager: 'pnpm',
  useESLint: true,
  usePrettier: true,
  useHusky: true,
});

await test({
  projectName: 'test-create-next',
  framework: 'vite',
  packageManager: 'pnpm',
  useESLint: true,
  usePrettier: true,
  useHusky: true,
});
