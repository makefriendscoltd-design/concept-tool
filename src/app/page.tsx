'use client';

import HeroSection from '@/components/landing/HeroSection';
import ConceptTypePreview from '@/components/landing/ConceptTypePreview';
import HowItWorks from '@/components/landing/HowItWorks';
import CTASection from '@/components/landing/CTASection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark-500">
      <HeroSection />
      <ConceptTypePreview />
      <HowItWorks />
      <CTASection />
    </main>
  );
}
