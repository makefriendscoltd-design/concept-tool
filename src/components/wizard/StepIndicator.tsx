'use client';

import { cn } from '@/lib/utils';
import type { WizardStep } from '@/types';

const STEPS: { key: WizardStep; label: string; number: number }[] = [
  { key: 'product', label: '제품 입력', number: 1 },
  { key: 'select', label: '접근법 선택', number: 2 },
  { key: 'questions', label: '상세 질문', number: 3 },
  { key: 'result', label: '컨셉 생성', number: 4 },
];

const stepOrder: WizardStep[] = ['product', 'select', 'questions', 'result'];

interface StepIndicatorProps {
  currentStep: WizardStep;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-lg mx-auto">
      {STEPS.map((step, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500',
                  isCompleted && 'bg-gold-500 text-dark-900',
                  isActive && 'bg-gold-500/20 border-2 border-gold-500 text-gold-400',
                  !isActive && !isCompleted && 'bg-dark-300 border border-dark-50/50 text-gray-600'
                )}
              >
                {isCompleted ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium whitespace-nowrap transition-colors duration-300',
                  isActive ? 'text-gold-400' : isCompleted ? 'text-gold-600' : 'text-gray-600'
                )}
              >
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  'w-10 h-0.5 mx-1.5 mb-5 transition-colors duration-500',
                  index < currentIndex ? 'bg-gold-500' : 'bg-dark-50/50'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
