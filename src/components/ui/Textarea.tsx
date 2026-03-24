'use client';

import { cn } from '@/lib/utils';
import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  showCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, showCount, maxLength, value, ...props }, ref) => {
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="relative">
        <textarea
          ref={ref}
          value={value}
          maxLength={maxLength}
          className={cn(
            'w-full bg-dark-300 border border-dark-50/50 rounded-xl px-4 py-3',
            'text-gray-100 placeholder:text-gray-600',
            'focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/30',
            'transition-all duration-300 resize-none min-h-[100px]',
            className
          )}
          {...props}
        />
        {showCount && maxLength && (
          <span className="absolute bottom-3 right-3 text-xs text-gray-600">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
