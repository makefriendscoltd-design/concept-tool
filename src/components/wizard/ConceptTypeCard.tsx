'use client';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import type { ConceptTypeDefinition } from '@/types';

interface ConceptTypeCardProps {
  type: ConceptTypeDefinition;
  selected: boolean;
  onClick: () => void;
}

export default function ConceptTypeCard({ type, selected, onClick }: ConceptTypeCardProps) {
  return (
    <Card
      hoverable
      selected={selected}
      onClick={onClick}
      className="p-6 flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{type.icon}</span>
        <div>
          <h3 className="text-lg font-bold text-gray-100">{type.nameKo}</h3>
          <p className="text-xs text-gray-500 uppercase tracking-wider">{type.nameEn}</p>
        </div>
      </div>

      <p className="text-sm text-gray-400 leading-relaxed">{type.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {type.examples.map((example) => (
          <Badge key={example}>{example}</Badge>
        ))}
      </div>
    </Card>
  );
}
