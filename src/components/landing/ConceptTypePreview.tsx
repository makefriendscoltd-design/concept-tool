'use client';

import { motion } from 'framer-motion';
import { CONCEPT_TYPES } from '@/lib/constants/concept-types';

export default function ConceptTypePreview() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3">
            <span className="gold-gradient-text">5가지 컨셉 유형</span>으로
            <br />
            시장을 360도 해체합니다
          </h2>
          <p className="text-gray-500">제품 · 사람 · 고객 · 맥락 · 구조, 모든 각도에서 컨셉을 만들어보세요</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CONCEPT_TYPES.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-dark-200 rounded-xl border border-dark-50/50 p-5 text-center hover:border-gold-500/30 transition-all duration-300"
            >
              <span className="text-3xl mb-3 block">{type.icon}</span>
              <h3 className="text-sm font-bold text-gray-200 mb-1">{type.nameKo}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{type.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
