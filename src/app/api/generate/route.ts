import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { buildPrompt } from '@/lib/ai/prompts';
import type { ConceptTypeId, Answers } from '@/types';

const VALID_TYPES: ConceptTypeId[] = [
  'function',
  'seller',
  'customer-identity',
  'situation',
  'business-model',
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { conceptTypeId, answers } = body as {
      conceptTypeId: ConceptTypeId;
      answers: Answers;
    };

    if (!conceptTypeId || !VALID_TYPES.includes(conceptTypeId)) {
      return Response.json(
        { error: '유효하지 않은 컨셉 유형입니다.' },
        { status: 400 }
      );
    }

    if (!answers || Object.keys(answers).length === 0) {
      return Response.json(
        { error: '답변이 비어있습니다.' },
        { status: 400 }
      );
    }

    const { systemPrompt, userPrompt } = buildPrompt(conceptTypeId, answers);

    const result = streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.8,
      maxOutputTokens: 3000,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Generate API error:', error);
    return Response.json(
      { error: '컨셉 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
