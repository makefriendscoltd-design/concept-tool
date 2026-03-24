import type { ConceptTypeDefinition } from '@/types';

export const CONCEPT_TYPES: ConceptTypeDefinition[] = [
  {
    id: 'function',
    nameKo: '기능 컨셉',
    nameEn: 'Function Concept',
    description: '제품의 기능을 재정의하여 같은 카테고리에서 완전히 다르게 보이게 만듭니다.',
    icon: '⚙️',
    examples: ['섭식 탈취제', '장벽 재건 크림', '72시간 지속 포뮬러'],
    color: 'from-amber-500 to-yellow-600',
  },
  {
    id: 'seller',
    nameKo: '판매자 컨셉',
    nameEn: 'Seller Concept',
    description: '제품이 아닌 "파는 사람"을 브랜드화하여 신뢰와 차별성을 만듭니다.',
    icon: '👤',
    examples: ['미생물 아저씨', '실패 100번 사장', '성분 덕후 실험광'],
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'customer-identity',
    nameKo: '고객 정체성 컨셉',
    nameEn: 'Customer Identity Concept',
    description: '제품을 사는 순간 고객이 "어떤 사람"이 되는지를 설계합니다.',
    icon: '🎯',
    examples: ['관리하는 남자 전용', '상위 1% 루틴', '아는 사람만 아는 브랜드'],
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'situation',
    nameKo: '상황 전환 컨셉',
    nameEn: 'Situation Concept',
    description: '제품의 카테고리는 그대로, 사용하는 "순간"을 새로 만들어냅니다.',
    icon: '⏰',
    examples: ['출근 10분 전 전용', '운동 직후 전용', '월요일 회복템'],
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'business-model',
    nameKo: '구조 설계 컨셉',
    nameEn: 'Business Model Concept',
    description: '같은 제품을 완전히 다른 구조와 방식으로 팔아 시장을 바꿉니다.',
    icon: '🏗️',
    examples: ['리필 구독 모델', '7일 체험 후 결제', '100명 한정 실험단'],
    color: 'from-orange-500 to-red-600',
  },
];
