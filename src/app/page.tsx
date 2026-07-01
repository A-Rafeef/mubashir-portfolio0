'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Expertise } from '@/components/Expertise';
import { Experience } from '@/components/Experience';
import { Services } from '@/components/Services';
import { Campaigns } from '@/components/Campaigns';
import { Education } from '@/components/Education';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import {
  db,
  HeroData,
  AboutData,
  ExperienceItem,
  ExpertiseItem,
  ServiceItem,
  CampaignItem,
  EducationItem,
  TestimonialItem,
  ProfileData,
} from '@/lib/db';

export default function HomePage() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [about, setAbout] = useState<AboutData | null>(null);
  const [expertise, setExpertise] = useState<ExpertiseItem[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [
          heroData,
          aboutData,
          expertiseData,
          expData,
          srvData,
          cmpData,
          eduData,
          testData,
          profData,
        ] = await Promise.all([
          db.getHero(),
          db.getAbout(),
          db.getExpertise(),
          db.getExperiences(),
          db.getServices(),
          db.getCampaigns(),
          db.getEducation(),
          db.getTestimonials(),
          db.getProfile(),
        ]);

        setHero(heroData);
        setAbout(aboutData);
        setExpertise(expertiseData);
        setExperiences(expData);
        setServices(srvData);
        setCampaigns(cmpData);
        setEducation(eduData);
        setTestimonials(testData);
        setProfile(profData);
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-[3px] border-primary/10 border-t-primary animate-spin" />
          <span className="text-xs font-bold tracking-widest text-primary uppercase font-epilogue">
            MUHAMMED MUBASHIR P
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        {hero && <Hero data={hero} />}
        {about && <About data={about} />}
        {expertise.length > 0 && <Expertise data={expertise} />}
        {experiences.length > 0 && <Experience data={experiences} />}
        {services.length > 0 && <Services data={services} />}
        {campaigns.length > 0 && <Campaigns data={campaigns} />}
        {testimonials.length > 0 && <Testimonials data={testimonials} />}
        {education.length > 0 && <Education data={education} />}
        {profile && <Contact profile={profile} />}
      </main>
      {profile && <Footer profile={profile} />}
    </>
  );
}
