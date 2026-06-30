import type { SlideData } from '../components/PresentationViewer';

export const DEMO_SLIDES: SlideData[] = [
  {
    id: 'slide-1',
    type: 'title',
    title: '루프 엔지니어링의 기술\n(The Art of Loop Engineering)',
    subtitle: '신뢰할 수 있는 AI 에이전트를 구축하기 위한 4단계 루프 디자인',
    notes: '안녕하세요. 오늘 발표에서는 랭체인 블로그에 소개된 "루프 엔지니어링의 기술(The Art of Loop Engineering)" 내용을 바탕으로, AI 에이전트의 신뢰성과 생산 품질을 어떻게 극대화할 수 있는지 핵심 루프 아키텍처 4단계를 소개해 드리겠습니다.',
    content: {
      author: 'Sydney Runkle (LangChain)',
      department: 'Antigravity AI Presentation',
      date: '2026년 6월'
    }
  },
  {
    id: 'slide-2',
    type: 'split',
    title: 'Loop 1: 에이전트 루프 (Agent Loop)',
    subtitle: '에이전트의 가장 기본적이고 핵심적인 형태',
    notes: '첫 번째 수준은 기본 에이전트 루프입니다. LLM에게 컨텍스트를 제공하고 작업이 끝날 때까지 도구를 루프 내에서 반복 호출하게 합니다. 도구(Tools)가 에이전트의 행동 반경을 넓혀 줍니다.',
    content: {
      leftTexts: [
        '에이전트의 작동 원리는 간단합니다. 모델에게 컨텍스트를 제공하고, 작업이 완료될 때까지 <strong>외부 도구를 반복적으로 호출</strong>하도록 하는 루프 구조입니다.',
        '<strong>실무 사례 (Docs-writer 에이전트)</strong>: 문서 개선 요청이 슬랙을 통해 접수되면, 에이전트가 계획을 수립하고, 저장소를 클론하며, 파일을 수정하여 최종 <strong>Pull Request를 자율적으로 생성</strong>합니다.',
        '하지만 이 기본 루프만으로는 <span style="color: var(--accent); font-weight: 700;">첫 시도 만에 일관되거나 완벽한 품질</span>의 코드 및 결과물을 보장하기 어렵습니다.'
      ],
      imageUrl: 'https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a317dca401c7eac8f267ab7_docs_writer_agent_loop_white_bg.png'
    }
  },
  {
    id: 'slide-3',
    type: 'split',
    title: 'Loop 2: 검증 루프 (Verification Loop)',
    subtitle: '결과물의 일관성과 품질을 보장하기 위한 안전장치',
    notes: '두 번째 수준은 검증 루프입니다. 결과물이 완벽할 때까지 Grader가 결과물을 채점하고 모델에게 구체적인 디버그 피드백을 전달하여 재수행하게 합니다.',
    content: {
      leftTexts: [
        '품질 일관성이 중요할 때는 에이전트를 검증 루프로 감싸야 합니다. 검증기(Grader)가 <strong>정해진 루브릭(Rubric) 기준에 맞춰 결과물을 평가</strong>하고 피드백을 전송합니다.',
        '<strong>실무 사례 (Docs-writer 에이전트)</strong>: 변경 내용에 대해 자동 링크 검사 및 CI 빌드 테스트를 수행합니다. 빌드 오류 등 에러가 감출되면 해당 정보를 에이전트에 피드백하여 <span style="color: var(--accent); font-weight: 700;">스스로 에러를 고쳐 재시도(Self-Correction)</span>하게 만듭니다.',
        '검증 루프를 추가하면 실행 횟수 증가로 인해 비용과 레이턴시가 늘어나지만, <strong>신뢰도가 중요한 프로덕션 환경에서는 필수 불가결</strong>한 요소입니다.'
      ],
      imageUrl: 'https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a317dd76a131bd58de00fb9_docs_writer_verification_loop_white_bg.png'
    }
  },
  {
    id: 'slide-4',
    type: 'split',
    title: 'Loop 3: 이벤트 기반 루프 (Event-Driven Loop)',
    subtitle: '실제 비즈니스 시스템과 상시간 긴밀하게 결합',
    notes: '세 번째 수준은 이벤트 기반 루프입니다. 수동으로 호출하는 것을 넘어 백그라운드에서 이벤트 트리거와 웹훅, 스케줄을 통해 실시간 동작하는 통합 시스템입니다.',
    content: {
      leftTexts: [
        '에이전트가 일회성 실행 도구에 머무르지 않고, 백그라운드에서 상시 동작하며 <strong>실제 외부 에코시스템과 유기적으로 호흡</strong>하는 단계입니다.',
        '<strong>실무 사례 (Docs-writer 에이전트)</strong>: 개발자가 Slack 채널에 새로운 문서 개선 건을 작성하면, <strong>웹훅(Webhook) 또는 크론(Cron) 스케줄 트리거</strong>가 작동하여 에이전트를 깨우고 자율 작업을 시작합니다.',
        '이벤트 기반 루프는 <span style="color: var(--accent); font-weight: 700;">LangSmith Deployment의 트리거 인프라</span>나 Fleet channels 등을 활용하여 대규모 자동화 스케일로 구성할 수 있습니다.'
      ],
      imageUrl: 'https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a317e185240aaebb95cc7c3_docs_writer_event_loop_white_bg.png'
    }
  },
  {
    id: 'slide-5',
    type: 'split',
    title: 'Loop 4: 힐 클라이밍 루프 (Hill Climbing Loop)',
    subtitle: '운영 데이터를 분석하여 에이전트 사양 자체를 스스로 튜닝',
    notes: '마지막 네 번째 수준은 힐 클라이밍 루프입니다. 운영 로그(트레이스) 데이터를 분석하여 에이전트의 프롬프트나 도구 설정을 스스로 점진적으로 향상시킵니다.',
    content: {
      leftTexts: [
        '앞의 세 루프가 작업을 자동화한다면, 힐 클라이밍 루프는 <span style="color: var(--accent); font-weight: 700;">에이전트 시스템 자체의 성장과 진화를 자동화</span>합니다.',
        '<strong>실무 사례 (Docs-writer 에이전트)</strong>: 축적된 생산 트레이스(Trace) 로그 데이터를 분석 에이전트가 검토하여 병목이나 잦은 실패의 공통 원인을 짚어냅니다. 이후 <strong>프롬프트 지침을 자동 보완하거나 도구 설정을 업데이트(Update Harness)</strong>합니다.',
        '이러한 Outer-loop의 결과물은 프롬프트 튜닝을 넘어, 향후 open-weight 모델의 <strong>미세조정(RL fine-tuning)을 위한 고품질 피드백 데이터</strong>로도 유용하게 활용됩니다.'
      ],
      imageUrl: 'https://cdn.prod.website-files.com/65c81e88c254bb0f97633a71/6a317ea8af8c1790096c468d_docs_writer_hill_climbing_loop_v4_white_bg.png'
    }
  },
  {
    id: 'slide-6',
    type: 'grid',
    title: '자동화 속 인간의 협업 (Human-in-the-Loop)',
    subtitle: '모든 루프 레벨의 적재적소에 인간의 피드백을 가미',
    notes: '루프 엔지니어링의 자율성이 인간의 배제를 뜻하지는 않습니다. 품질과 신뢰성을 위해 각 수준에서 사람이 개입할 수 있는 포인트를 유연하게 제공합니다.',
    content: {
      items: [
        {
          icon: 'Shield',
          title: '도구 승인 (Agent Loop)',
          description: '에이전트 루프에서 DB 삭제, 금융 거래 등 <strong>위험도가 높은 민감한 도구를 실행하기 전</strong>에 인간의 최종 클릭 승인을 요구합니다.',
          badge: '보안 정책'
        },
        {
          icon: 'UserCheck',
          title: '인간 평가원 (Verification)',
          description: '자동화된 검사기(Grader)가 놓칠 수 있는 뉘앙스, 브랜드 가치, 설명의 완성도 등을 <span style="color: var(--accent); font-weight: 700;">사람이 직접 정성 검수(Human Grader)</span>합니다.',
          badge: '품질 관리'
        },
        {
          icon: 'TrendingUp',
          title: '개선안 검토 (Hill Climbing)',
          description: '힐 클라이밍 루프에 의해 자동 제안된 <strong>새로운 프롬프트나 튜닝 사양</strong>을 실제 프로덕션에 배포하기 전에 검토하고 승인합니다.',
          badge: '배포 승인'
        }
      ]
    }
  },
  {
    id: 'slide-7',
    type: 'quote',
    title: '인간의 판단력과 토큰 자본이 함께 결합되는 학습 루프를 일찍 구축하는 기업이 앞으로 복제하기 힘든 경쟁 우위를 가지게 될 것이다.',
    notes: '사티아 나델라의 말을 인용한 슬라이드입니다. 결국 AI의 토큰 비용과 인간의 고차원적 판단력이 선순환 루프를 형성하도록 에코시스템을 설계하는 조직이 절대적인 우위에 서게 될 것입니다.',
    content: {
      author: 'Satya Nadella',
      role: 'Microsoft CEO'
    }
  },
  {
    id: 'slide-8',
    type: 'mockup',
    title: '루프 엔지니어링 스택 요약',
    subtitle: '각 루프의 기능, 목표 및 LangChain Primitive 구조',
    notes: '마지막으로 4가지 루프를 요약한 스택 표입니다. 에이전트 루프부터 힐 클라이밍 루프까지 이어지는 구조를 보여줍니다.',
    content: {
      url: 'https://www.langchain.com/blog/the-art-of-loop-engineering',
      language: 'markdown',
      code: `| 루프 수준 | 역할 (What it does) | 임팩트 (Impact) | LangChain Primitive |
| :--- | :--- | :--- | :--- |
| 1. 에이전트 루프 | 작업 완료 시까지 도구 반복 호출 | 작업 자동화 | create_agent, Tools |
| 2. 검증 루프 | 루브릭 기반 평가 및 피드백 재시도 | 품질 및 정확성 보장 | RubricMiddleware, LLM-as-a-judge |
| 3. 이벤트 루프 | 외부 시스템 이벤트 기반 자동 실행 | 대규모 자동화 | LangSmith Deployment, webhooks |
| 4. 힐 클라이밍 | 실시간 트레이스 분석 통한 자동 최적화 | 하네스 설정 및 프롬프트 개선 | LangSmith Engine, RL fine-tuning |`,
      caption: '각각의 루프는 계층적으로 중첩(Stacking)되어 작동하며, <span style="color: var(--accent); font-weight: 700;">상위 루프가 하위 루프의 하네스(Harness) 구성을 업데이트</span>해 나가는 것이 루프 엔지니어링의 정수입니다.'
    }
  }
];
