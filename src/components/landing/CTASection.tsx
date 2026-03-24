'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function CTASection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-black text-gray-100 mb-4">
          지금 바로 시작하세요
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          같은 제품도 컨셉 하나로 <span className="text-gold-400 font-semibold">완전히 다르게</span> 팔립니다
        </p>
        <Link href="/create">
          <Button size="lg" className="text-lg px-10 py-4">
            무료로 컨셉 만들기
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
