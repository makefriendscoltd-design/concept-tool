'use client';

import { cn } from '@/lib/utils';
import type { WizardStep } from '@/types';

const STEPS: { key: WizardStep; label: string; number: number }[] = [
  { key: 'select', label: '유형 선택', number: 1 },
  { key: 'questions', label: '질문 답변', number: 2 },
  { key: 'result', label: '컨셉 생성', number: 3 },
];

const stepOrder: WizardStep[] = ['select', 'questions', 'result'];

interface StepIndicatorProps {
  currentStep: WizardStep;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-md mx-auto">
      {STEPS.map((step, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500',
                  isCompleted && 'bg-gold-500 text-dark-900',
                  isActive && 'bg-gold-500/20 border-2 border-gold-500 text-gold-400',
                  !isActive && !isCompleted && 'bg-dark-300 border border-dark-50/50 text-gray-600'
                )}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  'text-xs font-medium whitespace-nowrap transition-colors duration-300',
                  isActive ? 'text-gold-400' : isCompleted ? 'text-gold-600' : 'text-gray-600'
                )}
              >
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  'w-16 h-0.5 mx-2 mb-5 transition-colors duration-500',
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
