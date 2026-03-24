'use client';

import { useRouter } from 'next/navigation';
import { useConceptStore } from '@/store/useConceptStore';
import ConceptTypeGrid from '@/components/wizard/ConceptTypeGrid';
import Button from '@/components/ui/Button';
import type { ConceptTypeId } from '@/types';
import { useEffect, useState } from 'react';

export default function SelectPage() {
  const router = useRouter();
  const { selectedType, selectType, setStep } = useConceptStore();
  const [localSelected, setLocalSelected] = useState<ConceptTypeId | null>(selectedType);

  useEffect(() => {
    setStep('select');
  }, [setStep]);

  const handleSelect = (type: ConceptTypeId) => {
    setLocalSelected(type);
  };

  const handleNext = () => {
    if (localSelected) {
      selectType(localSelected);
      router.push('/create/questions');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">
          어떤 <span className="gold-gradient-text">컨셉</span>을 만들어볼까요?
        </h1>
        <p className="text-gray-500">5가지 유형 중 하나를 선택하세요</p>
      </div>

      <ConceptTypeGrid selectedType={localSelected} onSelect={handleSelect} />

      <div className="mt-8 flex justify-center">
        <Button
          variant="primary"
          size="lg"
          disabled={!localSelected}
          onClick={handleNext}
        >
          다음 단계로
        </Button>
      </div>
    </div>
  );
}
