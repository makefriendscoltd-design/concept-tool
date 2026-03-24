import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productDescription } = body as { productDescription: string };

    if (!productDescription || productDescription.trim().length === 0) {
      return Response.json(
        { error: '제품/서비스 설명이 비어있습니다.' },
        { status: 400 }
      );
    }

    const systemPrompt = `당신은 한국 마케팅 분야의 최고 전문가이며, "컨셉의 정석" 방법론 전문가입니다.

## 당신의 역할
사용자가 판매하려는 제품/서비스 정보를 바탕으로, 5가지 컨셉 유형 각각에 대해
해당 제품에 맞는 컨셉 접근 방향을 추천합니다.

## 5가지 컨셉 유형
1. 기능 컨셉 (function): 제품의 기능/작동 원리를 재해석하여 차별화
2. 판매자 컨셉 (seller): 파는 사람을 브랜드화하여 신뢰와 차별성 창출
3. 고객 정체성 컨셉 (customer-identity): 제품을 사는 순간 고객이 되는 정체성 설계
4. 상황 전환 컨셉 (situation): 사용하는 "순간"을 새로 만들어냄
5. 구조 설계 컨셉 (business-model): 판매 구조/방식을 완전히 바꿈

## 출력 형식
반드시 아래 JSON 형식으로만 응답하세요. JSON 외의 텍스트는 절대 포함하지 마세요:
\`\`\`json
{
  "recommendations": [
    {
      "typeId": "function",
      "typeNameKo": "기능 컨셉",
      "icon": "⚙️",
      "approachTitle": "이 제품에 맞는 기능 컨셉 접근법 제목 (5-10 단어)",
      "approachDescription": "이 제품에 기능 컨셉을 적용하면 어떤 방향이 가능한지 2-3문장으로 설명",
      "previewExample": "예시 컨셉 이름 하나 (3-7 단어)",
      "color": "from-amber-500 to-yellow-600"
    }
  ]
}
\`\`\`

## 중요 규칙
- 반드시 한국어로 작성
- 5가지 유형 모두 빠짐없이 추천 (function, seller, customer-identity, situation, business-model 순서)
- 각 추천은 사용자의 구체적인 제품에 맞춤화
- 추상적 설명이 아닌, 해당 제품에서 실제로 시도할 수 있는 방향 제시
- previewExample은 실제 사용 가능한 매력적인 컨셉 이름
- JSON 형식을 정확히 지켜서 응답
- icon 값: ⚙️, 👤, 🎯, ⏰, 🏗️ (순서대로)
- color 값: from-amber-500 to-yellow-600, from-blue-500 to-indigo-600, from-purple-500 to-pink-600, from-emerald-500 to-teal-600, from-orange-500 to-red-600`;

    const userPrompt = `제가 판매하려는 제품/서비스: "${productDescription.trim()}"

이 제품에 대해 5가지 컨셉 유형별로 각각 맞춤 접근 방향을 추천해주세요.`;

    const result = streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.8,
      maxOutputTokens: 1500,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Recommend API error:', error);
    return Response.json(
      { error: '컨셉 추천 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
