'use client';

import React from 'react';
import { EducationItem } from '@/lib/db';
import { Card } from './ui/Card';
import { FadeUp } from './ui/FadeUp';
import { GraduationCap, Calendar, Landmark } from 'lucide-react';

interface EducationProps {
  data: EducationItem[];
}

export function Education({ data }: EducationProps) {
  return (
    <section id="education" className="py-24 bg-neutral-bg/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeUp>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-secondary" />
              <span className="text-xs font-bold tracking-widest text-secondary-text uppercase">Academic Foundation</span>
              <span className="w-8 h-[2px] bg-secondary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-epilogue tracking-tight text-primary-text uppercase">
              Education & Credentials
            </h2>
          </FadeUp>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {data.map((edu, idx) => (
            <FadeUp key={edu.id} delay={idx * 0.15}>
              <Card
                hoverLift
                className="h-full bg-white border border-neutral-border p-8 rounded-[20px] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 text-primary group-hover:scale-110 transition-transform">
                  <GraduationCap size={72} />
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/5 rounded-[12px] border border-primary/10 text-primary shrink-0">
                    <GraduationCap size={22} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="flex items-center gap-1 text-xs font-bold text-secondary uppercase tracking-widest mb-1.5">
                      <Calendar size={12} />
                      {edu.year}
                    </span>
                    <h3 className="text-lg font-bold font-epilogue text-primary-text uppercase leading-snug">
                      {edu.degree}
                    </h3>
                    <p className="mt-2 text-sm text-secondary-text flex items-center gap-1.5">
                      <Landmark size={14} className="shrink-0" />
                      {edu.institution}
                    </p>
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
