import { ProjectConfig } from '../types.js';

export function getHuskyConfig(config: ProjectConfig) {
  const preCommit = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# TypeScript 타입 체크
echo "🔍 TypeScript 타입 체크 중..."
${config.packageManager} run tsc --noEmit

# ESLint 검사
echo "🔍 ESLint 검사 중..."
${config.packageManager} run lint

# Prettier 포맷팅
echo "💅 Prettier 포맷팅 중..."
${config.packageManager} run format

echo "✅ 모든 검사가 통과했습니다!"
`;

  return { preCommit };
}
