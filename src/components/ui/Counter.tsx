'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  value: string;
  className?: string;
}

export function Counter({ value, className }: CounterProps) {
  const numberPart = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || numberPart === 0) return;
    
    let start = 0;
    const duration = 1.2; // seconds
    const end = numberPart;
    const totalSteps = 40;
    const increment = Math.ceil(end / totalSteps);
    const stepTime = (duration * 1000) / totalSteps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, numberPart]);

  return (
    <span ref={ref} className={className}>
      {numberPart > 0 ? `${count}${suffix}` : value}
    </span>
  );
}
