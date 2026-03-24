'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: '제품 입력',
    description: '판매하려는 제품이나 서비스를 간단히 설명해주세요.',
  },
  {
    number: '02',
    title: '윤대표 AI 맞춤 접근법 추천',
    description: '윤대표 AI가 5가지 컨셉 유형별로 제품에 맞는 접근 방향을 추천합니다.',
  },
  {
    number: '03',
    title: '상세 질문 답변',
    description: '선택한 접근법에 대해 구체적인 질문에 답변하세요.',
  },
  {
    number: '04',
    title: '윤대표 AI 맞춤 컨셉 생성',
    description: '윤대표 AI가 모든 정보를 종합하여 최적의 셀링 컨셉을 만들어드립니다.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-dark-400/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3">
            이렇게 <span className="gold-gradient-text">간단</span>합니다
          </h2>
          <p className="text-gray-500">4단계면 충분합니다</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/20 mb-4">
                <span className="text-gold-400 font-black text-lg">{step.number}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-100 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
