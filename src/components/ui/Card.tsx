'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  selected?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, selected = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-dark-200 rounded-2xl border transition-all duration-300',
          hoverable && 'cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-gold-500/5',
          selected
            ? 'border-gold-500/60 shadow-lg shadow-gold-500/10'
            : 'border-dark-50/50 hover:border-gold-500/30',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
