<div align="center">
  <img src="public/logo.png" height="200">
  <p>
    A CLI tool that automatically sets up React projects 
    <br/>
    with TypeScript, Tailwind CSS, and essential development tools.
  </p>
</div>

<br/>

## 빠른 시작

```bash
npm i init-react-env

npx init-env
```

## 지원하는 도구들

### 프레임워크
- Vite
- Next.js

### 개발 도구
- TypeScript
- Tailwind CSS
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
```
