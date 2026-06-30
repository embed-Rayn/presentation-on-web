import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  Palette, 
  Sparkles,
  Monitor,
  Printer
} from 'lucide-react';

interface SlideControllerProps {
  currentSlideIndex: number;
  totalSlides: number;
  onNavigate: (step: number) => void;
  transitionType: 'slide' | 'fade' | 'zoom';
  onTransitionChange: (type: 'slide' | 'fade' | 'zoom') => void;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
  onPresenterModeToggle: () => void;
  theme: string;
  onThemeChange: (theme: string) => void;
}

const THEMES = [
  { id: 'light', name: 'Minimal Light', color: '#ffffff', textColor: '#121214' },
  { id: 'dark', name: 'Premium Dark', color: '#0a0b0d', textColor: '#f3f4f6' },
  { id: 'midnight', name: 'Velvet Midnight', color: '#070314', textColor: '#f8fafc' },
  { id: 'forest', name: 'Premium Forest', color: '#0b130e', textColor: '#f4fbf7' },
  { id: 'terracotta', name: 'Sunset Terracotta', color: '#fcf9f5', textColor: '#2d221e' }
];

const TRANSITIONS = [
  { id: 'slide', name: 'Slide' },
  { id: 'fade', name: 'Fade' },
  { id: 'zoom', name: 'Zoom' }
];

export const SlideController: React.FC<SlideControllerProps> = ({
  currentSlideIndex,
  totalSlides,
  onNavigate,
  transitionType,
  onTransitionChange,
  isFullscreen,
  onFullscreenToggle,
  onPresenterModeToggle,
  theme,
  onThemeChange
}) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showTransitionMenu, setShowTransitionMenu] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  // 마우스 비활성화 시 컨트롤러 자동 투명화 설정
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isFullscreen && !isMouseOver) {
      timer = setTimeout(() => {
        // 투명화 또는 숨기기 처리는 CSS 클래스나 인라인 스타일로
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isFullscreen, isMouseOver]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="slide-controls-container"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 18px',
        borderRadius: '30px',
        transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isFullscreen && !isMouseOver ? 0.35 : 1,
      }}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => {
        setIsMouseOver(false);
        setShowThemeMenu(false);
        setShowTransitionMenu(false);
      }}
    >
      {/* 둥근 Glassmorphic 바 */}
      <div 
        className="glass"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 6px',
          borderRadius: '24px',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        {/* 네비게이션 버튼 */}
        <button
          onClick={() => onNavigate(-1)}
          disabled={currentSlideIndex === 0}
          style={{
            background: 'none',
            border: 'none',
            color: currentSlideIndex === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
            cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease',
          }}
          className="control-btn"
          title="이전 슬라이드 (←)"
        >
          <ChevronLeft size={20} />
        </button>

        <span 
          style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            padding: '0 8px',
            color: 'var(--text-primary)',
            minWidth: '55px',
            textAlign: 'center',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {currentSlideIndex + 1} / {totalSlides}
        </span>

        <button
          onClick={() => onNavigate(1)}
          disabled={currentSlideIndex === totalSlides - 1}
          style={{
            background: 'none',
            border: 'none',
            color: currentSlideIndex === totalSlides - 1 ? 'var(--text-muted)' : 'var(--text-primary)',
            cursor: currentSlideIndex === totalSlides - 1 ? 'not-allowed' : 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease',
          }}
          className="control-btn"
          title="다음 슬라이드 (→, Space)"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* 설정 및 모드 버튼 그룹 */}
      <div 
        className="glass"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 6px',
          borderRadius: '24px',
          position: 'relative',
        }}
      >
        {/* 테마 셀렉터 */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowThemeMenu(!showThemeMenu);
              setShowTransitionMenu(false);
            }}
            style={{
              background: showThemeMenu ? 'var(--accent-light)' : 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="control-btn"
            title="테마 변경"
          >
            <Palette size={18} />
          </button>
          
          {showThemeMenu && (
            <div 
              className="glass"
              style={{
                position: 'absolute',
                bottom: '50px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '8px',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                minWidth: '160px',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onThemeChange(t.id);
                    setShowThemeMenu(false);
                  }}
                  style={{
                    background: theme === t.id ? 'var(--accent-light)' : 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                  }}
                  className="menu-item"
                >
                  <span 
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: t.color,
                      border: '1px solid var(--border-color)',
                      display: 'inline-block'
                    }}
                  />
                  {t.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 애니메이션 트랜지션 셀렉터 */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowTransitionMenu(!showTransitionMenu);
              setShowThemeMenu(false);
            }}
            style={{
              background: showTransitionMenu ? 'var(--accent-light)' : 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="control-btn"
            title="애니메이션 효과"
          >
            <Sparkles size={18} />
          </button>

          {showTransitionMenu && (
            <div 
              className="glass"
              style={{
                position: 'absolute',
                bottom: '50px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '8px',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                minWidth: '120px',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              {TRANSITIONS.map((tr) => (
                <button
                  key={tr.id}
                  onClick={() => {
                    onTransitionChange(tr.id as any);
                    setShowTransitionMenu(false);
                  }}
                  style={{
                    background: transitionType === tr.id ? 'var(--accent-light)' : 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    width: '100%',
                  }}
                  className="menu-item"
                >
                  {tr.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 발표자 모드 버튼 */}
        <button
          onClick={onPresenterModeToggle}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="control-btn"
          title="발표자 도구 열기"
        >
          <Monitor size={18} />
        </button>

        {/* PDF 인쇄 버튼 */}
        <button
          onClick={handlePrint}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="control-btn"
          title="PDF 저장 / 인쇄"
        >
          <Printer size={18} />
        </button>

        {/* 풀스크린 토글 */}
        <button
          onClick={onFullscreenToggle}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="control-btn"
          title={isFullscreen ? "전체화면 종료 (Esc)" : "전체화면 시작 (F)"}
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
      </div>

      {/* 내부 버튼 스타일 주입을 위한 인라인 CSS */}
      <style>{`
        .control-btn:hover {
          background-color: var(--accent-light) !important;
        }
        .menu-item:hover {
          background-color: var(--accent-light) !important;
        }
      `}</style>
    </div>
  );
};
