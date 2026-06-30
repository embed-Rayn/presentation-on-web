import type { SlideData } from '../components/PresentationViewer';

export const DEMO_SLIDES: SlideData[] = [
  {
    id: 'slide-1',
    type: 'title',
    title: 'Designing The Future of Presentations',
    subtitle: 'Next-Generation Web Slides',
    notes: '여러분, 환영합니다! 오늘 발표에서는 차세대 웹 기반 슬라이드 시스템의 가치와 디자인 원칙에 대해 소개하겠습니다. 이 슬라이드는 TitleSlide 템플릿으로 큰 타이포그래피와 배경의 유기적 애니메이션을 보여줍니다.',
    content: {
      author: 'Antigravity AI Team',
      department: 'Product & Design Division',
      date: 'June 2026'
    }
  },
  {
    id: 'slide-2',
    type: 'split',
    title: 'Visual Clarity & Efficiency',
    subtitle: 'Core Philosophy',
    notes: '첫 번째 핵심 철학은 명확한 시각적 구도입니다. 50:50 좌우 배치를 통해 중요한 텍스트 메시지와 그것을 증명하는 시각적 요소를 동시에 전달합니다. 우측 카드는 Glassmorphic 디자인이 적용되어 프리미엄 느낌을 더해줍니다.',
    content: {
      leftTexts: [
        '단순히 텍스트를 슬라이드에 열거하는 것만으로는 청중을 매료시킬 수 없습니다. 정보의 경중을 나누고 스토리텔링을 입혀야 합니다.',
        '여백은 디자인의 가장 강력한 도구입니다. 복잡한 표와 긴 텍스트를 제거하고, 호흡할 수 있는 충분한 공간을 배치하는 것이 우리의 원칙입니다.'
      ],
      rightElements: [
        {
          icon: 'Palette',
          title: 'Minimal Design',
          description: '화려함보다 절제된 아름다움과 직관적인 정보 구조를 우선시합니다.'
        },
        {
          icon: 'Zap',
          title: 'Dynamic Motion',
          description: '프레젠테이션 흐름에 따른 부드럽고 자연스러운 애니메이션 전환을 보장합니다.'
        }
      ]
    }
  },
  {
    id: 'slide-3',
    type: 'grid',
    title: 'Strategic Architecture',
    subtitle: 'Key Features',
    notes: '여기는 Grid 템플릿입니다. 여러 개의 중요한 강점이나 특징을 카드로 정렬할 때 사용합니다. 마우스를 각 카드에 올려보세요. 은은하게 떠오르는 hover 마이크로 인터랙션을 직접 체감하실 수 있습니다.',
    content: {
      items: [
        {
          icon: 'Layout',
          title: 'Aspect Scaling',
          description: '16:9 해상도로 고정하여 디자인하며, 화면 크기에 맞게 완전한 반응형 비율로 렌더링됩니다.',
          badge: 'Technical'
        },
        {
          icon: 'Monitor',
          title: 'Presenter Console',
          description: '타이머, 스피커 노트, 다음 슬라이드 미리보기, 원클릭 네비게이션을 담은 듀얼 발표자 도구를 지원합니다.',
          badge: 'Productivity'
        },
        {
          icon: 'Printer',
          title: 'PDF Export',
          description: '프린트 미디어 쿼리를 지원하여 브라우저 내에서 원클릭으로 완벽한 인쇄용 PDF를 내보낼 수 있습니다.',
          badge: 'Accessibility'
        }
      ]
    }
  },
  {
    id: 'slide-4',
    type: 'quote',
    title: 'Simplicity is the ultimate sophistication.',
    notes: '레오나르도 다빈치의 유명한 명언을 담은 Quote 템플릿입니다. 가장 중요한 메시지를 극대화하여 전달하고 싶을 때 사용해 보세요. 배경의 거대한 따옴표가 시각적 중심을 잡아줍니다.',
    content: {
      author: 'Leonardo da Vinci',
      role: 'Renaissance Artist & Inventor'
    }
  },
  {
    id: 'slide-5',
    type: 'timeline',
    title: 'Product Roadmap',
    subtitle: 'Launch Plan',
    notes: 'Timeline 템플릿은 가로축을 기준으로 진행 과정이나 제품 로드맵을 시각적으로 나타냅니다. 슬라이드에 진입할 때 흐르는 애니메이션 진행선이 청중의 시선을 타임라인을 따라 자연스럽게 유도합니다.',
    content: {
      steps: [
        {
          period: 'Q1 2026',
          title: 'Design Engine Beta',
          description: '핵심 렌더링 프레임워크 구축 및 1차 레이아웃 가이드라인 정형화.'
        },
        {
          period: 'Q2 2026',
          title: 'Aesthetic Upgrade',
          description: '미디블/Midnight/Terracotta 등 프리미엄 브랜딩 테마 및 그라데이션 고도화.'
        },
        {
          period: 'Q3 2026',
          title: 'Platform Launch',
          description: '브라우저 팝업 기반 듀얼 발표자 스크린 릴리즈 및 글로벌 템플릿 공유 스토어 오픈.'
        }
      ]
    }
  },
  {
    id: 'slide-6',
    type: 'stat',
    title: 'Measurable Success',
    subtitle: 'Core Metrics',
    notes: '숫자를 크게 강조하는 Stat 템플릿입니다. 비즈니스 성과 보고나 메트릭을 발표할 때 효과적입니다. HSL 기반의 색상 그라데이션이 숫자 텍스트에 적용되어 뛰어난 주목도를 제공합니다.',
    content: {
      metrics: [
        {
          value: '4.8s',
          label: 'Interaction Delay',
          description: '기존 프레젠테이션 도구 대비 발표자 도구 실행 속도 40% 이상 대폭 개선.'
        },
        {
          value: '10x',
          label: 'Aesthetic Score',
          description: '고객 만족도 및 비주얼 완성도 조사에서 타사 도구 대비 10배 높은 프리미엄 디자인 선호율.'
        }
      ]
    }
  },
  {
    id: 'slide-7',
    type: 'mockup',
    title: 'Live Code Integration',
    subtitle: 'Developer Showcase',
    notes: '마지막으로 Mockup 템플릿입니다. 웹 브라우저 스타일 프레임 내에 코드 스니펫이나 실제 결과물을 배치할 수 있어, 기술 발표나 데모 세션 시 신뢰도 높은 데이터를 정갈하게 보여줄 수 있습니다.',
    content: {
      url: 'https://github.com/google-deepmind/antigravity',
      language: 'typescript',
      code: `// Presentation Viewer initialization snippet
const initViewer = () => {
  const slides = loadSlidesFromData();
  const theme = 'midnight';
  
  document.documentElement.setAttribute('data-theme', theme);
  console.log("Antigravity Web Slides Engine started successfully.");
};`,
      caption: '코드나 제품의 레이아웃을 실제 브라우저 형태의 목업 위에 단정하게 배치하여, 기술 중심의 정보를 현대적이고 명료하게 전달합니다.'
    }
  }
];
