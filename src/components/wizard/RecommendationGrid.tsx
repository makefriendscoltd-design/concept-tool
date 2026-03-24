'use client';

import RecommendationCard from './RecommendationCard';
import type { ConceptRecommendation, ConceptTypeId } from '@/types';

interface RecommendationGridProps {
  recommendations: ConceptRecommendation[];
  selectedType: ConceptTypeId | null;
  onSelect: (typeId: ConceptTypeId) => void;
}

export default function RecommendationGrid({ recommendations, selectedType, onSelect }: RecommendationGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recommendations.map((rec) => (
        <RecommendationCard
          key={rec.typeId}
          recommendation={rec}
          selected={selectedType === rec.typeId}
          onClick={() => onSelect(rec.typeId)}
        />
      ))}
    </div>
  );
}
