import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { buildPrompt } from '@/lib/ai/prompts';
import type { ConceptTypeId, Answers } from '@/types';

const VALID_TYPES: ConceptTypeId[] = [
  'function',
  'seller',
  'customer-identity',
  'situation',
  'business-model',
];

async function disabledPOST(req: Request) {
  try {
    const body = await req.json();
    const { conceptTypeId, answers, productDescription } = body as {
      conceptTypeId: ConceptTypeId;
      answers: Answers;
      productDescription?: string;
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

    const { systemPrompt, userPrompt } = buildPrompt(conceptTypeId, answers, productDescription);

    const result = streamText({
      model: google('gemini-2.5-pro'),
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

// 2026-11-13 운영 종료: 로그인 없이 AI 호출이 가능해 비용이 새는 걸 막으려고 닫음. 되살리려면 아래를 지우고 위 함수를 다시 export.
void disabledPOST;
export async function POST() {
  return Response.json({ error: "운영 종료된 서비스입니다." }, { status: 410 });
}
