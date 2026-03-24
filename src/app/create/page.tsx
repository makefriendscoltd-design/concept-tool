'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useConceptStore } from '@/store/useConceptStore';

export default function CreatePage() {
  const router = useRouter();
  const reset = useConceptStore((s) => s.reset);

  useEffect(() => {
    reset();
    router.replace('/create/select');
  }, [reset, router]);

  return null;
}
