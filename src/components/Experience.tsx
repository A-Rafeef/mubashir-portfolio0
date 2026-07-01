'use client';

import React, { useState } from 'react';
import { ExperienceItem } from '@/lib/db';
import { Card } from './ui/Card';
import { FadeUp } from './ui/FadeUp';
import { Calendar, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceProps {
  data: ExperienceItem[];
}

export function Experience({ data }: ExperienceProps) {
  const [activeId, setActiveId] = useState<string>(data[0]?.id || '');

  return (
    <section id="experience" className="py-24 bg-white border-y border-neutral-border">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeUp>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-secondary" />
              <span className="text-xs font-bold tracking-widest text-secondary-text uppercase">Consulting Journey</span>
              <span className="w-8 h-[2px] bg-secondary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-epilogue tracking-tight text-primary-text uppercase">
              Professional Timeline
            </h2>
            <p className="mt-4 text-sm sm:text-base text-secondary-text font-light">
              Interactive timeline outlining strategic roles and bottom-line impacts achieved for major brand organizations. Click on any role to explore key achievements.
            </p>
          </FadeUp>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central line (desktop: centered, mobile: left-aligned) */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[1px] bg-neutral-border -translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {data.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeId === item.id;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline node */}
                  <div
                    onClick={() => setActiveId(item.id)}
                    className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10 w-8 h-8 rounded-full border-[3px] cursor-pointer flex items-center justify-center bg-white transition-all duration-300 shadow-sm"
                    style={{
                      borderColor: isActive ? '#FFBA08' : '#E5E7EB',
                    }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? '#FFBA08' : 'transparent',
                        transform: isActive ? 'scale(1.2)' : 'scale(1)',
                      }}
                    />
                  </div>

                  {/* Card wrapper (occupies half width on desktop) */}
                  <div className="w-full md:w-[45%] pl-10 md:pl-0 flex flex-col justify-center">
                    <FadeUp delay={idx * 0.1}>
                      <Card
                        hoverLift
                        onClick={() => setActiveId(item.id)}
                        className={`cursor-pointer border text-left rounded-[20px] transition-all duration-300 p-6 ${
                          isActive
                            ? 'border-primary/40 shadow-md ring-1 ring-primary/10'
                            : 'border-neutral-border hover:border-neutral-border/80'
                        }`}
                      >
                        {/* Company & Period */}
                        <div className="flex items-center justify-between gap-4 text-xs font-semibold text-secondary-text mb-3">
                          <span className="flex items-center gap-1">
                            <Briefcase size={12} className="text-primary" />
                            {item.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} className="text-secondary" />
                            {item.duration}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold font-epilogue text-primary-text mb-3 leading-tight uppercase">
                          {item.position}
                        </h3>

                        {/* Summary responsibilities */}
                        <ul className="space-y-2.5 text-xs sm:text-sm text-secondary-text font-light mb-4">
                          {item.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="list-disc pl-1 ml-4 leading-relaxed">
                              {resp}
                            </li>
                          ))}
                        </ul>

                        {/* Click to expand hint if not active */}
                        {!isActive && (
                          <div className="text-xs font-semibold text-primary/70 hover:text-primary flex items-center gap-1 pt-2 border-t border-neutral-border/50">
                            <Award size={12} className="text-secondary" />
                            Click to review key achievements
                          </div>
                        )}

                        {/* Expandable Key Achievements */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 border-t border-neutral-border/70 mt-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-1.5">
                                  <Award size={14} className="text-secondary" />
                                  Key Commercial Accomplishments
                                </h4>
                                <ul className="space-y-3">
                                  {item.achievements.map((ach, aIdx) => (
                                    <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-primary-text font-medium leading-relaxed">
                                      <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                                      <span>{ach}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </FadeUp>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
