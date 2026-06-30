# Presentation Web (웹 기반 프레젠테이션 엔진)

이 프로젝트는 웹 기술(React, Tailwind CSS, Framer Motion 등)을 사용하여 Gamma 또는 Pitch 스타일의 고품질 웹 프레젠테이션을 생성하고 관리하는 플랫폼입니다.

---

## 📁 프로젝트 구조

*   `template/` - 프레젠테이션을 생성하기 위한 핵심 템플릿 프로젝트 (React + TypeScript + Tailwind CSS + Framer Motion).
*   `the-art-of-loop-engineering/` - 템플릿을 사용하여 실제로 구현된 "루프 엔지니어링의 예술" 프레젠테이션 예시.
*   `GEMINI.md` - AI 에이전트(Antigravity 등)가 콘텐츠를 기반으로 슬라이드를 자동 생성하고 컴포넌트를 설계할 때 준수해야 하는 설계 지침 및 정책 문서.

---

## 🛠️ 기술 스택

*   **Framework**: React, Next.js (or Vite/HTML template)
*   **Styling**: Tailwind CSS
*   **Animation**: Framer Motion
*   **Language**: TypeScript

---

## 🚀 시작하기

### 1. 신규 프레젠테이션 생성 프로세스

새로운 프레젠테이션을 만들 때는 항상 `template/` 폴더를 시작점으로 사용합니다. `template/` 내부 파일을 직접 수정하지 마십시오.

1.  프로젝트 루트에 프레젠테이션 주제 이름의 새로운 디렉토리를 소문자 케밥 케이스(kebab-case)로 생성합니다.
    ```bash
    mkdir your-presentation-topic
    ```
2.  `template/` 디렉토리의 모든 파일(단, `node_modules` 및 `dist` 제외)을 신규 생성한 디렉토리로 복사합니다.
3.  신규 디렉토리로 이동하여 의존성을 설치하고 개발 서버를 시작합니다.
    ```bash
    cd your-presentation-topic
    npm install
    npm run dev
    ```

### 2. AI 에이전트를 통한 생성

이 리포지토리는 AI 에이전트가 프레젠테이션 콘텐츠와 기획안을 입력받아 고품질의 완성도 높은 반응형 슬라이드를 설계할 수 있도록 최적화되어 있습니다. 자세한 생성 및 디자인 규칙은 `GEMINI.md`를 참고하세요.

---

## 🎨 디자인 원칙

*   **미니멀리즘과 여백**: 과도한 텍스트 배치를 피하고 시각적 요소와 여백을 충분히 확보합니다.
*   **시각적 계층 구조**: 큰 타이포그래피와 색상 강조 등을 활용해 직관적인 계층을 설계합니다.
*   **풍부한 시각 컴포넌트**: 일반 텍스트 대신 카드, 프로세스 다이어그램, 타임라인, 비교 테이블 등을 적극적으로 활용합니다.
*   **정제된 애니메이션**: 가독성을 해치지 않고 콘텐츠 흐름을 강조하는 미세한 애니메이션(Fade, Slide 등)을 적용합니다.
