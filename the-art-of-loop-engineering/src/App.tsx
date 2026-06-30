import { useState, useEffect, useRef } from 'react';
import { PresentationViewer } from './components/PresentationViewer';
import type { SlideData } from './components/PresentationViewer';
import { SlideController } from './components/SlideController';
import { PresenterConsole } from './components/PresenterConsole';
import { DEMO_SLIDES } from './data/slides';
import {
  TitleSlide,
  SplitSlide,
  GridSlide,
  QuoteSlide,
  TimelineSlide,
  StatSlide,
  MockupSlide
} from './components/layouts/SlideLayouts';

// BroadcastChannel을 통한 듀얼 스크린 동기화 설정
const syncChannel = new BroadcastChannel('presentation_sync_channel');

function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [transitionType, setTransitionType] = useState<'slide' | 'fade' | 'zoom'>('slide');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const presenterWindowRef = useRef<Window | null>(null);

  // 1. URL 쿼리 파라미터를 통해 발표자 모드인지 독립적인 일반 모드인지 확인
  const isPresenterWindow = new URLSearchParams(window.location.search).get('presenter') === 'true';

  // 2. 테마가 바뀔 때 HTML data-theme 속성 업데이트
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 3. BroadcastChannel 동기화 리스너
  useEffect(() => {
    const handleSyncMessage = (event: MessageEvent) => {
      const { type, payload } = event.data;
      
      switch (type) {
        case 'NAVIGATE':
          setCurrentSlideIndex(payload);
          break;
        case 'THEME_CHANGE':
          setTheme(payload);
          break;
        case 'TRANSITION_CHANGE':
          setTransitionType(payload);
          break;
        default:
          break;
      }
    };

    syncChannel.addEventListener('message', handleSyncMessage);
    return () => syncChannel.removeEventListener('message', handleSyncMessage);
  }, []);

  // 4. 슬라이드 변경 전파 함수
  const handleSlideChange = (index: number) => {
    setCurrentSlideIndex(index);
    syncChannel.postMessage({ type: 'NAVIGATE', payload: index });
  };

  // 5. 테마 변경 전파 함수
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    syncChannel.postMessage({ type: 'THEME_CHANGE', payload: newTheme });
  };

  // 6. 전환 효과 변경 전파 함수
  const handleTransitionChange = (newTransition: 'slide' | 'fade' | 'zoom') => {
    setTransitionType(newTransition);
    syncChannel.postMessage({ type: 'TRANSITION_CHANGE', payload: newTransition });
  };

  // 7. 풀스크린 전환 제어 및 리스너 등록
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // 단축키 F키를 통해 풀스크린 제어
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'f' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 8. 발표자 모드 토글 (팝업 스크린 열기)
  const handlePresenterModeToggle = () => {
    if (presenterWindowRef.current && !presenterWindowRef.current.closed) {
      presenterWindowRef.current.focus();
    } else {
      // 쿼리 스트링 '?presenter=true'을 추가하여 새로운 창을 발표자 모드로 연다
      const popup = window.open(
        `${window.location.pathname}?presenter=true&theme=${theme}&slide=${currentSlideIndex}`, 
        'PresenterConsole', 
        'width=1280,height=800,menubar=no,toolbar=no,status=no'
      );
      presenterWindowRef.current = popup;
    }
  };

  // 팝업 창이 열릴 때 최초 상태(현재 슬라이드와 테마)를 넘겨주기 위한 처리
  useEffect(() => {
    if (isPresenterWindow) {
      const params = new URLSearchParams(window.location.search);
      const startSlide = parseInt(params.get('slide') || '0', 10);
      const startTheme = params.get('theme') || 'dark';
      
      setCurrentSlideIndex(startSlide);
      setTheme(startTheme);
      // 팝업이 로드된 후 메인 창에 슬라이드 싱크 맞추기
      syncChannel.postMessage({ type: 'NAVIGATE', payload: startSlide });
    }
  }, [isPresenterWindow]);

  // 9. 슬라이드 레이아웃 렌더링 선택자
  const renderSlideContent = (slide: SlideData) => {
    switch (slide.type) {
      case 'title':
        return <TitleSlide slide={slide} />;
      case 'split':
        return <SplitSlide slide={slide} />;
      case 'grid':
        return <GridSlide slide={slide} />;
      case 'quote':
        return <QuoteSlide slide={slide} />;
      case 'timeline':
        return <TimelineSlide slide={slide} />;
      case 'stat':
        return <StatSlide slide={slide} />;
      case 'mockup':
        return <MockupSlide slide={slide} />;
      default:
        return (
          <div className="slide-content">
            <h2 className="slide-title">Unknown Layout Type: {slide.type}</h2>
          </div>
        );
    }
  };

  // 만약 URL이 '?presenter=true'로 열린 독립 창이라면 발표자 콘솔만 렌더링
  if (isPresenterWindow) {
    return (
      <PresenterConsole
        slides={DEMO_SLIDES}
        currentSlideIndex={currentSlideIndex}
        onSlideChange={handleSlideChange}
        onClose={() => window.close()}
        renderSlideContent={renderSlideContent}
      />
    );
  }

  return (
    <>
      <PresentationViewer
        slides={DEMO_SLIDES}
        currentSlideIndex={currentSlideIndex}
        onSlideChange={handleSlideChange}
        transitionType={transitionType}
        isFullscreen={isFullscreen}
        renderSlideContent={renderSlideContent}
      />

      <SlideController
        currentSlideIndex={currentSlideIndex}
        totalSlides={DEMO_SLIDES.length}
        onNavigate={(step) => handleSlideChange(currentSlideIndex + step)}
        transitionType={transitionType}
        onTransitionChange={handleTransitionChange}
        isFullscreen={isFullscreen}
        onFullscreenToggle={toggleFullscreen}
        onPresenterModeToggle={handlePresenterModeToggle}
        theme={theme}
        onThemeChange={handleThemeChange}
      />
    </>
  );
}

export default App;
