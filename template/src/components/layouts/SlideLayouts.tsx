import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { SlideData } from '../PresentationViewer';

// 애니메이션을 위한 공통 컨테이너 Variants (순차 딜레이 렌더링)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20
    }
  }
};

// 1. TitleSlide: 인트로 오프닝 슬라이드
export const TitleSlide: React.FC<{ slide: SlideData }> = ({ slide }) => {
  const { title, subtitle, content = {} } = slide;
  const { author, date, department } = content;

  return (
    <div 
      className="slide-content" 
      style={{ 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 은은하게 움직이는 럭셔리 그라데이션 구체들 */}
      <motion.div 
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'var(--accent-light)',
          filter: 'blur(100px)',
          zIndex: 0,
          top: '-10%',
          left: '10%'
        }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -60, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(236, 72, 153, 0.08)',
          filter: 'blur(120px)',
          zIndex: 0,
          bottom: '-10%',
          right: '15%'
        }}
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 50, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ zIndex: 1, position: 'relative' }}
      >
        {subtitle && (
          <motion.div 
            variants={itemVariants}
            className="slide-subtitle"
            style={{ marginBottom: 'var(--space-md)' }}
          >
            {subtitle}
          </motion.div>
        )}
        
        <motion.h1 
          variants={itemVariants}
          className="slide-title"
          style={{ 
            fontSize: '6.5rem', 
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.05em',
            marginBottom: 'var(--space-xl)',
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}
        >
          {title}
        </motion.h1>

        <motion.div 
          variants={itemVariants}
          style={{ 
            display: 'flex', 
            gap: '32px', 
            justifyContent: 'center', 
            color: 'var(--text-secondary)',
            fontSize: '1.25rem',
            fontWeight: 500,
            marginTop: 'var(--space-md)'
          }}
        >
          {author && <span>{author}</span>}
          {department && <span style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '32px' }}>{department}</span>}
          {date && <span style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '32px' }}>{date}</span>}
        </motion.div>
      </motion.div>
    </div>
  );
};

