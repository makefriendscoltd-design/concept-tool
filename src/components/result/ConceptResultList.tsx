'use client';

import ConceptResultCard from './ConceptResultCard';
import type { ConceptResult } from '@/types';

interface ConceptResultListProps {
  concepts: ConceptResult[];
}

export default function ConceptResultList({ concepts }: ConceptResultListProps) {
  return (
    <div className="space-y-4">
      {concepts.map((concept, index) => (
        <ConceptResultCard
          key={`${concept.title}-${index}`}
          concept={concept}
          index={index}
        />
      ))}
    </div>
  );
}
