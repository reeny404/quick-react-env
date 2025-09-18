<div align="center">
  <img src="public/logo.png" height="200">
  <p>기본 설정이 완료된 React 프로젝트를 생성하는 CLI</p>
</div>

<br/>

# how to use

정해진 내용으로 빠르게 이용하거나 본인만의 설정으로 바꿔 쓸 수 있습니다.

## 1. 기본 설정으로 빠르게 사용하기

```bash
npm i react-starter-cli

npx quick-react-env
```

<br />

## 2. 입맛대로 사용하기

### 1. git clone & install

```bash
git clone https://github.com/your-username/quick-react-env.git

cd quick-react-env

pnpm install
```

### 2. customizing

#### ESLint

- `src/templates/shared/eslint.config.js` (Vite용)
- `src/templates/shared/eslint.config.mjs` (Next.js용)

#### Prettier

- `src/templates/prettier.ts`

#### Husky

- `src/templates/husky.ts`

#### VSCode

- `src/templates/shared/.vscode/settings.json`
- `src/templates/shared/.vscode/extensions.json`

#### TypeScript

- `src/templates/shared/tsconfig.json`

#### Vite

- `src/templates/shared/vite.config.ts`

### 3. 빌드 및 테스트

```bash
# 빌드
pnpm run build

# 로컬에서 테스트
node dist/index.js
```

### 4. 로컬에서 전역 사용하기

```bash
# 전역에서 사용할 수 있도록 연결하기 (한 번만 실행)
pnpm run link

# 어디서든 사용 가능
quick-react-env

# 전역 사용 해제
pnpm run unlink
```

#### 링크 후 사용법

```bash
# 어느 디렉토리에서든 새 프로젝트 생성
quick-react-env my-new-app

# 예시
cd ~/Desktop
quick-react-env portfolio-site
```

#### customizing 한 파일 반영

```bash
# 코드 수정 후 현재 프로젝트에서 빌드
pnpm run build

# 링크된 버전이 바로 반영되어 다른 곳에서 바로 사용 가능
quick-react-env
```

#### 링크 확인

```bash
# 전역 패키지 목록에서 확인
pnpm list -g --depth=0

# 또는 직접 실행해서 확인
quick-react-env --help
```

<!-- ### 5. npm에 배포

```bash
# (필수) package.json version update
npm login
npm publish
``` -->

<br />

## 지원하는 tool

#### 프레임워크

- Vite
- Next.js

#### 개발 도구

- TypeScript
- Tailwind CSS
- ESLint
- Prettier
- Husky

#### 패키지 매니저

- pnpm
- npm
- yarn

<br />

## 생성한 프로젝트 구조

#### Vite 프로젝트

```
my-app/
├── .husky/              # Husky Git 훅 (선택사항)
├── .vscode/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── public/
│   └── vite.svg
├── .prettierrc          # Prettier 설정 (선택사항)
├── index.html
├── vite.config.ts       # Vite 설정
├── tsconfig.json        # TypeScript 설정
├── tailwind.config.js   # Tailwind CSS 설정
├── eslint.config.js     # ESLint 설정 (선택사항)
└── package.json
```

#### Next.js 프로젝트

```
my-app/
├── .husky/              # Husky Git 훅 (선택사항)
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── .eslintrc.json       # ESLint 설정 (선택사항)
├── .prettierrc          # Prettier 설정 (선택사항)
├── next.config.js       # Next.js 설정
├── tsconfig.json        # TypeScript 설정
├── tailwind.config.js   # Tailwind CSS 설정
└── package.json
```