// 2. SplitSlide: 좌우 분할 콘텐츠 레이아웃
export const SplitSlide: React.FC<{ slide: SlideData }> = ({ slide }) => {
  const { title, subtitle, content = {} } = slide;
  const { leftTexts = [], rightElements = [], imageUrl } = content;
  const [isZoomed, setIsZoomed] = React.useState(false);

  return (
    <div className="slide-content">
      <div className="slide-header">
        <div>
          {subtitle && <div className="slide-subtitle">{subtitle}</div>}
          <h2 className="slide-title" style={{ fontSize: '3rem' }}>{title}</h2>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1.1fr 0.9fr', 
        gap: 'var(--space-xl)', 
        alignItems: 'center',
        flex: 1,
        marginTop: 'var(--space-md)'
      }}>
        {/* 좌측 텍스트 문단 */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}
        >
          {leftTexts.map((text: string, i: number) => (
            <motion.p 
              key={i} 
              variants={itemVariants}
              style={{ fontSize: '1.4rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ))}
        </motion.div>

        {/* 우측 시각 요소 (Glassmorphic Card, Chart, or Image) */}
        {imageUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            whileHover={{ scale: 1.015 }}
            onClick={() => setIsZoomed(true)}
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              height: '450px',
              padding: '12px',
              boxShadow: 'var(--card-shadow)',
              cursor: 'zoom-in'
            }}
          >
            <img 
              src={imageUrl} 
              alt={title || "Diagram"} 
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '12px'
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="glass"
            style={{
              borderRadius: '20px',
              padding: 'var(--space-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              boxShadow: 'var(--card-shadow)',
              height: '100%',
              justifyContent: 'center'
            }}
          >
            {rightElements.map((el: any, i: number) => {
              const IconComponent = el.icon ? (Icons as any)[el.icon] : null;
              return (
                <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  {IconComponent && (
                    <div style={{
                      backgroundColor: 'var(--accent-light)',
                      color: 'var(--accent)',
                      padding: '12px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComponent size={24} />
                    </div>
                  )}
                  <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '6px' }}>{el.title}</h3>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: el.description }} />
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>

      <div className="slide-footer">
        <span>Web-based Presentation System</span>
        <span>Slide Details</span>
      </div>

      {/* 이미지 줌 확대 레이어 */}
      {imageUrl && isZoomed && (
        <div 
          onClick={() => setIsZoomed(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out'
          }}
        >
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={imageUrl} 
            alt={title || "Enlarged Diagram"} 
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              borderRadius: '8px'
            }}
          />
          <button style={{
            position: 'absolute',
            top: '30px',
            right: '40px',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '2.5rem',
            cursor: 'pointer',
            fontWeight: '300'
          }}>✕</button>
        </div>
      )}
    </div>
  );
};

// 3. GridSlide: 3~4개의 핵심 요소 나열 레이아웃
export const GridSlide: React.FC<{ slide: SlideData }> = ({ slide }) => {
  const { title, subtitle, content = {} } = slide;
  const { items = [] } = content;

  return (
    <div className="slide-content">
      <div className="slide-header">
        <div>
          {subtitle && <div className="slide-subtitle">{subtitle}</div>}
          <h2 className="slide-title" style={{ fontSize: '3rem' }}>{title}</h2>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, 1fr)`,
          gap: 'var(--space-md)',
          alignItems: 'stretch',
          flex: 1,
          marginTop: 'var(--space-lg)'
        }}
      >
        {items.map((item: any, i: number) => {
          const IconComponent = item.icon ? (Icons as any)[item.icon] : null;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="glass"
              style={{
                borderRadius: '20px',
                padding: 'var(--space-lg) var(--space-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                justifyContent: 'space-between',
                transition: 'border-color 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {IconComponent && (
                  <div style={{
                    color: 'var(--accent)',
                    backgroundColor: 'var(--accent-light)',
                    width: '54px',
                    height: '54px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <IconComponent size={28} />
                  </div>
                )}
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '10px' }}>{item.title}</h3>
                  <p 
                    style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              </div>
              
              {item.badge && (
                <div style={{
                  alignSelf: 'flex-start',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent)',
                  padding: '4px 10px',
                  borderRadius: '100px'
                }}>
                  {item.badge}
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="slide-footer">
        <span>Strategic Pillars</span>
        <span>Framework Overview</span>
      </div>
    </div>
  );
};

// 4. QuoteSlide: 메시지 강조용 인용문 슬라이드
export const QuoteSlide: React.FC<{ slide: SlideData }> = ({ slide }) => {
  const { title: quote, content = {} } = slide;
  const { author, role } = content;

  return (
    <div 
      className="slide-content"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* 배경 큰 따옴표 데코레이션 */}
      <span style={{
        position: 'absolute',
        fontSize: '32rem',
        fontFamily: 'var(--font-serif)',
        color: 'var(--accent)',
        opacity: 0.04,
        top: '-15%',
        left: '5%',
        userSelect: 'none',
        lineHeight: 1
      }}>“</span>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: '1200px',
          textAlign: 'center',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-lg)'
        }}
      >
        <motion.p
          variants={itemVariants}
          className="font-serif-title"
          style={{
            fontSize: '3.6rem',
            lineHeight: '1.3',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          "{quote}"
        </motion.p>

        {(author || role) && (
          <motion.div 
            variants={itemVariants}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            {author && (
              <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {author}
              </span>
            )}
            {role && (
              <span style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {role}
              </span>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// 5. TimelineSlide: 단계적 로드맵 슬라이드
export const TimelineSlide: React.FC<{ slide: SlideData }> = ({ slide }) => {
  const { title, subtitle, content = {} } = slide;
  const { steps = [] } = content;

  return (
    <div className="slide-content">
      <div className="slide-header">
        <div>
          {subtitle && <div className="slide-subtitle">{subtitle}</div>}
          <h2 className="slide-title" style={{ fontSize: '3rem' }}>{title}</h2>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        flex: 1,
        position: 'relative',
        padding: '0 var(--space-lg)'
      }}>
        {/* 가로 진행 바 배경 라인 */}
        <div style={{
          position: 'absolute',
          left: 'var(--space-lg)',
          right: 'var(--space-lg)',
          height: '4px',
          backgroundColor: 'var(--border-color)',
          zIndex: 0
        }} />

        {/* 애니메이션 진행 상태 라인 */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 'calc(100% - 2 * var(--space-lg))' }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            left: 'var(--space-lg)',
            height: '4px',
            background: 'var(--accent-gradient)',
            zIndex: 1
          }}
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
            gap: 'var(--space-md)',
            zIndex: 2
          }}
        >
          {steps.map((step: any, i: number) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                paddingTop: '30px',
                position: 'relative'
              }}
            >
              {/* 타임라인 노드 원 */}
              <motion.div 
                whileHover={{ scale: 1.2 }}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '4px solid var(--accent)',
                  position: 'absolute',
                  top: '-10px',
                  left: 'calc(50% - 12px)',
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}
              />

              <span style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--accent)',
                backgroundColor: 'var(--accent-light)',
                padding: '4px 12px',
                borderRadius: '30px',
                marginBottom: '16px'
              }}>
                {step.period}
              </span>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                {step.title}
              </h3>
              
              <p 
                style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '280px', lineHeight: '1.5' }}
                dangerouslySetInnerHTML={{ __html: step.description }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="slide-footer">
        <span>Roadmap & Milestones</span>
        <span>Timeline Details</span>
      </div>
    </div>
  );
};

// 6. StatSlide: 대형 메트릭 강조 슬라이드
export const StatSlide: React.FC<{ slide: SlideData }> = ({ slide }) => {
  const { title, subtitle, content = {} } = slide;
  const { metrics = [] } = content;

  return (
    <div className="slide-content">
      <div className="slide-header">
        <div>
          {subtitle && <div className="slide-subtitle">{subtitle}</div>}
          <h2 className="slide-title" style={{ fontSize: '3rem' }}>{title}</h2>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(metrics.length, 3)}, 1fr)`,
          gap: 'var(--space-lg)',
          alignItems: 'center',
          flex: 1,
          marginTop: 'var(--space-lg)'
        }}
      >
        {metrics.map((metric: any, i: number) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <span style={{
              fontSize: '7rem',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              background: 'var(--accent-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'var(--font-sans)',
              display: 'inline-block'
            }}>
              {metric.value}
            </span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {metric.label}
            </h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '380px', margin: '0 auto', lineHeight: '1.5' }}>
              {metric.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="slide-footer">
        <span>Performance & Metrics</span>
        <span>Key Statistics</span>
      </div>
    </div>
  );
};

