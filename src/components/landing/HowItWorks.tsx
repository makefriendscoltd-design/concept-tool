'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: '컨셉 유형 선택',
    description: '기능, 판매자, 고객 정체성, 상황, 구조 중 원하는 유형을 선택하세요.',
  },
  {
    number: '02',
    title: '5가지 질문에 답변',
    description: '제품과 시장에 대한 핵심 정보를 입력하세요. 구체적일수록 좋습니다.',
  },
  {
    number: '03',
    title: 'AI 맞춤 컨셉 생성',
    description: 'AI가 즉시 5가지 맞춤 셀링 컨셉을 만들어 활용법과 함께 제공합니다.',
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
          <p className="text-gray-500">3단계면 충분합니다</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
