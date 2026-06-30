import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

export interface SlideData {
  id: string;
  type: string;
  title?: string;
  subtitle?: string;
  notes?: string; // 스피커 노트
  content?: any;  // 슬라이드 레이아웃에 전달할 구체적 데이터
}

interface PresentationViewerProps {
  slides: SlideData[];
  currentSlideIndex: number;
  onSlideChange: (index: number) => void;
  transitionType: 'slide' | 'fade' | 'zoom';
  isFullscreen: boolean;
  renderSlideContent: (slide: SlideData) => React.ReactNode;
}

const slideVariants: Record<'slide' | 'fade' | 'zoom', Variants> = {
  slide: {
    enter: (direction: number) => ({
      x: direction > 0 ? 1920 : -1920,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1920 : -1920,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  },
  fade: {
    enter: { opacity: 0 },
    center: { 
      opacity: 1, 
      transition: { duration: 0.5 } 
    },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.5 } 
    }
  },
  zoom: {
    enter: { scale: 0.8, opacity: 0 },
    center: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
    exit: { 
      scale: 1.1, 
      opacity: 0, 
      transition: { duration: 0.5, ease: "easeIn" } 
    }
  }
};

export const PresentationViewer: React.FC<PresentationViewerProps> = ({
  slides,
  currentSlideIndex,
  onSlideChange,
  transitionType,
  isFullscreen,
  renderSlideContent
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [direction, setDirection] = useState(0); // -1: prev, 1: next

  // 16:9 비율 유지를 위한 스케일 계산
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const slideWidth = 1920;
      const slideHeight = 1080;

      // 전체화면일 때와 일반 모드일 때 스케일 기준을 다르게 처리할 수 있음
      const scaleX = w / slideWidth;
      const scaleY = h / slideHeight;
      
      // 조금의 여백을 주기 위해 전체화면이 아닐 때는 살짝 축소
      const marginFactor = isFullscreen ? 1.0 : 0.92;
      const newScale = Math.min(scaleX, scaleY) * marginFactor;
      
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    // 최초 실행 및 DOM 렌더링 후 타이밍 보정
    const timer = setTimeout(handleResize, 50);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [isFullscreen]);

  // 키보드 내비게이션 지원
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Input 요소를 조작 중일 때는 이벤트 전파 방지
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        navigateSlide(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
        e.preventDefault();
        navigateSlide(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setDirection(-1);
        onSlideChange(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setDirection(1);
        onSlideChange(slides.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, slides.length]);

  const navigateSlide = (step: number) => {
    const nextIndex = currentSlideIndex + step;
    if (nextIndex >= 0 && nextIndex < slides.length) {
      setDirection(step);
      onSlideChange(nextIndex);
    }
  };

  const currentSlide = slides[currentSlideIndex];

  // 각 트랜지션 애니메이션에 전달할 variants
  const activeVariants = transitionType === 'slide' 
    ? slideVariants.slide 
    : transitionType === 'zoom' 
      ? slideVariants.zoom 
      : slideVariants.fade;

  return (
    <div 
      ref={containerRef} 
      className={`presentation-container ${isFullscreen ? 'fullscreen-mode' : ''}`}
    >
      <div 
        className="slide-wrapper"
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={activeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {renderSlideContent(currentSlide)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
