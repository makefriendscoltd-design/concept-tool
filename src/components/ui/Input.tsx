'use client';

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full bg-dark-300 border border-dark-50/50 rounded-xl px-4 py-3',
          'text-gray-100 placeholder:text-gray-600',
          'focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/30',
          'transition-all duration-300',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
