'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useConceptStore } from '@/store/useConceptStore';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

export default function ProductPage() {
  const router = useRouter();
  const { productDescription, setProductDescription, setStep } = useConceptStore();
  const [localValue, setLocalValue] = useState(productDescription);

  useEffect(() => {
    setStep('product');
  }, [setStep]);

  const handleNext = () => {
    if (localValue.trim()) {
      setProductDescription(localValue.trim());
      setStep('select');
      router.push('/create/select');
    }
  };

  const canProceed = localValue.trim().length > 0;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">
          무엇을 <span className="gold-gradient-text">팔고 싶나요?</span> 혹은 무엇을 <span className="gold-gradient-text">판매중</span>인가요?
        </h1>
        <p className="text-gray-500">제품이나 서비스를 간단히 설명해주세요</p>
      </div>

      <div className="card-dark p-6 md:p-8 max-w-2xl mx-auto">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          제품/서비스 설명
        </label>
        <Textarea
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder="예: 천연 유기농 성분으로 만든 스킨케어 화장품"
          maxLength={200}
          showCount
          className="min-h-[120px]"
        />
        <p className="text-xs text-gray-600 mt-2">
          구체적으로 작성할수록 더 정확한 컨셉을 추천받을 수 있습니다
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          variant="primary"
          size="lg"
          disabled={!canProceed}
          onClick={handleNext}
        >
          윤대표 AI 컨셉 추천받기
        </Button>
      </div>
    </div>
  );
}
