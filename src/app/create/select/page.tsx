'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useConceptStore } from '@/store/useConceptStore';
import { parseRecommendResponse } from '@/lib/ai/recommend-parse';
import RecommendationGrid from '@/components/wizard/RecommendationGrid';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import type { ConceptTypeId } from '@/types';

export default function SelectPage() {
  const router = useRouter();
  const {
    productDescription,
    recommendations,
    setRecommendations,
    setStep,
    setError,
    error,
  } = useConceptStore();

  const [localSelected, setLocalSelected] = useState<ConceptTypeId | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchCount = useRef(0);

  useEffect(() => {
    if (!productDescription) {
      router.replace('/create/product');
      return;
    }
    setStep('select');

    if (recommendations.length === 0) {
      fetchRecommendations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchRecommendations() {
    const currentFetch = ++fetchCount.current;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productDescription }),
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
        if (currentFetch !== fetchCount.current) return;
        fullText += decoder.decode(value, { stream: true });
      }

      if (currentFetch !== fetchCount.current) return;

      const parsed = parseRecommendResponse(fullText);
      if (parsed && parsed.length > 0) {
        setRecommendations(parsed);
      } else {
        setError('추천 결과를 분석할 수 없습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      if (currentFetch !== fetchCount.current) return;
      setError(err instanceof Error ? err.message : '추천 생성 중 오류가 발생했습니다.');
    } finally {
      if (currentFetch === fetchCount.current) {
        setIsLoading(false);
      }
    }
  }

  const handleSelect = (type: ConceptTypeId) => setLocalSelected(type);

  const handleNext = () => {
    if (localSelected) {
      useConceptStore.getState().selectType(localSelected);
      router.push('/create/questions');
    }
  };

  const handleBack = () => {
    setStep('product');
    router.push('/create/product');
  };

  if (!productDescription) return null;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-300 border border-dark-50/50 mb-4">
          <span className="text-sm text-gray-400">{productDescription}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">
          {isLoading ? (
            <>
              AI가 <span className="gold-gradient-text">맞춤 접근법</span>을 분석하고 있습니다
            </>
          ) : recommendations.length > 0 ? (
            <>
              <span className="gold-gradient-text">5가지 접근법</span>을 추천합니다
            </>
          ) : error ? (
            <>오류가 발생했습니다</>
          ) : (
            <>컨셉 접근법을 <span className="gold-gradient-text">준비 중입니다</span></>
          )}
        </h1>
        {isLoading && (
          <p className="text-gray-500">제품에 맞는 최적의 컨셉 방향을 찾고 있습니다...</p>
        )}
        {!isLoading && recommendations.length > 0 && (
          <p className="text-gray-500">마음에 드는 접근법을 선택하세요</p>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="card-dark p-5">
              <div className="flex items-center gap-3 mb-3">
                <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
              </div>
              <Skeleton className="h-12 w-full mb-3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="card-dark p-8 text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="secondary" onClick={handleBack}>
              제품 수정하기
            </Button>
            <Button variant="primary" onClick={() => fetchRecommendations()}>
              다시 추천받기
            </Button>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {!isLoading && !error && recommendations.length > 0 && (
        <>
          <RecommendationGrid
            recommendations={recommendations}
            selectedType={localSelected}
            onSelect={handleSelect}
          />

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="ghost" onClick={handleBack}>
              제품 수정하기
            </Button>
            <Button
              variant="primary"
              size="lg"
              disabled={!localSelected}
              onClick={handleNext}
            >
              이 접근법으로 시작하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
