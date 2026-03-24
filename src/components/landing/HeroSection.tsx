'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative text-center max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-300 border border-gold-500/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
          <span className="text-sm text-gold-400 font-medium">AI 기반 컨셉 제작기</span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
          <span className="text-gray-100">팔리는</span>
          <br />
          <span className="gold-gradient-text">컨셉</span>
          <span className="text-gray-100">을 만드는</span>
          <br />
          <span className="text-gray-100">가장 빠른 방법</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
          제품을 입력하면, AI가 맞춤 컨셉 접근법을 추천하고
          <br className="hidden md:block" />
          최적의 <span className="text-gray-300 font-medium">셀링 컨셉</span>을 만들어드립니다
        </p>

        <Link href="/create">
          <Button size="lg" className="text-lg px-10 py-4">
            컨셉 만들기 시작
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
