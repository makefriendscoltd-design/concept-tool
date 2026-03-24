'use client';

import { create } from 'zustand';
import type { ConceptTypeId, Answers, ConceptResult, WizardStep } from '@/types';

interface ConceptStore {
  currentStep: WizardStep;
  selectedType: ConceptTypeId | null;
  answers: Answers;
  results: ConceptResult[];
  isGenerating: boolean;
  error: string | null;

  setStep: (step: WizardStep) => void;
  selectType: (type: ConceptTypeId) => void;
  setAnswer: (questionId: string, value: string) => void;
  setAnswers: (answers: Answers) => void;
  setResults: (results: ConceptResult[]) => void;
  setGenerating: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 'select' as WizardStep,
  selectedType: null as ConceptTypeId | null,
  answers: {} as Answers,
  results: [] as ConceptResult[],
  isGenerating: false,
  error: null as string | null,
};

export const useConceptStore = create<ConceptStore>((set) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),
  selectType: (type) => set({ selectedType: type, currentStep: 'questions' }),
  setAnswer: (questionId, value) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
    })),
  setAnswers: (answers) => set({ answers }),
  setResults: (results) => set({ results, isGenerating: false }),
  setGenerating: (loading) => set({ isGenerating: loading, error: null }),
  setError: (error) => set({ error, isGenerating: false }),
  reset: () => set(initialState),
}));
