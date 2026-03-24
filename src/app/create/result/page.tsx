'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useConceptStore } from '@/store/useConceptStore';
import { CONCEPT_TYPES } from '@/lib/constants/concept-types';
import { parseConceptResponse } from '@/lib/ai/parse';
import ConceptResultList from '@/components/result/ConceptResultList';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import type { ConceptResult } from '@/types';

export default function ResultPage() {
  const router = useRouter();
  const { selectedType, answers, productDescription, setStep } = useConceptStore();
  const [parsedConcepts, setParsedConcepts] = useState<ConceptResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawText, setRawText] = useState('');
  const generationCount = useRef(0);

  const typeInfo = CONCEPT_TYPES.find((t) => t.id === selectedType);

  async function generate() {
    if (!selectedType) return;

    const currentGeneration = ++generationCount.current;

    setIsLoading(true);
    setError(null);
    setParsedConcepts(null);
    setRawText('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conceptTypeId: selectedType, answers, productDescription }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || `서버 오류 (${res.status})`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('스트리밍을 시작할 수 없습니다.');

      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (currentGeneration !== generationCount.current) return;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setRawText(fullText);
      }

      if (currentGeneration !== generationCount.current) return;

      const parsed = parseConceptResponse(fullText);
      if (parsed && parsed.length > 0) {
        setParsedConcepts(parsed);
      }
    } catch (err) {
      if (currentGeneration !== generationCount.current) return;
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      if (currentGeneration === generationCount.current) {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    if (!selectedType || Object.keys(answers).length === 0) {
      router.replace('/create/product');
      return;
    }
    setStep('result');
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegenerate = () => {
    generate();
  };

  const handleStartOver = () => {
    useConceptStore.getState().reset();
    router.push('/create/product');
  };

  const handleEditAnswers = () => {
    setStep('questions');
    router.push('/create/questions');
  };

  if (!selectedType) return null;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-300 border border-dark-50/50 mb-4">
          <span>{typeInfo?.icon}</span>
          <span className="text-sm font-medium text-gold-400">{typeInfo?.nameKo}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">
          {isLoading ? (
            <>
              컨셉을 <span className="gold-gradient-text">생성하고 있습니다</span>
            </>
          ) : parsedConcepts ? (
            <>
              <span className="gold-gradient-text">{parsedConcepts.length}가지 컨셉</span>이 준비되었습니다
            </>
          ) : error ? (
            <>오류가 발생했습니다</>
          ) : (
            <>
              컨셉을 <span className="gold-gradient-text">준비 중입니다</span>
            </>
          )}
        </h1>
        {isLoading && (
          <p className="text-gray-500">윤대표 AI가 최적의 컨셉을 찾고 있습니다. 잠시만 기다려주세요...</p>
        )}
      </div>

      {/* Loading state */}
      {isLoading && !parsedConcepts && (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="card-dark p-6">
              <div className="flex items-start gap-4">
                <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="card-dark p-8 text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="secondary" onClick={handleEditAnswers}>
              답변 수정하기
            </Button>
            <Button variant="primary" onClick={handleRegenerate}>
              다시 생성하기
            </Button>
          </div>
        </div>
      )}

      {/* Results */}
      {!isLoading && parsedConcepts && parsedConcepts.length > 0 && (
        <>
          <ConceptResultList concepts={parsedConcepts} />

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="ghost" onClick={handleStartOver}>
              처음부터 다시
            </Button>
            <Button variant="secondary" onClick={handleEditAnswers}>
              답변 수정하기
            </Button>
            <Button variant="primary" onClick={handleRegenerate}>
              다른 컨셉 생성하기
            </Button>
          </div>
        </>
      )}

      {/* Fallback: show raw text if parsing failed */}
      {!isLoading && rawText && !parsedConcepts && !error && (
        <div className="card-dark p-8">
          <p className="text-gray-400 mb-4 text-sm">결과를 구조화하는 데 실패했습니다. 원본 응답:</p>
          <div className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
            {rawText}
          </div>
          <div className="mt-6 flex gap-3 justify-center">
            <Button variant="secondary" onClick={handleEditAnswers}>
              답변 수정하기
            </Button>
            <Button variant="primary" onClick={handleRegenerate}>
              다시 생성하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
