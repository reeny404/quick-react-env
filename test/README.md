## 개요

- **test-direct.js**: 빌트된 라이브러리의 `createProject` 함수를 직접 호출하여 기본 동작과 파일 복사를 검증합니다.
- **test-cli-interactive.js**: 배포된 CLI 엔트리(`dist/index.js`)를 실행하고, 프롬프트 입력을 자동으로 넘겨 실제 CLI 상호작용 플로우를 검증합니다.

## 실행 방법

실행 전 필수로 Node.js, pnpm를 설치하고 project build를 해주세요

#### 직접 호출 테스트

```bash
node test/test-direct.js
```

#### CLI 상호 작용 테스트

```bash
node test/test-cli-interactive.js
```

## 동작 방식

- 기존 동일한 이름의 프로젝트 디렉토리가 있으면 삭제 후 시작합니다.
- 생성된 프로젝트의 `eslint.config.js`가 템플릿(`src/templates/shared/eslint.config.js`)과 동일한지 검사합니다.
- 불일치/미생성 시 실패로 처리되며, 성공 시 성공 로그를 출력합니다.

## 타임아웃

- CLI 상호작용 테스트는 10초 타임아웃이 걸려있어, 초과 시 프로세스를 종료하고 실패로 처리합니다.
