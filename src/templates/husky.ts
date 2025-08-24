import { ProjectConfig } from '../types.js';

export function getHuskyConfig(config: ProjectConfig) {
  const preCommit = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "Running TypeScript type check..."
${config.packageManager} run tsc --noEmit

echo "Running ESLint..."
${config.packageManager} run lint

echo "Running Prettier..."
${config.packageManager} run format

echo "All checks passed!"
`;

  return { preCommit };
}
