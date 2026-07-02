'use client';

import React from 'react';
import { AboutData } from '@/lib/db';
import { Card } from './ui/Card';
import { FadeUp } from './ui/FadeUp';
import { Target, Compass, BookOpen } from 'lucide-react';

interface AboutProps {
  data: AboutData;
}

export function About({ data }: AboutProps) {
  const cards = [
    {
      title: 'Our Mission',
      content: data.mission,
      icon: Target,
    },
    {
      title: 'Our Approach',
      content: data.approach,
      icon: Compass,
    },
    {
      title: 'Business Philosophy',
      content: data.philosophy,
      icon: BookOpen,
    },
  ];

  return (
    <section id="about" className="py-24 bg-primary border-y border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Intro */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-start">
            <FadeUp>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-secondary" />
                <span className="text-xs font-bold tracking-widest text-white/60 uppercase">Executive Profile</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-epilogue tracking-tight text-white uppercase">
                Bridging Vision With Operational Reality
              </h2>
              <p className="mt-6 text-base text-white/80 leading-relaxed font-light">
                {data.intro}
              </p>
            </FadeUp>
          </div>

          {/* Right Column: Strategic Pillars */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
            {cards.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <FadeUp key={card.title} delay={idx * 0.15}>
                  <Card hoverLift={false} className="relative p-6 bg-white/5 border border-white/10 rounded-[20px] overflow-hidden group">
                    <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-secondary group-hover:bg-white transition-colors" />
                    
                    <div className="flex gap-4">
                      <div className="p-3 bg-white/10 rounded-[12px] border border-white/10 shadow-sm text-secondary max-h-fit">
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-epilogue text-white mb-2">{card.title}</h3>
                        <p className="text-sm text-white/85 leading-relaxed font-light">{card.content}</p>
                      </div>
                    </div>
                  </Card>
                </FadeUp>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
