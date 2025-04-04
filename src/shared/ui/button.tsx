import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib/util/utils';

const buttonVariants = cva(
  'items-center justify-center text-center transition-colors focus:outline-none disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-50 text-white hover:bg-primary-40 active:bg-primary-60 disabled:bg-gray-20 disabled:text-gray-50',
        secondary:
          'bg-primary-10 text-white hover:bg-primary-20 active:bg-primary-30 disabled:bg-gray-20 disabled:text-gray-50',
        ghost:
          'bg-white text-gray-90 border border-gray-30 hover:bg-gray-5 active:bg-gray-10 disabled:bg-white disabled:text-gray-50',
      },
      size: {
        sm: 'px-[10px] rounded-md',
        md: 'px-[16px] rounded-lg',
        lg: 'px-[20px] rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
