'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HeroData } from '@/lib/db';
import { Button } from './ui/Button';
import { Counter } from './ui/Counter';
import { Card } from './ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

interface HeroProps {
  data: HeroData;
}

export function Hero({ data }: HeroProps) {
  const titles = [
    "Strategic Marketing Consultant &",
    "Change Champion &"
  ];
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Content children animations
  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // premium easeOutQuart curve
      },
    },
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-24 md:pt-36 pb-16 overflow-hidden bg-[#F3F4F6]">
      {/* 1. Subtle, Low-Opacity Floating Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft primary green gradient circle */}
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary/[0.02] blur-[100px]"
        />
        {/* Soft gold/secondary accent circle */}
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-[-10%] w-[35vw] h-[35vw] rounded-full bg-secondary/[0.025] blur-[120px]"
        />
        
        {/* Minimal thin SVG background axis line */}
        <svg className="absolute top-0 left-1/3 h-full w-[1px] opacity-[0.04] stroke-primary" fill="none">
          <line x1="0" y1="0" x2="0" y2="100%" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 z-10 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* 2. Portrait Container (Mobile: Positioned slightly above center/Top, Desktop: Right) */}
        <div className="col-span-1 lg:col-span-5 flex justify-center order-1 lg:order-2">
          {/* Portrait fades in and moves upward slightly on load */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[4/5] flex justify-center items-end"
          >
            {/* The transparent PNG image sits directly on the background with custom filter shadow and transparent fade */}
            <div className="relative w-full h-full filter drop-shadow-[0_15px_30px_rgba(27,67,50,0.06)] select-none">
              <Image
                src={data.imageUrl}
                alt={data.name}
                fill
                priority
                sizes="(max-w-768px) 100vw, 400px"
                className="object-contain mask-fade-bottom"
              />
            </div>
          </motion.div>
        </div>

        {/* 3. Text & Info Container (Mobile: Below image, Desktop: Left) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="col-span-1 lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1"
        >
          {/* Profession Badge */}
          <motion.div variants={itemVariants} className="flex items-center min-h-[36px]">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-tertiary uppercase bg-white border border-neutral-border px-4 py-2 rounded-full shadow-sm flex items-center justify-center overflow-hidden min-h-[36px] h-full">
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleIndex}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="inline-block whitespace-nowrap"
                >
                  {titles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          {/* Name Treatment (Massive emphasis on MUBASHIR, balanced and inline P) */}
          {(() => {
            const nameParts = data.name.split(' ');
            const firstName = nameParts.length > 1 ? nameParts[0] : '';
            const restOfName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : data.name;
            return (
              <motion.div variants={itemVariants} className="mt-6 flex flex-col items-start">
                {/* First Name: Lighter emphasis, spaced */}
                {firstName && (
                  <span className="text-sm sm:text-base font-light tracking-[0.35em] text-secondary-text opacity-70 uppercase pl-1.5">
                    {firstName}
                  </span>
                )}
                {/* Rest of Name (e.g. MUBASHIR P): Reduced size and balanced inline P */}
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold font-epilogue tracking-tight text-primary uppercase leading-[0.9]">
                  {restOfName}
                </h1>
              </motion.div>
            );
          })()}

          {/* Value Prop (One-liner) */}
          <motion.div variants={itemVariants} className="mt-6 border-l-[3px] border-secondary pl-4">
            <h2 className="text-lg sm:text-xl font-semibold text-primary-text leading-tight">
              {data.tagline}
            </h2>
          </motion.div>

          {/* Short description (2-3 lines) */}
          <motion.div variants={itemVariants} className="mt-4 max-w-xl">
            <p className="text-sm sm:text-base text-secondary-text leading-relaxed font-light">
              Executive brand growth consultant based in India and the GCC. Orchestrating ROI-driven conversions, 
              repeatable marketing funnels, and enterprise operations for visionary founders and global institutions.
            </p>
          </motion.div>

          {/* Call to Actions (Animate subtly on load) */}
          <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href={data.primaryCtaLink} className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full gap-2 px-7 py-3.5">
                <Calendar size={18} />
                Contact Me
              </Button>
            </a>
            <a href={data.secondaryCtaLink} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full group gap-2 px-7 py-3.5">
                View Portfolio
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Stats section separated cleanly with generous whitespace at bottom */}
      <div className="max-w-7xl mx-auto px-6 mt-16 w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="border-t border-neutral-border/60 pt-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card hoverLift={false} className="bg-white/40 border border-neutral-border/65 p-5 rounded-[20px] shadow-sm hover:bg-white transition-colors duration-300">
              <Counter value={data.stats.experience} className="text-3xl font-extrabold font-epilogue text-primary" />
              <span className="text-[10px] text-secondary-text font-bold mt-2 uppercase tracking-wider block">Years Experience</span>
            </Card>

            <Card hoverLift={false} className="bg-white/40 border border-neutral-border/65 p-5 rounded-[20px] shadow-sm hover:bg-white transition-colors duration-300">
              <Counter value={data.stats.projects} className="text-3xl font-extrabold font-epilogue text-primary" />
              <span className="text-[10px] text-secondary-text font-bold mt-2 uppercase tracking-wider block">Projects Guided</span>
            </Card>

            <Card hoverLift={false} className="bg-white/40 border border-neutral-border/65 p-5 rounded-[20px] shadow-sm hover:bg-white transition-colors duration-300">
              <Counter value={data.stats.campaigns} className="text-3xl font-extrabold font-epilogue text-primary" />
              <span className="text-[10px] text-secondary-text font-bold mt-2 uppercase tracking-wider block">Campaigns Run</span>
            </Card>

            <Card hoverLift={false} className="bg-white/40 border border-neutral-border/65 p-5 rounded-[20px] shadow-sm hover:bg-white transition-colors duration-300">
              <Counter value={data.stats.industries} className="text-3xl font-extrabold font-epilogue text-primary" />
              <span className="text-[10px] text-secondary-text font-bold mt-2 uppercase tracking-wider block">Industries Served</span>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
