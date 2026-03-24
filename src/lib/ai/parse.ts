import type { ConceptResult } from '@/types';

export function parseConceptResponse(text: string): ConceptResult[] | null {
  try {
    // Try to extract JSON from markdown code block
    const jsonMatch = text.match(/```json?\s*([\s\S]*?)```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : text;

    const parsed = JSON.parse(jsonStr.trim());

    if (parsed.concepts && Array.isArray(parsed.concepts)) {
      return parsed.concepts.filter(
        (c: Record<string, unknown>) =>
          typeof c.title === 'string' &&
          typeof c.subtitle === 'string' &&
          typeof c.explanation === 'string' &&
          typeof c.applicationTip === 'string' &&
          typeof c.strength === 'string'
      );
    }

    return null;
  } catch {
    // Try to find any JSON object in the text
    try {
      const braceMatch = text.match(/\{[\s\S]*"concepts"[\s\S]*\}/);
      if (braceMatch) {
        const parsed = JSON.parse(braceMatch[0]);
        if (parsed.concepts && Array.isArray(parsed.concepts)) {
          return parsed.concepts;
        }
      }
    } catch {
      // Final fallback failed
    }

    return null;
  }
}
