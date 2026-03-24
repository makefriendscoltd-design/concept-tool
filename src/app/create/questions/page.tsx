'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useConceptStore } from '@/store/useConceptStore';
import { QUESTIONS_BY_TYPE } from '@/lib/constants/questions';
import { CONCEPT_TYPES } from '@/lib/constants/concept-types';
import QuestionForm from '@/components/wizard/QuestionForm';
import type { Answers } from '@/types';

export default function QuestionsPage() {
  const router = useRouter();
  const { selectedType, productDescription, answers, setAnswers, setStep } = useConceptStore();

  useEffect(() => {
    if (!productDescription) {
      router.replace('/create/product');
      return;
    }
    if (!selectedType) {
      router.replace('/create/select');
      return;
    }
    setStep('questions');
  }, [selectedType, productDescription, router, setStep]);

  if (!selectedType) return null;

  const questions = QUESTIONS_BY_TYPE[selectedType];
  const typeInfo = CONCEPT_TYPES.find((t) => t.id === selectedType);

  // Pre-fill the product question with productDescription
  const mergedAnswers: Answers = {
    product: productDescription,
    ...answers,
  };

  const handleSubmit = (newAnswers: Answers) => {
    setAnswers(newAnswers);
    setStep('result');
    router.push('/create/result');
  };

  const handleBack = () => {
    setStep('select');
    router.push('/create/select');
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-300 border border-dark-50/50 mb-4">
          <span>{typeInfo?.icon}</span>
          <span className="text-sm font-medium text-gold-400">{typeInfo?.nameKo}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">
          상세 정보를 <span className="gold-gradient-text">알려주세요</span>
        </h1>
        <p className="text-gray-500">답변이 구체적일수록 더 좋은 컨셉이 나옵니다</p>
      </div>

      <div className="card-dark p-6 md:p-8">
        <QuestionForm
          questions={questions}
          initialAnswers={mergedAnswers}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
