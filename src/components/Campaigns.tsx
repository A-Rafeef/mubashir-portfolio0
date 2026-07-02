'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CampaignItem } from '@/lib/db';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Dialog } from './ui/Dialog';
import { FadeUp } from './ui/FadeUp';
import { CheckCircle2, TrendingUp, ChevronRight } from 'lucide-react';

interface CampaignsProps {
  data: CampaignItem[];
}

export function Campaigns({ data }: CampaignsProps) {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignItem | null>(null);

  return (
    <section id="campaigns" className="py-24 bg-primary border-y border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeUp>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-secondary" />
              <span className="text-xs font-bold tracking-widest text-white/60 uppercase">Featured Case Studies</span>
              <span className="w-8 h-[2px] bg-secondary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-epilogue tracking-tight text-white uppercase">
              Proven Campaigns
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/80 font-light">
              Explore how strategic positioning, quantitative market analysis, and optimized operations translated into commercial scale.
            </p>
          </FadeUp>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item, idx) => (
            <FadeUp key={item.id} delay={idx * 0.15}>
              <Card
                hoverLift
                className="h-full bg-white/5 border border-white/10 p-0 rounded-[20px] overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Card Cover Image */}
                  <div className="relative w-full aspect-[16/10] bg-[#112d21]/40 border-b border-white/10">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      sizes="(max-w-768px) 100vw, 360px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    {/* Category */}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                      {item.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-bold font-epilogue text-white mt-2 uppercase">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm text-white/80 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Read Case Study Button */}
                <div className="px-6 pb-6 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="group gap-1 border-white/20 text-white hover:bg-white/10 hover:border-white/30 rounded-[12px]"
                    onClick={() => setSelectedCampaign(item)}
                  >
                    Read Case Study
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </div>
              </Card>
            </FadeUp>
          ))}
        </div>

        {/* Case Study Detail Dialog */}
        <Dialog
          isOpen={!!selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          title={selectedCampaign?.title}
        >
          {selectedCampaign && (
            <div className="flex flex-col gap-6 text-left">
              {/* Cover Image inside Dialog */}
              <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden border border-neutral-border bg-neutral-bg">
                <Image
                  src={selectedCampaign.coverImage}
                  alt={selectedCampaign.title}
                  fill
                  sizes="(max-w-768px) 100vw, 800px"
                  className="object-cover"
                />
              </div>

              {/* Sub-header details */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-border/50 pb-4">
                <div>
                  <span className="text-xs text-secondary-text font-medium uppercase tracking-wider">Industry Sector</span>
                  <p className="text-sm font-semibold text-primary-text">{selectedCampaign.category}</p>
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-secondary/10 border border-secondary/20 rounded-[12px]">
                  <TrendingUp size={16} className="text-primary" />
                  <span className="text-xs font-bold text-primary-text">High Growth Strategy</span>
                </div>
              </div>

              {/* Key Results Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                  Verified Campaign Outcomes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {selectedCampaign.results.map((res, rIdx) => (
                    <Card
                      hoverLift={false}
                      key={rIdx}
                      className="bg-neutral-bg/30 border border-neutral-border p-4 rounded-[12px] flex items-start gap-2"
                    >
                      <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold text-primary-text leading-tight">{res}</span>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Case Study Narrative */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  Campaign Breakdown
                </h4>
                <p className="text-sm sm:text-base text-secondary-text leading-relaxed font-light">
                  {selectedCampaign.fullCaseStudy || selectedCampaign.description}
                </p>
              </div>

              {/* Consultation Link */}
              <div className="pt-4 border-t border-neutral-border/50 flex justify-end">
                <a href="#contact" onClick={() => setSelectedCampaign(null)}>
                  <Button variant="primary">
                    Discuss A Similar Strategy
                  </Button>
                </a>
              </div>
            </div>
          )}
        </Dialog>

      </div>
    </section>
  );
}
