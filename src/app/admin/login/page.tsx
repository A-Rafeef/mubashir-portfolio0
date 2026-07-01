'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FloatingInput } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { KeyRound, ShieldAlert, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to /admin immediately
  useEffect(() => {
    const auth = localStorage.getItem('mubashir_admin_auth');
    if (auth === 'true') {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Demonstration credentials matching strategic consultant admin profile
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('mubashir_admin_auth', 'true');
        router.push('/admin');
      } else {
        setError('Invalid administrator credentials. Please check username and password.');
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col items-center justify-center p-6 relative">
      {/* Return home link */}
      <a
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-secondary-text hover:text-primary transition-colors group"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
        Back to Website
      </a>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[420px]"
      >
        <Card hoverLift={false} className="bg-white border border-neutral-border p-8 rounded-[20px] shadow-lg">
          {/* Form Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/5 border border-primary/10 text-primary flex items-center justify-center mb-4">
              <KeyRound size={20} />
            </div>
            <h1 className="text-xl font-extrabold font-epilogue tracking-tight text-primary-text uppercase">
              Admin Portal Login
            </h1>
            <p className="mt-1.5 text-xs text-secondary-text max-w-[280px] leading-normal font-light">
              Enter administrator keys to access the portfolio content management system.
            </p>
          </div>

          {/* Form Errors */}
          {error && (
            <div className="p-4 bg-danger/5 border border-danger/20 rounded-[12px] text-xs text-danger font-medium flex items-start gap-2.5 mb-6 text-left leading-relaxed">
              <ShieldAlert size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <FloatingInput
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isSubmitting}
            />

            <FloatingInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={isSubmitting}
                className="py-3 text-sm font-semibold uppercase tracking-wider"
              >
                {isSubmitting ? 'Verifying keys...' : 'Authorize Login'}
              </Button>
            </div>
          </form>

          {/* Help Note */}
          <div className="mt-6 text-center text-[10px] text-secondary-text leading-normal">
            demo username: <code className="bg-neutral-bg px-1 py-0.5 rounded border border-neutral-border text-primary font-bold">admin</code> | password: <code className="bg-neutral-bg px-1 py-0.5 rounded border border-neutral-border text-primary font-bold">admin123</code>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
