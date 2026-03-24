'use client';

import { CONCEPT_TYPES } from '@/lib/constants/concept-types';
import ConceptTypeCard from './ConceptTypeCard';
import type { ConceptTypeId } from '@/types';

interface ConceptTypeGridProps {
  selectedType: ConceptTypeId | null;
  onSelect: (type: ConceptTypeId) => void;
}

export default function ConceptTypeGrid({ selectedType, onSelect }: ConceptTypeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {CONCEPT_TYPES.map((type) => (
        <ConceptTypeCard
          key={type.id}
          type={type}
          selected={selectedType === type.id}
          onClick={() => onSelect(type.id)}
        />
      ))}
    </div>
  );
}
