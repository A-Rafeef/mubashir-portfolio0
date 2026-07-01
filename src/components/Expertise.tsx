'use client';

import React from 'react';
import { ExpertiseItem } from '@/lib/db';
import { Card } from './ui/Card';
import { Icon } from './ui/Icon';
import { FadeUp } from './ui/FadeUp';

interface ExpertiseProps {
  data: ExpertiseItem[];
}

export function Expertise({ data }: ExpertiseProps) {
  return (
    <section id="expertise" className="py-24 bg-neutral-bg/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeUp>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-secondary" />
              <span className="text-xs font-bold tracking-widest text-secondary-text uppercase">Core Expertise</span>
              <span className="w-8 h-[2px] bg-secondary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-epilogue tracking-tight text-primary-text uppercase">
              Areas of Strategic Impact
            </h2>
            <p className="mt-4 text-sm sm:text-base text-secondary-text font-light">
              High-value capabilities honed through a decade of directing marketing campaigns and corporate growth initiatives.
            </p>
          </FadeUp>
        </div>

        {/* Expertise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, idx) => (
            <FadeUp key={item.id} delay={idx * 0.1}>
              <Card hoverLift className="h-full bg-white border border-neutral-border p-8 rounded-[20px] flex flex-col items-start gap-4">
                <div className="p-3.5 bg-primary/5 rounded-[12px] border border-primary/10 text-primary">
                  <Icon name={item.iconName} size={22} className="stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-epilogue text-primary-text mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-secondary-text leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </Card>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}
