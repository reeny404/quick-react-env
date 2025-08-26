import { spawn } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

async function testCLI() {
  console.log('Testing CLI with file overwrite...');

  const testProjectName = 'test-cli-app';

  if (await fs.pathExists(testProjectName)) {
    await fs.remove(testProjectName);
  }

  return new Promise((resolve, reject) => {
    const child = spawn('node', ['../dist/index.js', testProjectName], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env },
    });

    let output = '';
    let inputSent = 0;

    child.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      console.log(text);

      if (text.includes('?') || text.includes(':')) {
        // 자동 입력 엔터엔터
        setTimeout(() => {
          child.stdin.write('\n');
          inputSent++;
        }, 200);
      }
    });

    child.stderr.on('data', (data) => {
      console.log(data.toString());
    });

    child.on('close', async (code) => {
      if (code !== 0) {
        console.log(`Process exited with code ${code}`);
        reject(new Error(`Process exited with code ${code}`));
        return;
      }

      console.log(' >> start checking eslint config file...');

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
        reject(new Error('File not created'));
        return;
      }

      const projectConfig = await fs.readFile(eslintConfigPath, 'utf8');
      const templateConfig = await fs.readFile(sharedConfigPath, 'utf8');

      if (projectConfig !== templateConfig) {
        console.log('ESLint config file content does not match');
        reject(new Error('File content mismatch'));
        return;
      }

      console.log('ESLint config file was copied correctly');
      console.log('File overwrite functionality is working');
      resolve(true);
    });

    setTimeout(() => {
      child.kill();
      reject(new Error('Test timeout'));
    }, 10000);
  });
}

testCLI()
  .then(() => {
    console.log('\n✔ All tests passed! \n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Test failed:', error.message);
    process.exit(1);
  });
