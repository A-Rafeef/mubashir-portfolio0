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
    <section id="education" className="py-24 bg-primary border-y border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeUp>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-secondary" />
              <span className="text-xs font-bold tracking-widest text-white/60 uppercase">Academic Foundation</span>
              <span className="w-8 h-[2px] bg-secondary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-epilogue tracking-tight text-white uppercase">
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
                className="h-full bg-white/5 border border-white/10 p-8 rounded-[20px] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-white group-hover:scale-110 transition-transform">
                  <GraduationCap size={72} />
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-[12px] border border-white/10 text-secondary shrink-0">
                    <GraduationCap size={22} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="flex items-center gap-1 text-xs font-bold text-secondary uppercase tracking-widest mb-1.5">
                      <Calendar size={12} />
                      {edu.year}
                    </span>
                    <h3 className="text-lg font-bold font-epilogue text-white uppercase leading-snug">
                      {edu.degree}
                    </h3>
                    <p className="mt-2 text-sm text-white/85 flex items-center gap-1.5">
                      <Landmark size={14} className="shrink-0 text-white/60" />
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
