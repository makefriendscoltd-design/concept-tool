'use client';

import Card from '@/components/ui/Card';
import type { ConceptRecommendation } from '@/types';

interface RecommendationCardProps {
  recommendation: ConceptRecommendation;
  selected: boolean;
  onClick: () => void;
}

export default function RecommendationCard({ recommendation, selected, onClick }: RecommendationCardProps) {
  return (
    <Card hoverable selected={selected} onClick={onClick} className="p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-dark-300 flex items-center justify-center text-xl flex-shrink-0">
          {recommendation.icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-gray-500 font-medium">{recommendation.typeNameKo}</p>
          <h3 className="text-base font-bold text-gray-100 leading-tight truncate">
            {recommendation.approachTitle}
          </h3>
        </div>
      </div>

      <p className="text-sm text-gray-400 leading-relaxed">
        {recommendation.approachDescription}
      </p>

      <div className="mt-auto pt-2 border-t border-dark-50/30">
        <p className="text-xs text-gray-500 mb-1">예시 컨셉</p>
        <p className="text-sm font-medium text-gold-400">{recommendation.previewExample}</p>
      </div>
    </Card>
  );
}
