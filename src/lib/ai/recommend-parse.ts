import type { ConceptRecommendation } from '@/types';

export function parseRecommendResponse(text: string): ConceptRecommendation[] | null {
  try {
    const jsonMatch = text.match(/```json?\s*([\s\S]*?)```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : text;

    const parsed = JSON.parse(jsonStr.trim());

    if (parsed.recommendations && Array.isArray(parsed.recommendations)) {
      return parsed.recommendations.filter(
        (r: Record<string, unknown>) =>
          typeof r.typeId === 'string' &&
          typeof r.typeNameKo === 'string' &&
          typeof r.approachTitle === 'string' &&
          typeof r.approachDescription === 'string' &&
          typeof r.previewExample === 'string'
      );
    }

    return null;
  } catch {
    try {
      const braceMatch = text.match(/\{[\s\S]*"recommendations"[\s\S]*\}/);
      if (braceMatch) {
        const parsed = JSON.parse(braceMatch[0]);
        if (parsed.recommendations && Array.isArray(parsed.recommendations)) {
          return parsed.recommendations;
        }
      }
    } catch {
      // Final fallback failed
    }

    return null;
  }
}
