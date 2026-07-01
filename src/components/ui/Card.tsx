import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverLift?: boolean;
}

export function Card({
  children,
  className,
  hoverLift = true,
  ...props
}: CardProps) {
  const cardClasses = twMerge(
    clsx(
      'bg-white rounded-[20px] border border-neutral-border p-6 shadow-sm transition-all duration-300',
      hoverLift && 'hover:shadow-md hover:-translate-y-1',
      className
    )
  );

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
}

// Sub-components for structure
export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge('flex flex-col gap-1.5 pb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={twMerge('text-xl font-semibold leading-tight text-primary-text', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={twMerge('text-sm text-secondary-text', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge('pt-0', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge('flex items-center pt-4 border-t border-neutral-border mt-4', className)} {...props}>
      {children}
    </div>
  );
}
