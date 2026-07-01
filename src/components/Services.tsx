'use client';

import React from 'react';
import { ServiceItem } from '@/lib/db';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { FadeUp } from './ui/FadeUp';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesProps {
  data: ServiceItem[];
}

export function Services({ data }: ServicesProps) {
  return (
    <section id="services" className="py-24 bg-neutral-bg/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeUp>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-secondary" />
              <span className="text-xs font-bold tracking-widest text-secondary-text uppercase">Consulting Services</span>
              <span className="w-8 h-[2px] bg-secondary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-epilogue tracking-tight text-primary-text uppercase">
              Strategic Consultation Packages
            </h2>
            <p className="mt-4 text-sm sm:text-base text-secondary-text font-light">
              Structured marketing programs and executive consulting designed to scale operations, clarify brand messaging, and maximize customer growth.
            </p>
          </FadeUp>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {data.map((service, idx) => (
            <FadeUp key={service.id} delay={idx * 0.15}>
              <Card
                hoverLift
                className="h-full bg-white border border-neutral-border p-8 rounded-[20px] flex flex-col justify-between"
              >
                <div>
                  {/* Title & Description */}
                  <h3 className="text-xl font-bold font-epilogue text-primary-text uppercase tracking-tight mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm text-secondary-text leading-relaxed font-light mb-6">
                    {service.description}
                  </p>

                  {/* Bullet deliverables */}
                  <ul className="space-y-3.5 mb-8">
                    {service.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-primary-text font-medium leading-normal">
                        <CheckCircle2 size={18} className="text-tertiary shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <a href="#contact" className="w-full mt-auto block">
                  <Button variant="outline" fullWidth className="group gap-2 hover:bg-primary/5 hover:text-primary transition-all">
                    {service.ctaText}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              </Card>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}
