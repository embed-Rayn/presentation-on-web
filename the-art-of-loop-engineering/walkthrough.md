# Walkthrough: LangChain Loop Engineering Presentation (v5 - Image Zoom Overlay & Template Synchronization)

이 프로젝트에서는 LangChain의 블로그 포스트 **"The Art of Loop Engineering"**의 내용을 기반으로 하여 8개 슬라이드로 구성된 한글 웹 기반 프레젠테이션 데이터를 구축했습니다.

이번 5차 업데이트에서는 유저 피드백을 반영하여 **슬라이드 내부의 작은 이미지를 클릭 시 화면 전체에 레이어로 띄워주는(Zoom Overlay) 기능**을 추가하고, 이 변경 사항을 `/template` 프로젝트에도 완벽하게 동기화하였습니다.

## 변경 사항 및 작업 결과

1. **[SlideLayouts.tsx](file:///c:/Users/qwe14/OneDrive/문서/GitHub/presentaion_web/the-art-of-loop-engineering/src/components/layouts/SlideLayouts.tsx) 이미지 줌 오버레이 구현**:
   - `SplitSlide` 레이아웃 컴포넌트 내부에 `isZoomed` 상태값(`React.useState(false)`)을 추가했습니다.
   - 우측 이미지 영역에 마우스를 대면 크기가 살짝 늘어나는 마이크로 인터랙션(`whileHover={{ scale: 1.015 }}`)과 클릭을 유도하는 커서(`cursor: 'zoom-in'`)를 세팅했습니다.
   - 이미지를 클릭하면 어두운 배경(Dimmer, `rgba(0,0,0,0.85)`)과 블러 처리(`backdropFilter: 'blur(10px)'`)가 적용된 풀스크린 레이어 모달이 등장하며 고해상도 그림을 띄워줍니다.
   - 레이어 바깥 영역을 클릭하거나 오른쪽 상단의 ✕ 버튼을 누르면 다시 부드럽게 줌 아웃(`cursor: 'zoom-out'`)되며 닫힙니다.

2. **[template/src/components/layouts/SlideLayouts.tsx](file:///c:/Users/qwe14/OneDrive/문서/GitHub/presentaion_web/template/src/components/layouts/SlideLayouts.tsx) 동기화**:
   - 위에서 작성된 최신 개선 사항들(HTML 태그 및 서식 지원, 다이어그램 이미지 지원, 마크다운 표 렌더링, 이미지 줌 확대 기능 등)이 포함된 `SlideLayouts.tsx` 파일을 `/template` 폴더에도 복사 및 동기화했습니다.
   - 이를 통해 향후 다른 주제로 발표 자료를 새로 생성할 때도 확대 레이어 및 풍부한 렌더링 기능들을 기본 탑재한 상태로 시작할 수 있습니다.

3. **빌드 검증**:
   - `the-art-of-loop-engineering` 디렉터리와 `template` 디렉터리 양쪽 모두에서 `npm run build`를 성공적으로 마치고, TypeScript 빌드가 완전히 보장됨을 검증했습니다.

## 확인 및 실행 방법

1. 다음 명령어를 실행하여 로컬 개발 서버를 띄울 수 있습니다.
   ```bash
   cd the-art-of-loop-engineering
   npm run dev
   ```
2. 2~5번 슬라이드의 우측 다이어그램을 클릭하면 풀스크린 줌 레이어가 생성되는 모습을 확인하실 수 있습니다.
