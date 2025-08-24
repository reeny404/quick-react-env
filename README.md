A simple CLI tool to bootstrap React projects with TypeScript, Tailwind CSS, and development tools.
## 빠른 시작

### npx로 실행 (추천)
```bash
npx init-env my-app
```

### 전역 설치
```bash
npm install -g init-env
init-env my-app
```

## 사용법

### 기본 사용법
```bash
init-env my-app
```

### 옵션과 함께 사용
```bash
# Next.js 프로젝트 자동 생성
init-env my-next-app --framework next --yes
```

### 사용 가능한 옵션

| 옵션 | 설명 | 기본값 |
|------|------|--------|
| `--framework <framework>` | 프레임워크 선택 (vite\|next) | vite |
| `--yes` | 모든 질문에 자동으로 yes 답변 | false |

## 지원하는 도구들

### 프레임워크
- Vite
- Next.js

### 개발 도구
- TypeScript
- Tailwind CSS v4
- ESLint
- Prettier
- Husky

### 패키지 매니저
- pnpm
- npm
- yarn

## 생성되는 프로젝트 구조

### Vite 프로젝트
```
my-app/
├── src/
│   ├── App.tsx          # 메인 앱 컴포넌트
│   ├── main.tsx         # 앱 진입점
│   ├── index.css        # 전역 스타일
│   └── vite-env.d.ts    # Vite 타입 정의
├── public/
│   └── vite.svg         # Vite 로고
├── index.html           # HTML 템플릿
├── vite.config.ts       # Vite 설정
├── tsconfig.json        # TypeScript 설정
├── tailwind.config.js   # Tailwind CSS 설정
├── eslint.config.js     # ESLint 설정 (선택사항)
├── .prettierrc          # Prettier 설정 (선택사항)
├── .husky/              # Husky Git 훅 (선택사항)
└── package.json         # 프로젝트 설정
```

### Next.js 프로젝트
```
my-app/
├── src/
│   └── app/
│       ├── layout.tsx   # 루트 레이아웃
│       ├── page.tsx     # 홈 페이지
│       └── globals.css  # 전역 스타일
├── next.config.js       # Next.js 설정
├── tsconfig.json        # TypeScript 설정
├── tailwind.config.js   # Tailwind CSS 설정
├── .eslintrc.json       # ESLint 설정 (선택사항)
├── .prettierrc          # Prettier 설정 (선택사항)
├── .husky/              # Husky Git 훅 (선택사항)
└── package.json         # 프로젝트 설정
```

## 사용 예시

### 1. 기본 Vite 프로젝트 생성
```bash
init-env my-vite-app
```

### 2. 모든 도구가 포함된 Next.js 프로젝트 생성
```bash
init-env my-next-app --framework next
```

### 3. 자동 모드로 프로젝트 생성
```bash
init-env my-auto-app --yes
```

<!-- 
## 개발

### 로컬에서 테스트
```bash
# 의존성 설치
pnpm install

# 빌드
pnpm run build

# 로컬에서 실행
node dist/index.js my-test-app
```

### npm에 배포
```bash
# 로그인
npm login

# 배포
npm publish
``` -->
