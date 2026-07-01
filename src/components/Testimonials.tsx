'use client';

import React from 'react';
import { TestimonialItem } from '@/lib/db';
import { Card } from './ui/Card';
import { FadeUp } from './ui/FadeUp';
import { Quote } from 'lucide-react';

interface TestimonialsProps {
  data: TestimonialItem[];
}

export function Testimonials({ data }: TestimonialsProps) {
  // Helper to extract initials for placeholder avatars
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <section className="py-24 bg-white border-y border-neutral-border">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeUp>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-secondary" />
              <span className="text-xs font-bold tracking-widest text-secondary-text uppercase">Client Endorsements</span>
              <span className="w-8 h-[2px] bg-secondary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-epilogue tracking-tight text-primary-text uppercase">
              Client Testimonials
            </h2>
            <p className="mt-4 text-sm sm:text-base text-secondary-text font-light">
              Read feedback from the corporate executives and scaling business founders who have collaborated with Muhammed.
            </p>
          </FadeUp>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {data.map((item, idx) => (
            <FadeUp key={item.id} delay={idx * 0.15}>
              <Card
                hoverLift
                className="h-full bg-neutral-bg/20 border border-neutral-border p-8 rounded-[20px] flex flex-col justify-between relative"
              >
                {/* Quote Icon watermark */}
                <div className="absolute top-6 right-6 opacity-[0.04] text-primary">
                  <Quote size={54} className="rotate-180" />
                </div>

                <div className="text-left flex-1 flex flex-col">
                  {/* Quote Icon */}
                  <div className="text-tertiary mb-4">
                    <Quote size={20} className="fill-current" />
                  </div>
                  {/* Message */}
                  <p className="text-sm sm:text-base text-primary-text leading-relaxed font-light italic mb-6 flex-1">
                    "{item.content}"
                  </p>
                </div>

                {/* Profile info */}
                <div className="flex items-center gap-3.5 border-t border-neutral-border/50 pt-5 mt-4">
                  {/* Letter avatar fallback */}
                  <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold tracking-wider border border-primary/20 shrink-0">
                    {getInitials(item.name)}
                  </div>
                  
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-primary-text font-epilogue">{item.name}</span>
                    <span className="text-xs text-secondary-text font-medium">
                      {item.role}, <span className="text-primary font-semibold">{item.company}</span>
                    </span>
                  </div>
                </div>
              </Card>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}
