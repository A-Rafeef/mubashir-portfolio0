'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

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

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Experience', href: '#experience' },
    { name: 'Services', href: '#services' },
    { name: 'Campaigns', href: '#campaigns' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Dynamic scrolled class logic
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll Spy logic
      const sections = navLinks.map((link) => link.href.substring(1));
      
      if (window.scrollY < 100) {
        setActiveSection('');
        return;
      }

      let currentSection = '';
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the element is within view
          if (rect.top <= 140 && rect.bottom >= 140) {
            currentSection = sectionId;
            break;
          }
        }
      }
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);


  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? 'bg-white/95 border-b border-neutral-border shadow-sm backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1.5 group">
            <span className="font-epilogue text-2xl font-extrabold tracking-tight text-primary transition-colors group-hover:text-tertiary">
              MUBASHIR P
            </span>
            <span className="w-2 h-2 rounded-full bg-secondary" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-all relative py-1 hover:text-primary ${
                    isActive ? 'text-primary font-bold' : 'text-secondary-text'
                  }`}
                >
                  {link.name}
                  {/* Subtle active line */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a href="#contact">
              <Button variant="primary" size="sm" className="group gap-2">
                Book Consultation
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </div>

          {/* Mobile Menu Morphing Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-primary-text hover:bg-neutral-bg rounded-xl transition-colors flex items-center justify-center w-10 h-10 relative z-50 focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-4 flex flex-col justify-between">
              <motion.span
                animate={isOpen ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="absolute top-0 left-0 w-full h-[2px] bg-primary rounded-full origin-center"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="absolute top-[7px] left-0 w-full h-[2px] bg-primary rounded-full origin-center"
              />
              <motion.span
                animate={isOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full origin-center"
              />
            </div>
          </button>
        </div>

        {/* Collapsible Mobile Nav Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-b border-neutral-border shadow-xl overflow-hidden z-50"
            >
              <div className="p-6 flex flex-col gap-6 max-h-[calc(100vh-80px)] overflow-y-auto">
                <motion.nav
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.05, delayChildren: 0.05 },
                    },
                    closed: {
                      transition: { staggerChildren: 0.05, staggerDirection: -1 },
                    },
                  }}
                  className="flex flex-col gap-2 text-lg font-semibold"
                >
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                      <motion.div
                        key={link.name}
                        variants={{
                          open: { opacity: 1, x: 0 },
                          closed: { opacity: 0, x: -16 },
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      >
                        <a
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`block py-3 px-4 rounded-xl border border-transparent transition-all duration-200 ${
                            isActive
                              ? 'bg-primary/5 text-primary border-primary/10 font-bold'
                              : 'hover:bg-neutral-bg text-secondary-text hover:text-primary-text'
                          }`}
                        >
                          {link.name}
                        </a>
                      </motion.div>
                    );
                  })}
                </motion.nav>

                {/* Mobile CTA and Socials */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: 0.2 }}
                  className="pt-6 border-t border-neutral-border flex flex-col gap-6 mt-2"
                >
                  <a href="#contact" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" fullWidth size="lg">
                      Book Consultation
                    </Button>
                  </a>

                  {/* Social icons inside drawer */}
                  <div className="flex justify-center gap-6 text-secondary-text pt-2">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors p-2.5 hover:bg-neutral-bg rounded-full"
                    >
                      <LinkedinIcon size={20} />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors p-2.5 hover:bg-neutral-bg rounded-full"
                    >
                      <TwitterIcon size={20} />
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="md:hidden fixed inset-0 pointer-events-auto"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 40,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

