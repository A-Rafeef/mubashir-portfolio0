'use client';

import React, { useState, useEffect } from 'react';
import {
  db,
  HeroData,
  AboutData,
  ExperienceItem,
  ServiceItem,
  CampaignItem,
  EducationItem,
  TestimonialItem,
  ProfileData,
  ExpertiseItem,
} from '@/lib/db';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { FloatingInput, FloatingTextarea } from '@/components/ui/Input';
import {
  Save,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Search,
  Eye,
  CheckCircle,
  AlertCircle,
  X,
  PlusCircle,
  TrendingUp,
  Image as ImageIcon,
} from 'lucide-react';

export default function AdminSectionsPage() {
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'experience' | 'services' | 'campaigns' | 'education' | 'testimonials'>('hero');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // States for database structures
  const [hero, setHero] = useState<HeroData | null>(null);
  const [about, setAbout] = useState<AboutData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');

  // Modals / CRUD states
  const [crudModal, setCrudModal] = useState<{
    isOpen: boolean;
    type: 'experience' | 'service' | 'campaign' | 'education' | 'testimonial';
    mode: 'add' | 'edit';
    activeId?: string;
  }>({ isOpen: false, type: 'experience', mode: 'add' });

  // Form states for dialog forms
  const [expForm, setExpForm] = useState<Omit<ExperienceItem, 'id'>>({
    position: '',
    company: '',
    duration: '',
    responsibilities: [''],
    achievements: [''],
    order: 1,
  });

  const [srvForm, setSrvForm] = useState<Omit<ServiceItem, 'id'>>({
    title: '',
    description: '',
    details: [''],
    ctaText: 'Book Service',
    order: 1,
  });

  const [cmpForm, setCmpForm] = useState<Omit<CampaignItem, 'id'>>({
    title: '',
    description: '',
    coverImage: '',
    category: '',
    results: [''],
    fullCaseStudy: '',
    order: 1,
  });

  const [eduForm, setEduForm] = useState<Omit<EducationItem, 'id'>>({
    degree: '',
    institution: '',
    year: '',
    order: 1,
  });

  const [testForm, setTestForm] = useState<Omit<TestimonialItem, 'id'>>({
    name: '',
    role: '',
    company: '',
    content: '',
    order: 1,
  });

  const loadAllData = async () => {
    try {
      const [hData, aData, pData, exps, srvs, cmps, edus, tests] = await Promise.all([
        db.getHero(),
        db.getAbout(),
        db.getProfile(),
        db.getExperiences(),
        db.getServices(),
        db.getCampaigns(),
        db.getEducation(),
        db.getTestimonials(),
      ]);

      setHero(hData);
      setAbout(aData);
      setProfile(pData);
      setExperiences(exps);
      setServices(srvs);
      setCampaigns(cmps);
      setEducation(edus);
      setTestimonials(tests);
    } catch (err) {
      showToast('Failed to load portfolio sections data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Base64 file handler for drag and drop mockup
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'hero' | 'campaign') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (target === 'hero' && hero) {
        setHero({ ...hero, imageUrl: base64String });
      } else if (target === 'campaign') {
        setCmpForm((prev) => ({ ...prev, coverImage: base64String }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Global Save Handlers for Profile/Hero/About
  const handleSaveHeroProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hero || !profile) return;
    try {
      await Promise.all([db.updateHero(hero), db.updateProfile(profile)]);
      showToast('Hero settings & profile coordinates updated successfully!');
    } catch (err) {
      showToast('Failed to update settings', 'error');
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!about) return;
    try {
      await db.updateAbout(about);
      showToast('About bio narratives updated successfully!');
    } catch (err) {
      showToast('Failed to update About details', 'error');
    }
  };

  // Delete Action Handler
  const handleDeleteItem = async (type: string, id: string) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      if (type === 'experience') {
        const updated = experiences.filter((x) => x.id !== id);
        await db.updateExperiences(updated);
      } else if (type === 'service') {
        const updated = services.filter((x) => x.id !== id);
        await db.updateServices(updated);
      } else if (type === 'campaign') {
        const updated = campaigns.filter((x) => x.id !== id);
        await db.updateCampaigns(updated);
      } else if (type === 'education') {
        const updated = education.filter((x) => x.id !== id);
        await db.updateEducation(updated);
      } else if (type === 'testimonial') {
        const updated = testimonials.filter((x) => x.id !== id);
        await db.updateTestimonials(updated);
      }
      showToast(`Selected ${type} milestone removed successfully.`);
      loadAllData();
    } catch (err) {
      showToast('Deletion failed', 'error');
    }
  };

  // Form CRUD Openers
  const openAddModal = (type: typeof crudModal.type) => {
    setCrudModal({ isOpen: true, type, mode: 'add' });
    if (type === 'experience') {
      setExpForm({ position: '', company: '', duration: '', responsibilities: [''], achievements: [''], order: experiences.length + 1 });
    } else if (type === 'service') {
      setSrvForm({ title: '', description: '', details: [''], ctaText: 'Book Service', order: services.length + 1 });
    } else if (type === 'campaign') {
      setCmpForm({ title: '', description: '', coverImage: '', category: '', results: [''], fullCaseStudy: '', order: campaigns.length + 1 });
    } else if (type === 'education') {
      setEduForm({ degree: '', institution: '', year: '', order: education.length + 1 });
    } else if (type === 'testimonial') {
      setTestForm({ name: '', role: '', company: '', content: '', order: testimonials.length + 1 });
    }
  };

  const openEditModal = (type: typeof crudModal.type, id: string) => {
    setCrudModal({ isOpen: true, type, mode: 'edit', activeId: id });
    if (type === 'experience') {
      const item = experiences.find((x) => x.id === id);
      if (item) setExpForm({ ...item });
    } else if (type === 'service') {
      const item = services.find((x) => x.id === id);
      if (item) setSrvForm({ ...item });
    } else if (type === 'campaign') {
      const item = campaigns.find((x) => x.id === id);
      if (item) setCmpForm({ ...item });
    } else if (type === 'education') {
      const item = education.find((x) => x.id === id);
      if (item) setEduForm({ ...item });
    } else if (type === 'testimonial') {
      const item = testimonials.find((x) => x.id === id);
      if (item) setTestForm({ ...item });
    }
  };

  // Dialog Form Submits
  const handleDialogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { type, mode, activeId } = crudModal;

    try {
      if (type === 'experience') {
        let updated: ExperienceItem[];
        if (mode === 'add') {
          updated = [...experiences, { ...expForm, id: `exp-${Date.now()}` }];
        } else {
          updated = experiences.map((x) => (x.id === activeId ? { ...expForm, id: x.id } : x));
        }
        await db.updateExperiences(updated);
      } else if (type === 'service') {
        let updated: ServiceItem[];
        if (mode === 'add') {
          updated = [...services, { ...srvForm, id: `srv-${Date.now()}` }];
        } else {
          updated = services.map((x) => (x.id === activeId ? { ...srvForm, id: x.id } : x));
        }
        await db.updateServices(updated);
      } else if (type === 'campaign') {
        let updated: CampaignItem[];
        if (mode === 'add') {
          updated = [...campaigns, { ...cmpForm, id: `cmp-${Date.now()}` }];
        } else {
          updated = campaigns.map((x) => (x.id === activeId ? { ...cmpForm, id: x.id } : x));
        }
        await db.updateCampaigns(updated);
      } else if (type === 'education') {
        let updated: EducationItem[];
        if (mode === 'add') {
          updated = [...education, { ...eduForm, id: `edu-${Date.now()}` }];
        } else {
          updated = education.map((x) => (x.id === activeId ? { ...eduForm, id: x.id } : x));
        }
        await db.updateEducation(updated);
      } else if (type === 'testimonial') {
        let updated: TestimonialItem[];
        if (mode === 'add') {
          updated = [...testimonials, { ...testForm, id: `test-${Date.now()}` }];
        } else {
          updated = testimonials.map((x) => (x.id === activeId ? { ...testForm, id: x.id } : x));
        }
        await db.updateTestimonials(updated);
      }

      showToast(`Record ${mode === 'add' ? 'created' : 'updated'} successfully.`);
      setCrudModal({ isOpen: false, type: 'experience', mode: 'add' });
      loadAllData();
    } catch (err) {
      showToast('Form save operation failed', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Tabs layout mappings
  const tabs = [
    { id: 'hero', name: 'Hero & Profile' },
    { id: 'about', name: 'About bio' },
    { id: 'experience', name: 'Experience' },
    { id: 'services', name: 'Services' },
    { id: 'campaigns', name: 'Campaigns' },
    { id: 'education', name: 'Education' },
    { id: 'testimonials', name: 'Testimonials' },
  ];

  return (
    <div className="flex flex-col gap-6 text-left">
      
      {/* Header & Notifications */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-epilogue tracking-tight uppercase text-primary-text">
            Sections Content Editor
          </h1>
          <p className="text-sm text-secondary-text font-light">
            Update your landing page copy, testimonials, campaigns, and experience milestones.
          </p>
        </div>
      </div>

      {/* Dynamic Toast Banner */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-[12px] shadow-xl border flex items-center gap-3 animate-fade-in ${
            toast.type === 'success' ? 'bg-white border-success/20 text-primary-text' : 'bg-white border-danger/20 text-primary-text'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle className="text-success" size={20} />
          ) : (
            <AlertCircle className="text-danger" size={20} />
          )}
          <span className="text-sm font-semibold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="text-secondary-text hover:text-primary-text ml-2">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Tabs navigation list */}
      <div className="flex flex-wrap gap-1 bg-white border border-neutral-border p-1 rounded-[16px] max-w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setSearchQuery('');
            }}
            className={`px-4 py-2.5 rounded-[12px] text-xs sm:text-sm font-bold tracking-tight transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-sm'
                : 'text-secondary-text hover:bg-neutral-bg hover:text-primary-text'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Panel contents */}
      <div className="flex flex-col gap-6">
        
        {/* Tab 1: Hero & Profile */}
        {activeTab === 'hero' && hero && profile && (
          <form onSubmit={handleSaveHeroProfile} className="space-y-6">
            <Card hoverLift={false} className="bg-white border border-neutral-border p-6 rounded-[20px] space-y-6">
              <h2 className="text-base font-bold uppercase tracking-wider text-primary border-b border-neutral-border pb-3">
                Hero Branding & Stats
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  label="Name (Full Display)"
                  value={hero.name}
                  onChange={(e) => setHero({ ...hero, name: e.target.value })}
                  required
                />
                <FloatingInput
                  label="Profession Subtitle"
                  value={hero.profession}
                  onChange={(e) => setHero({ ...hero, profession: e.target.value })}
                  required
                />
              </div>

              <FloatingTextarea
                label="One-line Value Proposition Tagline"
                value={hero.tagline}
                onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <FloatingInput
                  label="Years Experience Stat"
                  value={hero.stats.experience}
                  onChange={(e) =>
                    setHero({ ...hero, stats: { ...hero.stats, experience: e.target.value } })
                  }
                  required
                />
                <FloatingInput
                  label="Projects Stat"
                  value={hero.stats.projects}
                  onChange={(e) =>
                    setHero({ ...hero, stats: { ...hero.stats, projects: e.target.value } })
                  }
                  required
                />
                <FloatingInput
                  label="Campaigns Stat"
                  value={hero.stats.campaigns}
                  onChange={(e) =>
                    setHero({ ...hero, stats: { ...hero.stats, campaigns: e.target.value } })
                  }
                  required
                />
                <FloatingInput
                  label="Industries Stat"
                  value={hero.stats.industries}
                  onChange={(e) =>
                    setHero({ ...hero, stats: { ...hero.stats, industries: e.target.value } })
                  }
                  required
                />
              </div>

              {/* Drag and drop image upload panel */}
              <div>
                <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider block mb-2">
                  Portrait Picture Upload (Base64 Persistent Storage)
                </span>
                <div className="flex flex-col sm:flex-row gap-5 items-center">
                  <div className="relative w-24 h-24 rounded-[12px] border border-neutral-border overflow-hidden bg-neutral-bg">
                    {hero.imageUrl ? (
                      <img src={hero.imageUrl} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-secondary-text">
                        <ImageIcon size={24} />
                      </div>
                    )}
                  </div>
                  <label className="flex flex-col items-center justify-center px-6 py-5 border border-dashed border-neutral-border hover:border-primary/40 rounded-[12px] bg-neutral-bg/30 hover:bg-neutral-bg/60 cursor-pointer transition-colors max-w-sm text-center">
                    <Upload className="text-secondary-text mb-2" size={18} />
                    <span className="text-xs font-semibold text-primary-text">Drag & Drop Image or Click to Browse</span>
                    <span className="text-[10px] text-secondary-text mt-1 font-light">Supports PNG, JPG, WEBP. Max size 2MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'hero')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </Card>

            <Card hoverLift={false} className="bg-white border border-neutral-border p-6 rounded-[20px] space-y-6">
              <h2 className="text-base font-bold uppercase tracking-wider text-primary border-b border-neutral-border pb-3">
                Profile Contact Coordinates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  label="Contact Email Address"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  required
                />
                <FloatingInput
                  label="Phone Coordinate"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  required
                />
                <FloatingInput
                  label="Location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  required
                />
                <FloatingInput
                  label="Calendly Appointment URL"
                  value={profile.calendlyUrl}
                  onChange={(e) => setProfile({ ...profile, calendlyUrl: e.target.value })}
                  required
                />
                <FloatingInput
                  label="LinkedIn Link"
                  value={profile.linkedin}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                  required
                />
                <FloatingInput
                  label="Twitter Link"
                  value={profile.twitter}
                  onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                  required
                />
              </div>
            </Card>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" className="gap-2 px-6 py-3 font-semibold">
                <Save size={16} />
                Save Brand Settings
              </Button>
            </div>
          </form>
        )}

        {/* Tab 2: About narratives */}
        {activeTab === 'about' && about && (
          <form onSubmit={handleSaveAbout} className="space-y-6">
            <Card hoverLift={false} className="bg-white border border-neutral-border p-6 rounded-[20px] space-y-6">
              <h2 className="text-base font-bold uppercase tracking-wider text-primary border-b border-neutral-border pb-3">
                Bio Pillars Narrative
              </h2>

              <FloatingTextarea
                label="Executive Introduction Text"
                value={about.intro}
                onChange={(e) => setAbout({ ...about, intro: e.target.value })}
                required
                rows={5}
              />

              <FloatingTextarea
                label="Consultancy Mission"
                value={about.mission}
                onChange={(e) => setAbout({ ...about, mission: e.target.value })}
                required
                rows={4}
              />

              <FloatingTextarea
                label="Analysis & Strategy Approach"
                value={about.approach}
                onChange={(e) => setAbout({ ...about, approach: e.target.value })}
                required
                rows={4}
              />

              <FloatingTextarea
                label="Business Growth Philosophy"
                value={about.philosophy}
                onChange={(e) => setAbout({ ...about, philosophy: e.target.value })}
                required
                rows={4}
              />
            </Card>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" className="gap-2 px-6 py-3 font-semibold">
                <Save size={16} />
                Save Bio Narratives
              </Button>
            </div>
          </form>
        )}

        {/* Dynamic Lists Tab View: Experiences, Services, Campaigns, Education, Testimonials */}
        {['experience', 'services', 'campaigns', 'education', 'testimonials'].includes(activeTab) && (
          <Card hoverLift={false} className="bg-white border border-neutral-border rounded-[20px] p-6">
            
            {/* Table Controller bar */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6 pb-4 border-b border-neutral-border/50">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-text" size={16} />
                <input
                  type="text"
                  placeholder="Search current logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-neutral-border rounded-[12px] text-sm w-full outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <Button
                variant="primary"
                size="sm"
                className="gap-1.5 py-2 cursor-pointer"
                onClick={() => openAddModal(activeTab as any)}
              >
                <PlusCircle size={16} />
                Add New Record
              </Button>
            </div>

            {/* Experiences Table */}
            {activeTab === 'experience' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-neutral-border text-xs font-bold uppercase tracking-wider text-secondary-text">
                      <th className="pb-3 px-2">Role Title</th>
                      <th className="pb-3 px-2">Company</th>
                      <th className="pb-3 px-2">Duration</th>
                      <th className="pb-3 px-2">Sort Order</th>
                      <th className="pb-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-border/50 text-primary-text">
                    {experiences
                      .filter((x) =>
                        x.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        x.company.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-neutral-bg/30 transition-colors">
                          <td className="py-3 px-2 font-bold">{item.position}</td>
                          <td className="py-3 px-2 text-secondary-text">{item.company}</td>
                          <td className="py-3 px-2 text-xs font-medium">{item.duration}</td>
                          <td className="py-3 px-2 text-xs">{item.order}</td>
                          <td className="py-3 px-2 text-right">
                            <div className="flex justify-end gap-1.5">
                              <Button
                                variant="outline"
                                size="sm"
                                className="p-1.5 h-auto rounded-[8px]"
                                onClick={() => openEditModal('experience', item.id)}
                              >
                                <Edit2 size={13} />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="p-1.5 h-auto text-danger border-danger/10 hover:bg-danger/5 rounded-[8px]"
                                onClick={() => handleDeleteItem('experience', item.id)}
                              >
                                <Trash2 size={13} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Services Table */}
            {activeTab === 'services' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-neutral-border text-xs font-bold uppercase tracking-wider text-secondary-text">
                      <th className="pb-3 px-2">Service Name</th>
                      <th className="pb-3 px-2">Cta Text</th>
                      <th className="pb-3 px-2">Sort Order</th>
                      <th className="pb-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-border/50 text-primary-text">
                    {services
                      .filter((x) => x.title.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-neutral-bg/30 transition-colors">
                          <td className="py-3 px-2 font-bold">{item.title}</td>
                          <td className="py-3 px-2 text-secondary-text">{item.ctaText}</td>
                          <td className="py-3 px-2 text-xs">{item.order}</td>
                          <td className="py-3 px-2 text-right">
                            <div className="flex justify-end gap-1.5">
                              <Button
                                variant="outline"
                                size="sm"
                                className="p-1.5 h-auto rounded-[8px]"
                                onClick={() => openEditModal('service', item.id)}
                              >
                                <Edit2 size={13} />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="p-1.5 h-auto text-danger border-danger/10 hover:bg-danger/5 rounded-[8px]"
                                onClick={() => handleDeleteItem('service', item.id)}
                              >
                                <Trash2 size={13} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Campaigns Table */}
            {activeTab === 'campaigns' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-neutral-border text-xs font-bold uppercase tracking-wider text-secondary-text">
                      <th className="pb-3 px-2">Campaign Title</th>
                      <th className="pb-3 px-2">Category</th>
                      <th className="pb-3 px-2">Sort Order</th>
                      <th className="pb-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-border/50 text-primary-text">
                    {campaigns
                      .filter((x) =>
                        x.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        x.category.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-neutral-bg/30 transition-colors">
                          <td className="py-3 px-2 font-bold">{item.title}</td>
                          <td className="py-3 px-2 text-secondary-text">{item.category}</td>
                          <td className="py-3 px-2 text-xs">{item.order}</td>
                          <td className="py-3 px-2 text-right">
                            <div className="flex justify-end gap-1.5">
                              <Button
                                variant="outline"
                                size="sm"
                                className="p-1.5 h-auto rounded-[8px]"
                                onClick={() => openEditModal('campaign', item.id)}
                              >
                                <Edit2 size={13} />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="p-1.5 h-auto text-danger border-danger/10 hover:bg-danger/5 rounded-[8px]"
                                onClick={() => handleDeleteItem('campaign', item.id)}
                              >
                                <Trash2 size={13} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Education Table */}
            {activeTab === 'education' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-neutral-border text-xs font-bold uppercase tracking-wider text-secondary-text">
                      <th className="pb-3 px-2">Degree / Certificate</th>
                      <th className="pb-3 px-2">Institution</th>
                      <th className="pb-3 px-2">Grad Year</th>
                      <th className="pb-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-border/50 text-primary-text">
                    {education
                      .filter((x) =>
                        x.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        x.institution.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-neutral-bg/30 transition-colors">
                          <td className="py-3 px-2 font-bold">{item.degree}</td>
                          <td className="py-3 px-2 text-secondary-text">{item.institution}</td>
                          <td className="py-3 px-2 text-xs font-medium">{item.year}</td>
                          <td className="py-3 px-2 text-right">
                            <div className="flex justify-end gap-1.5">
                              <Button
                                variant="outline"
                                size="sm"
                                className="p-1.5 h-auto rounded-[8px]"
                                onClick={() => openEditModal('education', item.id)}
                              >
                                <Edit2 size={13} />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="p-1.5 h-auto text-danger border-danger/10 hover:bg-danger/5 rounded-[8px]"
                                onClick={() => handleDeleteItem('education', item.id)}
                              >
                                <Trash2 size={13} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Testimonials Table */}
            {activeTab === 'testimonials' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-neutral-border text-xs font-bold uppercase tracking-wider text-secondary-text">
                      <th className="pb-3 px-2">Client Name</th>
                      <th className="pb-3 px-2">Position & Org</th>
                      <th className="pb-3 px-2">Recommendation</th>
                      <th className="pb-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-border/50 text-primary-text">
                    {testimonials
                      .filter((x) =>
                        x.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        x.company.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-neutral-bg/30 transition-colors">
                          <td className="py-3 px-2 font-bold">{item.name}</td>
                          <td className="py-3 px-2 text-secondary-text">
                            {item.role}, {item.company}
                          </td>
                          <td className="py-3 px-2 text-xs font-light max-w-xs truncate">
                            {item.content}
                          </td>
                          <td className="py-3 px-2 text-right">
                            <div className="flex justify-end gap-1.5">
                              <Button
                                variant="outline"
                                size="sm"
                                className="p-1.5 h-auto rounded-[8px]"
                                onClick={() => openEditModal('testimonial', item.id)}
                              >
                                <Edit2 size={13} />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="p-1.5 h-auto text-danger border-danger/10 hover:bg-danger/5 rounded-[8px]"
                                onClick={() => handleDeleteItem('testimonial', item.id)}
                              >
                                <Trash2 size={13} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

          </Card>
        )}
      </div>

      {/* Unified CRUD Dialog Modals */}
      <Dialog
        isOpen={crudModal.isOpen}
        onClose={() => setCrudModal({ ...crudModal, isOpen: false })}
        title={`${crudModal.mode === 'add' ? 'Create' : 'Modify'} ${
          crudModal.type.charAt(0).toUpperCase() + crudModal.type.slice(1)
        } record`}
      >
        <form onSubmit={handleDialogSubmit} className="space-y-5 text-left">
          
          {/* Experience Form content */}
          {crudModal.type === 'experience' && (
            <div className="space-y-4">
              <FloatingInput
                label="Role Title"
                value={expForm.position}
                onChange={(e) => setExpForm({ ...expForm, position: e.target.value })}
                required
              />
              <FloatingInput
                label="Organization / Company Name"
                value={expForm.company}
                onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                required
              />
              <FloatingInput
                label="Duration Period (e.g. 2022 - Present)"
                value={expForm.duration}
                onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
                required
              />
              <FloatingInput
                label="Sort Order"
                type="number"
                value={expForm.order}
                onChange={(e) => setExpForm({ ...expForm, order: parseInt(e.target.value) || 1 })}
                required
              />

              {/* Dynamic Responsibilities */}
              <div>
                <label className="text-[10px] font-bold text-secondary-text uppercase tracking-wider block mb-2">
                  Key Work Responsibilities
                </label>
                {expForm.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center">
                    <FloatingInput
                      label={`Responsibility #${idx + 1}`}
                      value={resp}
                      onChange={(e) => {
                        const next = [...expForm.responsibilities];
                        next[idx] = e.target.value;
                        setExpForm({ ...expForm, responsibilities: next });
                      }}
                      required
                    />
                    {expForm.responsibilities.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="p-3 text-danger border-none"
                        onClick={() => {
                          const next = expForm.responsibilities.filter((_, i) => i !== idx);
                          setExpForm({ ...expForm, responsibilities: next });
                        }}
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setExpForm({ ...expForm, responsibilities: [...expForm.responsibilities, ''] })
                  }
                  className="text-xs font-semibold text-primary hover:text-tertiary flex items-center gap-1 mt-1 cursor-pointer"
                >
                  <Plus size={14} /> Add Responsibility Item
                </button>
              </div>

              {/* Dynamic Accomplishments */}
              <div>
                <label className="text-[10px] font-bold text-secondary-text uppercase tracking-wider block mb-2">
                  Commercial Accomplishments
                </label>
                {expForm.achievements.map((ach, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center">
                    <FloatingInput
                      label={`Accomplishment #${idx + 1}`}
                      value={ach}
                      onChange={(e) => {
                        const next = [...expForm.achievements];
                        next[idx] = e.target.value;
                        setExpForm({ ...expForm, achievements: next });
                      }}
                      required
                    />
                    {expForm.achievements.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="p-3 text-danger border-none"
                        onClick={() => {
                          const next = expForm.achievements.filter((_, i) => i !== idx);
                          setExpForm({ ...expForm, achievements: next });
                        }}
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setExpForm({ ...expForm, achievements: [...expForm.achievements, ''] })
                  }
                  className="text-xs font-semibold text-primary hover:text-tertiary flex items-center gap-1 mt-1 cursor-pointer"
                >
                  <Plus size={14} /> Add Accomplishment Milestone
                </button>
              </div>
            </div>
          )}

          {/* Service Form content */}
          {crudModal.type === 'service' && (
            <div className="space-y-4">
              <FloatingInput
                label="Service Title"
                value={srvForm.title}
                onChange={(e) => setSrvForm({ ...srvForm, title: e.target.value })}
                required
              />
              <FloatingTextarea
                label="Package Description Summary"
                value={srvForm.description}
                onChange={(e) => setSrvForm({ ...srvForm, description: e.target.value })}
                required
              />
              <FloatingInput
                label="CTA Button Text"
                value={srvForm.ctaText}
                onChange={(e) => setSrvForm({ ...srvForm, ctaText: e.target.value })}
                required
              />
              <FloatingInput
                label="Sort Order"
                type="number"
                value={srvForm.order}
                onChange={(e) => setSrvForm({ ...srvForm, order: parseInt(e.target.value) || 1 })}
                required
              />

              {/* Dynamic Deliverables Details */}
              <div>
                <label className="text-[10px] font-bold text-secondary-text uppercase tracking-wider block mb-2">
                  Service Deliverables Details
                </label>
                {srvForm.details.map((dt, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center">
                    <FloatingInput
                      label={`Deliverable #${idx + 1}`}
                      value={dt}
                      onChange={(e) => {
                        const next = [...srvForm.details];
                        next[idx] = e.target.value;
                        setSrvForm({ ...srvForm, details: next });
                      }}
                      required
                    />
                    {srvForm.details.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="p-3 text-danger border-none"
                        onClick={() => {
                          const next = srvForm.details.filter((_, i) => i !== idx);
                          setSrvForm({ ...srvForm, details: next });
                        }}
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setSrvForm({ ...srvForm, details: [...srvForm.details, ''] })
                  }
                  className="text-xs font-semibold text-primary hover:text-tertiary flex items-center gap-1 mt-1 cursor-pointer"
                >
                  <Plus size={14} /> Add Deliverable Feature
                </button>
              </div>
            </div>
          )}

          {/* Campaign Form content */}
          {crudModal.type === 'campaign' && (
            <div className="space-y-4">
              <FloatingInput
                label="Case Study Campaign Title"
                value={cmpForm.title}
                onChange={(e) => setCmpForm({ ...cmpForm, title: e.target.value })}
                required
              />
              <FloatingInput
                label="Campaign Sector Category"
                value={cmpForm.category}
                onChange={(e) => setCmpForm({ ...cmpForm, category: e.target.value })}
                required
              />
              <FloatingTextarea
                label="Short Description summary"
                value={cmpForm.description}
                onChange={(e) => setCmpForm({ ...cmpForm, description: e.target.value })}
                required
              />
              <FloatingTextarea
                label="Full Case Study narrative breakdown (Markdown preview)"
                value={cmpForm.fullCaseStudy}
                onChange={(e) => setCmpForm({ ...cmpForm, fullCaseStudy: e.target.value })}
                required
                rows={4}
              />
              <FloatingInput
                label="Sort Order"
                type="number"
                value={cmpForm.order}
                onChange={(e) => setCmpForm({ ...cmpForm, order: parseInt(e.target.value) || 1 })}
                required
              />

              {/* Cover Image mock drag drop uploader */}
              <div>
                <span className="text-[10px] font-bold text-secondary-text uppercase tracking-wider block mb-2">
                  Cover Image Upload
                </span>
                <div className="flex gap-4 items-center">
                  <div className="relative w-20 h-20 bg-neutral-bg border border-neutral-border rounded-[10px] overflow-hidden">
                    {cmpForm.coverImage ? (
                      <img src={cmpForm.coverImage} alt="cover" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-secondary-text">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </div>
                  <label className="flex-1 flex flex-col items-center justify-center py-4 border border-dashed border-neutral-border hover:border-primary/30 rounded-[10px] bg-neutral-bg/20 cursor-pointer text-center">
                    <Upload size={14} className="text-secondary-text mb-1" />
                    <span className="text-xs font-semibold text-primary-text">Click to choose case study banner</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'campaign')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Dynamic Results outputs */}
              <div>
                <label className="text-[10px] font-bold text-secondary-text uppercase tracking-wider block mb-2">
                  Verified Outcomes Metrics (Max 3)
                </label>
                {cmpForm.results.map((res, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center">
                    <FloatingInput
                      label={`Metric Outcome #${idx + 1}`}
                      value={res}
                      onChange={(e) => {
                        const next = [...cmpForm.results];
                        next[idx] = e.target.value;
                        setCmpForm({ ...cmpForm, results: next });
                      }}
                      required
                    />
                    {cmpForm.results.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="p-3 text-danger border-none"
                        onClick={() => {
                          const next = cmpForm.results.filter((_, i) => i !== idx);
                          setCmpForm({ ...cmpForm, results: next });
                        }}
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                ))}
                {cmpForm.results.length < 3 && (
                  <button
                    type="button"
                    onClick={() =>
                      setCmpForm({ ...cmpForm, results: [...cmpForm.results, ''] })
                    }
                    className="text-xs font-semibold text-primary hover:text-tertiary flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    <Plus size={14} /> Add Outcome Metric
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Education Form content */}
          {crudModal.type === 'education' && (
            <div className="space-y-4">
              <FloatingInput
                label="Degree / Diploma Title"
                value={eduForm.degree}
                onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                required
              />
              <FloatingInput
                label="Institution Name"
                value={eduForm.institution}
                onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                required
              />
              <FloatingInput
                label="Graduation Year (e.g. 2012 - 2014)"
                value={eduForm.year}
                onChange={(e) => setEduForm({ ...eduForm, year: e.target.value })}
                required
              />
              <FloatingInput
                label="Sort Order"
                type="number"
                value={eduForm.order}
                onChange={(e) => setEduForm({ ...eduForm, order: parseInt(e.target.value) || 1 })}
                required
              />
            </div>
          )}

          {/* Testimonial Form content */}
          {crudModal.type === 'testimonial' && (
            <div className="space-y-4">
              <FloatingInput
                label="Client Reviewer Name"
                value={testForm.name}
                onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                required
              />
              <FloatingInput
                label="Position / Role Title"
                value={testForm.role}
                onChange={(e) => setTestForm({ ...testForm, role: e.target.value })}
                required
              />
              <FloatingInput
                label="Corporate Organization / Company"
                value={testForm.company}
                onChange={(e) => setTestForm({ ...testForm, company: e.target.value })}
                required
              />
              <FloatingTextarea
                label="Recommendation Narrative Content"
                value={testForm.content}
                onChange={(e) => setTestForm({ ...testForm, content: e.target.value })}
                required
              />
              <FloatingInput
                label="Sort Order"
                type="number"
                value={testForm.order}
                onChange={(e) => setTestForm({ ...testForm, order: parseInt(e.target.value) || 1 })}
                required
              />
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCrudModal({ ...crudModal, isOpen: false })}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {crudModal.mode === 'add' ? 'Create Record' : 'Save Modifications'}
            </Button>
          </div>

        </form>
      </Dialog>

    </div>
  );
}
