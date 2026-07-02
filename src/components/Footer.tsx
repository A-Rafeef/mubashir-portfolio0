'use client';

import React from 'react';
import { ProfileData } from '@/lib/db';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

interface FooterProps {
  profile: ProfileData;
}

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0e2219] border-t border-white/10 py-16 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
          
          {/* Logo and Tagline Column */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-start text-left">
            <a href="#" className="flex items-center gap-1.5 group mb-4">
              <span className="font-epilogue text-xl font-extrabold tracking-tight text-white transition-colors group-hover:text-secondary">
                MUBASHIR P
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            </a>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light max-w-sm">
              Strategic growth consulting and Fractional CMO services helping business organizations scale acquisition funnels, clarify positioning, and maximize brand equity.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Navigation</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              <a href="#" className="text-sm text-white/70 hover:text-secondary transition-colors">Home</a>
              <a href="#about" className="text-sm text-white/70 hover:text-secondary transition-colors">About</a>
              <a href="#expertise" className="text-sm text-white/70 hover:text-secondary transition-colors">Expertise</a>
              <a href="#experience" className="text-sm text-white/70 hover:text-secondary transition-colors">Timeline</a>
              <a href="#services" className="text-sm text-white/70 hover:text-secondary transition-colors">Services</a>
              <a href="#campaigns" className="text-sm text-white/70 hover:text-secondary transition-colors">Campaigns</a>
              <a href="#contact" className="text-sm text-white/70 hover:text-secondary transition-colors">Contact</a>
              <a href="/admin/login" className="text-sm text-white/70 hover:text-secondary transition-colors font-semibold">Admin Panel</a>
            </div>
          </div>

          {/* Social Links & Back to Top Column */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-start md:items-end text-left md:text-right">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4 md:text-right">Connect</h4>
            <div className="flex gap-3 mb-6">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/5 border border-white/10 rounded-[10px] text-white/70 hover:text-secondary hover:border-secondary/30 transition-all hover:scale-105"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={profile.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/5 border border-white/10 rounded-[10px] text-white/70 hover:text-secondary hover:border-secondary/30 transition-all hover:scale-105"
                aria-label="Twitter Profile"
              >
                <TwitterIcon size={18} />
              </a>
            </div>

            <button
              onClick={handleScrollTop}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-secondary transition-colors group cursor-pointer"
            >
              Back to Top
              <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>

        {/* Lower footer border */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/55 font-light">
          <span>&copy; {currentYear} Muhammed Mubashir P. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
