'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Image as ImageIcon,
  Briefcase,
  Layers,
  FileText,
  GraduationCap,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NavItem {
  name: string;
  id: string;
  icon: React.ComponentType<any>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auth Guard check
  useEffect(() => {
    const auth = localStorage.getItem('mubashir_admin_auth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router, pathname]);

  const navItems: NavItem[] = [
    { name: 'Dashboard', id: '/admin', icon: LayoutDashboard },
    { name: 'Sections Content', id: '/admin/sections', icon: Layers },
  ];

  const handleLogout = () => {
    localStorage.removeItem('mubashir_admin_auth');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-bg flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // If path is login page, skip layout wrapping
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null; // Auth guard redirecting
  }

  return (
    <div className="min-h-screen bg-neutral-bg flex text-primary-text">
      
      {/* Sidebar for Desktop */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-neutral-border p-4 transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand/Logo Area */}
        <div className="flex items-center justify-between mb-8 px-2 py-1">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-1.5">
              <span className="font-epilogue font-extrabold tracking-tight text-primary text-lg">MUBASHIR ADM</span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            </div>
          ) : (
            <div className="w-3 h-3 rounded-full bg-secondary mx-auto" />
          )}
          
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-lg text-secondary-text hover:bg-neutral-bg transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col gap-1.5">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = pathname === item.id;
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.id)}
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-[12px] font-medium text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-secondary-text hover:bg-tertiary hover:text-white'
                }`}
                title={item.name}
              >
                <IconComp size={18} className="shrink-0" />
                {!sidebarCollapsed && <span>{item.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 px-3.5 py-3 rounded-[12px] font-medium text-sm text-danger hover:bg-danger/10 transition-colors mt-auto w-full cursor-pointer"
          title="Sign Out"
        >
          <LogOut size={18} className="shrink-0" />
          {!sidebarCollapsed && <span>Logout</span>}
        </button>
      </aside>

      {/* Sidebar for Mobile (Drawer overlay) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex flex-col w-64 max-w-xs bg-white h-full p-4 border-r border-neutral-border z-10 animate-slide-in">
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-1.5">
                <span className="font-epilogue font-extrabold tracking-tight text-primary text-lg">MUBASHIR ADM</span>
                <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1 text-secondary-text rounded-lg hover:bg-neutral-bg">
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col gap-1.5">
              {navItems.map((item) => {
                const IconComp = item.icon;
                const isActive = pathname === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      router.push(item.id);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center gap-3.5 px-3.5 py-3 rounded-[12px] font-medium text-sm transition-all duration-200 cursor-pointer ${
                      isActive ? 'bg-primary text-white' : 'text-secondary-text hover:bg-tertiary hover:text-white'
                    }`}
                  >
                    <IconComp size={18} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3.5 px-3.5 py-3 rounded-[12px] font-medium text-sm text-danger hover:bg-danger/10 transition-colors mt-auto w-full cursor-pointer"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Admin Header */}
        <header className="bg-white border-b border-neutral-border h-16 flex items-center justify-between px-6 shrink-0 md:justify-end">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-1.5 text-secondary-text rounded-lg hover:bg-neutral-bg"
          >
            <Menu size={22} />
          </button>
          
          <div className="flex items-center gap-3.5">
            <span className="text-xs font-semibold text-secondary-text bg-neutral-bg px-2.5 py-1 rounded-full border border-neutral-border">
              Admin Session
            </span>
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold font-epilogue">
              MP
            </div>
          </div>
        </header>

        {/* Dashboard Work Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
