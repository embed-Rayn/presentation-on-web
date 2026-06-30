import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, BookOpen, List, ArrowRight } from 'lucide-react';
import type { SlideData } from './PresentationViewer';

interface PresenterConsoleProps {
  slides: SlideData[];
  currentSlideIndex: number;
  onSlideChange: (index: number) => void;
  onClose: () => void;
  renderSlideContent: (slide: SlideData) => React.ReactNode;
}

export const PresenterConsole: React.FC<PresenterConsoleProps> = ({
  slides,
  currentSlideIndex,
  onSlideChange,
  onClose,
  renderSlideContent
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 타이머 로직
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // 현재 시각 갱신
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [
      h > 0 ? String(h).padStart(2, '0') : null,
      String(m).padStart(2, '0'),
      String(s).padStart(2, '0')
    ].filter(Boolean).join(':');
  };

  const currentSlide = slides[currentSlideIndex];
  const nextSlide = currentSlideIndex < slides.length - 1 ? slides[currentSlideIndex + 1] : null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0b0d',
        color: '#f3f4f6',
        zIndex: 200,
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gridTemplateRows: '80px 1fr 180px',
        gridTemplateAreas: `
          "header sidebar"
          "main sidebar"
          "footer sidebar"
        `,
        fontFamily: 'var(--font-sans)',
        boxSizing: 'border-box'
      }}
    >
      {/* 1. 상단 바 (헤더) */}
      <header 
        style={{
          gridArea: 'header',
          borderBottom: '1px solid #1a1c20',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          backgroundColor: '#121316'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)' }}>
            PRESENTER CONSOLE
          </span>
          <span style={{ fontSize: '0.9rem', color: '#6b7280', borderLeft: '1px solid #2e303a', paddingLeft: '16px' }}>
            슬라이드 {currentSlideIndex + 1} / {slides.length}
          </span>
        </div>

        {/* 타이머 & 현재 시각 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {/* 타이머 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Clock size={18} style={{ color: '#9ca3af' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 600 }}>
              {formatTime(elapsedTime)}
            </span>
            <button 
              onClick={() => setTimerRunning(!timerRunning)}
              style={{
                background: '#1a1c20',
                border: '1px solid #2e303a',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {timerRunning ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button 
              onClick={() => setElapsedTime(0)}
              style={{
                background: '#1a1c20',
                border: '1px solid #2e303a',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="타이머 초기화"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* 현재 시각 */}
          <div style={{ fontSize: '1.1rem', color: '#9ca3af', fontWeight: 500 }}>
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'var(--accent)',
              border: 'none',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            콘솔 닫기
          </button>
        </div>
      </header>

      {/* 2. 메인 컨텐츠 영역 (현재 슬라이드 & 다음 슬라이드 미리보기) */}
      <main 
        style={{
          gridArea: 'main',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '24px',
          padding: '24px',
          backgroundColor: '#0a0b0d',
          overflow: 'hidden'
        }}
      >
        {/* 현재 슬라이드 (크게) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
          <div style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>CURRENT SLIDE</span>
          </div>
          <div 
            style={{
              flex: 1,
              backgroundColor: '#121316',
              border: '2px solid var(--accent)',
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* 스케일 다운하여 미리보기 컨텐츠 렌더링 */}
            <div 
              style={{
                width: '1920px',
                height: '1080px',
                transform: 'scale(0.35)',
                transformOrigin: 'top left',
                position: 'absolute',
                top: 0,
                left: 0
              }}
            >
              {renderSlideContent(currentSlide)}
            </div>
          </div>
        </div>

        {/* 다음 슬라이드 (작게) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
          <div style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>NEXT SLIDE</span>
            <ArrowRight size={14} />
          </div>
          <div 
            style={{
              flex: 1,
              backgroundColor: '#121316',
              border: '1px solid #1a1c20',
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative',
              opacity: nextSlide ? 1 : 0.4,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
            }}
          >
            {nextSlide ? (
              <div 
                style={{
                  width: '1920px',
                  height: '1080px',
                  transform: 'scale(0.3)',
                  transformOrigin: 'top left',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              >
                {renderSlideContent(nextSlide)}
              </div>
            ) : (
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4b5563',
                fontSize: '1.2rem',
                fontWeight: 600
              }}>
                마지막 슬라이드입니다.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 3. 하단 스피커 노트 영역 */}
      <footer 
        style={{
          gridArea: 'footer',
          borderTop: '1px solid #1a1c20',
          padding: '20px 24px',
          backgroundColor: '#121316',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', fontWeight: 600, fontSize: '0.9rem' }}>
          <BookOpen size={16} />
          <span>SPEAKER NOTES</span>
        </div>
        <div 
          style={{
            flex: 1,
            backgroundColor: '#0a0b0d',
            border: '1px solid #2e303a',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '1.25rem',
            lineHeight: '1.6',
            color: '#e5e7eb',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap'
          }}
        >
          {currentSlide.notes || "이 슬라이드에 대한 스피커 노트가 없습니다."}
        </div>
      </footer>

      {/* 4. 우측 사이드바 (슬라이드 목록 내비게이션) */}
      <aside 
        style={{
          gridArea: 'sidebar',
          borderLeft: '1px solid #1a1c20',
          backgroundColor: '#121316',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            padding: '24px',
            borderBottom: '1px solid #1a1c20',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#f3f4f6'
          }}
        >
          <List size={18} style={{ color: 'var(--accent)' }} />
          <span>SLIDE NAVIGATION</span>
        </div>

        <div 
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px'
          }}
        >
          {slides.map((s, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <button
                key={s.id}
                onClick={() => onSlideChange(index)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: isActive ? 'var(--accent-light)' : 'none',
                  border: isActive ? '1px solid var(--accent)' : '1px solid transparent',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  color: isActive ? '#fff' : '#9ca3af',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: isActive ? 'var(--accent)' : '#4b5563' }}>
                  SLIDE {index + 1}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {s.title || `레이아웃: ${s.type}`}
                </div>
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
};