// 7. MockupSlide: 브라우저/디바이스 디자인 프레임 내 콘텐츠 배치 슬라이드
export const MockupSlide: React.FC<{ slide: SlideData }> = ({ slide }) => {
  const { title, subtitle, content = {} } = slide;
  const { code, language = 'javascript', caption, url = 'https://example.com' } = content;

  const renderMockupContent = () => {
    if (!code) return null;
    
    // 마크다운 표 탐지
    const isMarkdownTable = language === 'markdown' && code.includes('|') && code.split('\n').some((line: string) => line.includes('---') || line.includes(':---'));
    
    if (isMarkdownTable) {
      const lines = code.trim().split('\n').filter((line: string) => line.trim().length > 0);
      if (lines.length >= 2) {
        const headers = lines[0].split('|').map((h: string) => h.trim()).filter((_: string, idx: number, arr: string[]) => idx > 0 && idx < arr.length - 1);
        const rows = lines.slice(2).map((line: string) => {
          return line.split('|').map((cell: string) => cell.trim()).filter((_: string, idx: number, arr: string[]) => idx > 0 && idx < arr.length - 1);
        });
        
        return (
          <div style={{ fontFamily: 'var(--font-sans)', overflowX: 'auto', width: '100%' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '1.05rem',
              color: '#a9b1d6',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', borderBottom: '2px solid rgba(255, 255, 255, 0.15)' }}>
                  {headers.map((h: string, idx: number) => (
                    <th key={idx} style={{ padding: '16px 20px', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }} dangerouslySetInnerHTML={{ __html: h }} />
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row: string[], rowIdx: number) => (
                  <tr key={rowIdx} style={{ 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    backgroundColor: rowIdx % 2 === 1 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
                  }}>
                    {row.map((cell: string, cellIdx: number) => (
                      <td key={cellIdx} style={{ padding: '16px 20px', verticalAlign: 'middle', color: '#cbd5e1' }} dangerouslySetInnerHTML={{ __html: cell }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }

    return (
      <pre style={{ margin: 0 }}>
        <code className={`language-${language}`} style={{ background: 'none', padding: 0, color: 'inherit' }}>
          {code}
        </code>
      </pre>
    );
  };

  return (
    <div className="slide-content">
      <div className="slide-header">
        <div>
          {subtitle && <div className="slide-subtitle">{subtitle}</div>}
          <h2 className="slide-title" style={{ fontSize: '3rem' }}>{title}</h2>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.3fr 0.7fr',
        gap: 'var(--space-xl)',
        alignItems: 'center',
        flex: 1,
        marginTop: 'var(--space-md)'
      }}>
        {/* 좌측 브라우저 목업 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          style={{
            width: '100%',
            backgroundColor: '#1e1e24',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '520px'
          }}
        >
          {/* 브라우저 상단 탭 컨트롤 바 */}
          <div style={{
            height: '44px',
            backgroundColor: '#141416',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            justifyContent: 'space-between'
          }}>
            {/* 세 개의 신호등 버튼 */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
            </div>

            {/* URL 바 */}
            <div style={{
              backgroundColor: '#1e1e24',
              color: '#868e96',
              fontSize: '0.8rem',
              padding: '4px 40px',
              borderRadius: '6px',
              width: '60%',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.03)',
              fontFamily: 'var(--font-mono)'
            }}>
              {url}
            </div>
            
            <div style={{ width: '48px' }} />
          </div>

          {/* 목업 내부 컨텐츠 (코드 렌더러 또는 텍스트 데모) */}
          <div style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
            textAlign: 'left',
            fontFamily: 'var(--font-mono)',
            fontSize: '1.05rem',
            color: '#a9b1d6',
            lineHeight: '1.6',
            backgroundColor: '#1a1b26'
          }}>
            {renderMockupContent()}
          </div>
        </motion.div>

        {/* 우측 캡션 설명 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-md)'
          }}
        >
          <motion.h3 variants={itemVariants} style={{ fontSize: '1.8rem', fontWeight: 700 }}>
            Interactive Demo Frame
          </motion.h3>
          <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            {caption || '브라우저 프레임 내에 코드 스니펫 또는 웹 화면을 배치하여 실제 결과물을 효율적으로 공유하고 전달할 수 있습니다.'}
          </motion.p>
        </motion.div>
      </div>

      <div className="slide-footer">
        <span>Mockup & Code Showcase</span>
        <span>Interactive Frame</span>
      </div>
    </div>
  );
};
