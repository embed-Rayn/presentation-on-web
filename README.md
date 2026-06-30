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

### 주의 사항
    - `template/` 내부 파일을 직접 수정하지 않는 것을 권장.
    - npm 설치가 필요하므로 자기 노트북에서 실행할 때 쓸 것.(혹은 미리 npm 설치)

### 1. CLAUDE 또는 Antigravity 실행 후 디렉터리를 이 폴더로 설정

### 2. AI 에이전트를 통한 발표자료 생성

아래와 같이 간단하게 명령
```
https://www.langchain.com/blog/the-art-of-loop-engineering
내용을 ppt로 만들기 위해 페이지 별로 구성(한글)
```

### 3. 발표자료 실행

1.  프로젝트 루트에 프레젠테이션 주제 이름의 새로운 디렉토리를 소문자 케밥 케이스(kebab-case)로 에이전트가 자동 생성합니다.
2.  신규 디렉토리로 이동하여 발표자료를 실행합니다
    ```bash
    cd [your-presentation-topic] # 폴더명 자동 생성
    npm run dev
    ```

---

## 🎨 디자인 원칙

*   **미니멀리즘과 여백**: 과도한 텍스트 배치를 피하고 시각적 요소와 여백을 충분히 확보합니다.
*   **시각적 계층 구조**: 큰 타이포그래피와 색상 강조 등을 활용해 직관적인 계층을 설계합니다.
*   **풍부한 시각 컴포넌트**: 일반 텍스트 대신 카드, 프로세스 다이어그램, 타임라인, 비교 테이블 등을 적극적으로 활용합니다.
*   **정제된 애니메이션**: 가독성을 해치지 않고 콘텐츠 흐름을 강조하는 미세한 애니메이션(Fade, Slide 등)을 적용합니다.
