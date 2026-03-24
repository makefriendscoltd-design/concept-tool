'use client';

import { motion } from 'framer-motion';
import type { ConceptResult } from '@/types';

interface ConceptResultCardProps {
  concept: ConceptResult;
  index: number;
}

export default function ConceptResultCard({ concept, index }: ConceptResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-dark-200 rounded-2xl border border-dark-50/50 p-6 hover:border-gold-500/30 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-dark-900 font-bold text-lg">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-100 mb-1">{concept.title}</h3>
          <p className="text-gold-400 text-sm font-medium mb-4">{concept.subtitle}</p>

          <div className="space-y-3">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">왜 효과적인가</span>
              <p className="text-sm text-gray-300 mt-1 leading-relaxed">{concept.explanation}</p>
            </div>

            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">활용 방법</span>
              <p className="text-sm text-gray-300 mt-1 leading-relaxed">{concept.applicationTip}</p>
            </div>

            <div className="pt-2 border-t border-dark-50/30">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
                <svg className="w-3.5 h-3.5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-medium text-gold-400">{concept.strength}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
