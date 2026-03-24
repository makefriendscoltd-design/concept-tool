'use client';

import StepIndicator from '@/components/wizard/StepIndicator';
import { useConceptStore } from '@/store/useConceptStore';

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  const currentStep = useConceptStore((s) => s.currentStep);

  return (
    <div className="min-h-screen bg-dark-500 flex flex-col">
      <div className="pt-8 pb-6 px-4">
        <StepIndicator currentStep={currentStep} />
      </div>
      <div className="flex-1 px-4 pb-12">
        <div className="max-w-3xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
