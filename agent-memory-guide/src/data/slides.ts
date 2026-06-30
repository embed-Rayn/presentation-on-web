import type { SlideData } from '../components/PresentationViewer';

export const DEMO_SLIDES: SlideData[] = [
  {
    id: 'slide-1',
    type: 'title',
    title: 'AI 에이전트에게\n기억(Memory)을 부여하는 방법',
    subtitle: 'LangSmith를 활용한 지속적인 학습 루프 구축',
    notes: '여러분 안녕하세요. 오늘 발표는 AI 에이전트에게 메모리, 즉 기억을 부여하여 지속적으로 학습하는 시스템을 구축하는 방법에 관한 것입니다. LangChain 블로그의 내용을 바탕으로 단기와 장기 메모리의 구분, 그리고 LangSmith를 활용한 구체적인 구현 방안을 살펴보겠습니다.',
    content: {
      author: 'LangChain 기술 공유 세션',
      department: 'AI & Agent Architecture Division',
      date: '2026년 6월'
    }
  },
  {
    id: 'slide-2',
    type: 'split',
    title: '왜 에이전트에게 메모리가 필요한가?',
    subtitle: '반복적인 교정을 극복하고 함께 성장하는 에이전트',
    notes: '일반적인 AI 에이전트는 세션이 끝나면 모든 정보가 리셋됩니다. 그렇기 때문에 사용자는 에이전트가 실수를 할 때마다 매번 동일한 피드백을 반복해서 제공해야 합니다. 에이전트에게 메모리를 제공하는 것은 이러한 비효율을 극복하고, 사용자의 의도와 피드백을 기억하여 매 실행마다 똑똑해지는 에이전트를 만들기 위한 핵심 열쇠입니다.',
    content: {
      leftTexts: [
        '에이전트에 <strong>지속적인 학습 루프(Loop)</strong>를 결합하여 사용자 피드백 기반 동적 성장 시스템 구축.',
        '<strong>첫 번째 교정 시점에 배운 것을 영구 기억</strong>함으로써 사용자의 반복적인 교정 요구 및 수동 피드백 비효율성 제거.',
        '백그라운드에서 실행 실수와 피드백을 분석하여 <strong>유의미한 시그널 추출 및 데이터 구조화</strong> 수행.'
      ],
      rightElements: [
        {
          icon: 'UserCheck',
          title: '사용자 반복 교정 제거',
          description: '동일 행동 지침 및 톤앤매너 수정의 중복 피드백 최소화.'
        },
        {
          icon: 'Brain',
          title: '지속적인 성능 개선',
          description: '시간 흐름에 따른 에이전트 업무 역량의 점진적 상향 평준화.'
        }
      ]
    }
  },
  {
    id: 'slide-3',
    type: 'grid',
    title: '메모리의 두 가지 영역',
    subtitle: '단기 메모리(Working Memory) vs 장기 메모리(Long-term Memory)',
    notes: '에이전트 메모리는 크게 단기 메모리와 장기 메모리로 나뉩니다. 단기 메모리는 현재 작업을 완료하기 위한 임시 저장 공간이며, 장기 메모리는 여러 세션에 걸쳐 에이전트의 성향과 업무 규칙을 정의하는 영구 저장소입니다.',
    content: {
      items: [
        {
          icon: 'Cpu',
          title: '단기 메모리 (Short-term)',
          description: '현재 수행 중인 <strong>하나의 작업 스레드 내 유효한 임시 콘텍스트</strong>.<br>최근 대화, 도구 실행 결과, 조회 문서, 중간 추론 및 임시 파일 보관.',
          badge: 'Working Memory'
        },
        {
          icon: 'Database',
          title: '장기 메모리 (Long-term)',
          description: '현재 세션을 넘어 다음 실행 시에도 유지되는 영구 데이터.<br>사용자 선호도, 검증 워크플로우, 프롬프트 지침, 스킬 저장.',
          badge: 'Durable Context'
        },
        {
          icon: 'RefreshCw',
          title: '읽기/쓰기 순환 루프',
          description: '장기 메모리 읽기를 통한 행동 결정, 실행 중 단기 메모리 갱신, 실행 후 <strong>트레이스 분석을 통한 장기 메모리 업데이트</strong> 순환.',
          badge: 'Read & Write Cycle'
        }
      ]
    }
  },
  {
    id: 'slide-4',
    type: 'split',
    title: '장기 메모리의 3가지 기둥',
    subtitle: '인지과학에서 영감을 얻은 에이전트 장기 기억 모델',
    notes: '장기 메모리는 다시 세만틱(의미), 에피소딕(일화), 프로시저럴(절차) 메모리로 분류할 수 있습니다. 특히 에이전트의 행동 개선을 위해서는 어떻게 행동할지에 대한 절차적 메모리를 업데이트하는 것이 핵심입니다.',
    content: {
      leftTexts: [
        '<strong>Semantic Memory (의미 기억)</strong>: 사실적 지식, 유저 프로필 및 명시적 선호도(Preferences) 저장.',
        '<strong>Episodic Memory (일화 기억)</strong>: 과거 수행 경험 및 성공 사례(Few-shot Examples)와 실행 로그 보관.',
        '<strong>Procedural Memory (절차 기억)</strong>: 에이전트의 구체적 행동 규칙. <strong>프롬프트 지침, 워크플로우 정책, 도구 사용 규칙</strong> 정의.',
        '에이전트 개선 시 <strong>절차 기억(Procedural Memory)의 보완</strong>이 가장 효과적이며, 도구 호출 순서 및 스타일 교정에 직접 반영됨.'
      ],
      imageUrl: '/agent_memory_types.png'
    }
  },
  {
    id: 'slide-5',
    type: 'timeline',
    title: '에이전트 메모리 작동 프로세스 3단계',
    subtitle: '데이터 캡처부터 분석, 업데이트까지의 지속적 피드백 루프',
    notes: '에이전트 메모리 시스템이 제대로 작동하기 위해서는 캡처, 분석, 업데이트의 3단계 흐름이 정교하게 연결되어야 합니다. 단순히 트레이스를 쌓는 것만으로는 메모리가 되지 않고, 분석을 통해 정제된 규칙만 메모리로 환원됩니다.',
    content: {
      steps: [
        {
          period: '1단계: Capture Traces',
          title: '실행 증거 수집 (트레이스 캡처)',
          description: '사용자 입력, LLM 호출 로그, 도구 입출력, 라우팅 결정 등 모든 실행 궤적을 <strong>트레이스 레이어</strong>에 상세 기록함.'
        },
        {
          period: '2단계: Analyze Traces',
          title: '피드백 분석 (시그널 추출)',
          description: '반복적인 실수 및 오류 패턴 진단.<br>잘못된 출력이나 라우팅 에러의 근본 원인을 백그라운드 분석을 통해 도출함.'
        },
        {
          period: '3단계: Update Memory',
          title: '장기 메모리 업데이트 (지속성 부여)',
          description: '분석된 시그널을 바탕으로 프롬프트를 보완하거나 Few-shot 예시를 추가하여 <strong>장기 메모리 스토어에 갱신 반영</strong>함.'
        }
      ]
    }
  },
  {
    id: 'slide-6',
    type: 'split',
    title: 'LangSmith로 구현하는 메모리 루프',
    subtitle: 'Observability, Engine, Context Hub의 시너지',
    notes: 'LangChain 생태계에서는 LangSmith의 세 가지 핵심 기능을 사용하여 이 세 단계를 온전히 구현할 수 있습니다. Observability는 트레이스 캡처를, Engine은 백그라운드 분석을, Context Hub는 버전 관리되는 메모리 저장소 역할을 합니다.',
    content: {
      leftTexts: [
        '<strong>1. Capture -> LangSmith Observability</strong>: 에이전트의 모든 판단 경로와 이력을 실시간 시각화하는 <strong>트레이스 저장소</strong> 운영.',
        '<strong>2. Analyze -> LangSmith Engine</strong>: 수동 분석 탈피, 백그라운드 자율 분석을 통해 반복 오류 감지 및 <strong>구체적인 프롬프트 수정안/스킬 업데이트 제안</strong>.',
        '<strong>3. Update -> LangSmith Context Hub</strong>: 코드 내 하드코딩된 지침을 버전 관리되는 에이전트 지식 스토어로 변환하여 <strong>실시간 최신 메모리 로딩</strong> 지원.'
      ],
      imageUrl: '/agent_memory_loop.png'
    }
  },
  {
    id: 'slide-7',
    type: 'grid',
    title: '에이전트 메모리 설계의 3대 원칙',
    subtitle: '신뢰성 있고 효율적인 메모리 루프 구축을 위해 실무에서 배워야 할 점들',
    notes: '실제 에이전트에 메모리 루프를 적용할 때 주의해야 할 세 가지 실무적 원칙이 있습니다. 모든 정보를 무작정 저장하지 않고, 캐싱을 고려해야 하며, 에코 챔버 현상이나 잘못된 규칙으로의 퇴행을 막기 위해 평가(Evals)를 필수적으로 제공해야 합니다.',
    content: {
      items: [
        {
          icon: 'Filter',
          title: '1. 메모리 업데이트의 필터링',
          description: '모든 실행 이력을 무작정 저장하는 대신, <strong>검증된 규칙과 명확한 사용자 성향 시그널만 선택적으로 장기 메모리에 보완</strong>함.',
          badge: 'Selective Memory'
        },
        {
          icon: 'Zap',
          title: '2. 최신 콘텍스트와 캐싱 제어',
          description: '가동 중 메모리가 업데이트될 때, 시스템 런타임에서 낡은 캐시를 보지 않도록 <strong>즉각적인 프롬프트/스킬 갱신(Refresh) 경로 확보</strong> 필요.',
          badge: 'Caching & Refresh'
        },
        {
          icon: 'ShieldAlert',
          title: '3. 퇴행 방지를 위한 평가(Evals)',
          description: '메모리 업데이트가 기존 정상 동작을 망치는 현상 방지.<br>적용 전 <strong>자동 평가 시스템(Evals)을 통해 최소 핵심 기능 회귀 검증 필수</strong>.',
          badge: 'Regression Evals'
        }
      ]
    }
  },
  {
    id: 'slide-8',
    type: 'quote',
    title: '메모리를 가진 에이전트는 사용자와 함께 진화하며, 매 실행마다 스스로의 실수를 치료하고 교정 지침을 영구적인 지혜로 흡수합니다.',
    notes: '오늘 발표의 요약입니다. 에이전트의 메모리 루프는 일시적인 챗봇 형태를 벗어나 인간과 진정으로 협력하고 자가 교정할 수 있는 에이전트 시스템을 위한 필수 관문입니다. 경청해 주셔서 감사합니다.',
    content: {
      author: 'LangChain Memory Architecture',
      role: 'Building durable learning loops for AI systems'
    }
  }
];
