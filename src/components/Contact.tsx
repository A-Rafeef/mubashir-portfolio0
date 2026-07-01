'use client';

import React, { useState } from 'react';
import { db, ProfileData } from '@/lib/db';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { FloatingInput, FloatingTextarea } from './ui/Input';
import { FadeUp } from './ui/FadeUp';
import { Mail, Calendar, CheckCircle2, MessageSquare, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactProps {
  profile: ProfileData;
}

export function Contact({ profile }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = 'Please provide your name';
    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please provide a valid email';
    }
    if (message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await db.addMessage({ name, email, company, message });
      setIsSuccess(true);
      // Reset form
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
      setErrors({});
    } catch (err) {
      console.error(err);
      setErrors({ form: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-neutral-bg/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Core CTA and details */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-start text-left">
            <FadeUp>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-secondary" />
                <span className="text-xs font-bold tracking-widest text-secondary-text uppercase">Consultation Inquiry</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-epilogue leading-tight text-primary-text uppercase">
                Let's Build Something Meaningful Together.
              </h2>
              <p className="mt-6 text-base text-secondary-text leading-relaxed font-light max-w-md">
                Whether you need to review an active performance campaign, consult on a market-entry blueprint, or hire a Fractional CMO, let's schedule an introductory call.
              </p>

              {/* Direct Info list */}
              <div className="mt-8 space-y-4">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm text-secondary-text hover:text-primary transition-colors group">
                  <div className="p-2.5 bg-white border border-neutral-border rounded-[10px] text-primary group-hover:scale-105 transition-transform">
                    <Mail size={16} />
                  </div>
                  <span>{profile.email}</span>
                </a>
                
                <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-sm text-secondary-text hover:text-primary transition-colors group">
                  <div className="p-2.5 bg-white border border-neutral-border rounded-[10px] text-primary group-hover:scale-105 transition-transform">
                    <Phone size={16} />
                  </div>
                  <span>{profile.phone}</span>
                </a>

                <div className="flex items-center gap-3 text-sm text-secondary-text">
                  <div className="p-2.5 bg-white border border-neutral-border rounded-[10px] text-primary">
                    <MapPin size={16} />
                  </div>
                  <span>{profile.location}</span>
                </div>
              </div>

              {/* Quick Actions Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={profile.calendlyUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" className="gap-2">
                    <Calendar size={16} />
                    Schedule Discovery Call
                  </Button>
                </a>
                <a href={`mailto:${profile.email}`}>
                  <Button variant="outline" className="gap-2">
                    <Mail size={16} />
                    Email Me Direct
                  </Button>
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Form Container */}
          <div className="col-span-1 lg:col-span-7">
            <FadeUp delay={0.2}>
              <Card hoverLift={false} className="bg-white border border-neutral-border p-8 rounded-[20px] shadow-sm relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 mb-2 border-b border-neutral-border/50 pb-3">
                        <MessageSquare size={18} className="text-primary" />
                        <h3 className="text-base font-bold font-epilogue uppercase text-primary-text tracking-wide">
                          Send Brief Inquiry Message
                        </h3>
                      </div>

                      {errors.form && (
                        <div className="p-4 bg-danger/5 border border-danger/20 rounded-[12px] text-sm text-danger font-medium">
                          {errors.form}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FloatingInput
                          label="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          error={errors.name}
                          required
                        />
                        <FloatingInput
                          label="Email Address"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          error={errors.email}
                          required
                        />
                      </div>

                      <FloatingInput
                        label="Company Name (Optional)"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />

                      <FloatingTextarea
                        label="Message details (Brief project outline)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        error={errors.message}
                        required
                        rows={4}
                      />

                      <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={isSubmitting}
                        className="py-3 text-base"
                      >
                        {isSubmitting ? 'Sending Request...' : 'Send Message Brief'}
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-box"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-12 px-4 flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-success/10 border border-success/20 text-success flex items-center justify-center mb-6">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-2xl font-bold font-epilogue text-primary-text uppercase">
                        Inquiry Received
                      </h3>
                      <p className="mt-4 text-sm text-secondary-text max-w-sm leading-relaxed font-light">
                        Thank you for reaching out. Muhammed Mubashir P will review your message brief and respond within 24 business hours.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-8"
                        onClick={() => setIsSuccess(false)}
                      >
                        Send Another Inquiry
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}
