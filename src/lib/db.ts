import { createClient } from '@supabase/supabase-js';

// Types Definition
export interface HeroData {
  profession: string;
  name: string;
  tagline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  imageUrl: string;
  stats: {
    experience: string;
    projects: string;
    campaigns: string;
    industries: string;
  };
}

export interface AboutData {
  intro: string;
  mission: string;
  approach: string;
  philosophy: string;
}

export interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
  order: number;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string[];
  ctaText: string;
  order: number;
}

export interface CampaignItem {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  category: string;
  results: string[];
  fullCaseStudy?: string;
  order: number;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  order: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string;
  order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'archived';
}

export interface ProfileData {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  twitter: string;
  calendlyUrl: string;
}

// Initial Mock/Default Data
const DEFAULT_HERO: HeroData = {
  profession: "Strategic Marketing Consultant",
  name: "MUHAMMED MUBASHIR P",
  tagline: "Building high-performance brand strategies and marketing operations for scaling enterprises and visionary founders.",
  primaryCtaText: "Book Consultation",
  primaryCtaLink: "#contact",
  secondaryCtaText: "View Experience",
  secondaryCtaLink: "#experience",
  imageUrl: "/images/mubashir_portrait.png",
  stats: {
    experience: "12+",
    projects: "140+",
    campaigns: "85+",
    industries: "18"
  }
};

const DEFAULT_ABOUT: AboutData = {
  intro: "I am an executive-level Strategic Marketing Consultant based in the GCC and India, with over 12 years of experience leading growth and brand direction for premium brands. I work alongside founders, executives, and enterprise teams to transform business objectives into high-impact marketing actions.",
  mission: "To eliminate marketing ambiguity for business leaders by structuring data-driven strategies, establishing repeatable growth systems, and aligning brand narratives with clear commercial goals.",
  approach: "My approach is analytical, iterative, and business-focused. I dissect market trends, audit operational processes, build custom execution frameworks, and coach internal marketing teams to ensure sustainable success.",
  philosophy: "Marketing is not an expense—it is a core engine of business strategy. I believe that high aesthetics must always be backed by rigorous operations, clear positioning, and performance metrics that tie directly to the bottom line."
};

const DEFAULT_EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    position: "Senior Growth & Brand Consultant",
    company: "Apex Enterprise Solutions",
    duration: "2022 - Present",
    responsibilities: [
      "Define global brand positioning and run international marketing strategies across US, Europe, and Middle East markets.",
      "Manage an annual ad-spend budget of $2.4M, optimizing channels for maximum customer acquisition cost (CAC) efficiency.",
      "Lead cross-functional teams comprising designers, product managers, data analysts, and copywriters."
    ],
    achievements: [
      "Engineered a go-to-market strategy that unlocked $14M in annual recurring revenue (ARR) in under 18 months.",
      "Decreased average CAC by 34% through targeted retargeting sequences and hyper-focused programmatic branding."
    ],
    order: 1
  },
  {
    id: "exp-2",
    position: "Director of Marketing Strategy",
    company: "Vanguard Retail Group",
    duration: "2018 - 2022",
    responsibilities: [
      "Overhauled legacy e-commerce marketing systems, integrating advanced customer data platforms (CDPs).",
      "Conceptualized and deployed multi-channel seasonal campaigns across digital, print, and retail storefronts.",
      "Coached a team of 18 junior and mid-level marketing professionals on operational agility and conversion rate optimization (CRO)."
    ],
    achievements: [
      "Boosted digital retail revenue by 120% YoY, crossing $22M in digital-driven store sales.",
      "Spearheaded a loyalty program overhaul, driving customer lifetime value (LTV) up by 45% in 12 months."
    ],
    order: 2
  },
  {
    id: "exp-3",
    position: "Lead Campaign Strategist",
    company: "Horizon Agency Network",
    duration: "2014 - 2018",
    responsibilities: [
      "Directed creative and performance marketing plans for premium automotive, real estate, and financial services brands.",
      "Conducted detailed quantitative market research and competitor bench-marking to identify blue ocean opportunities."
    ],
    achievements: [
      "Led the award-winning campaign launch for a luxury real estate development, selling out phase 1 in 3 weeks.",
      "Pioneered early social-commerce attribution modeling, improving marketing ROI accountability by 50%."
    ],
    order: 3
  }
];

const DEFAULT_EXPERTISE: ExpertiseItem[] = [
  { id: "ext-1", title: "Marketing Strategy", description: "Designing comprehensive, data-backed blueprints to enter new markets, launch products, and scale audience reach.", iconName: "TrendingUp", order: 1 },
  { id: "ext-2", title: "Business Consulting", description: "Analyzing operational structures, marketing metrics, and business models to align spend with enterprise growth goals.", iconName: "Briefcase", order: 2 },
  { id: "ext-3", title: "Operations", description: "Streamlining team workflows, dashboard analytics, asset production pipelines, and modern marketing tool integration.", iconName: "Cpu", order: 3 },
  { id: "ext-4", title: "Leadership", description: "Directing high-performing internal departments and external agency teams to execute vision with speed and cohesion.", iconName: "Users", order: 4 },
  { id: "ext-5", title: "Brand Positioning", description: "Refining identity, value proposition, and messaging architecture to elevate perception from commodity to category-leader.", iconName: "Award", order: 5 },
  { id: "ext-6", title: "Coaching", description: "Running deep-dive workshops and one-on-one sessions for founders and CMOs to build strategic marketing capabilities.", iconName: "GraduationCap", order: 6 }
];

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "srv-1",
    title: "Fractional CMO & Strategy",
    description: "Executive-level marketing guidance without the full-time overhead. Perfect for scale-ups and enterprises undergoing transitions.",
    details: [
      "Weekly strategic planning sessions and team alignment meetings",
      "Complete marketing audit and design of a 12-month growth roadmap",
      "Direct oversight of agency vendor selection and internal team KPI setup",
      "Ongoing campaign analysis, channel attribution mapping, and board reporting"
    ],
    ctaText: "Book CMO Strategy",
    order: 1
  },
  {
    id: "srv-2",
    title: "Brand Positioning & Launch Consulting",
    description: "A structured process to find your unique market space, clarify your message, and execute a flawless market entry.",
    details: [
      "Competitor analysis and target audience research maps",
      "Brand messaging matrix and value proposition creation",
      "Creative direction and visual identity brief guidelines",
      "Launch plan strategy, channel roadmap, and budget allocation models"
    ],
    ctaText: "Inquire About Positioning",
    order: 2
  },
  {
    id: "srv-3",
    title: "Marketing Operations & Team Coaching",
    description: "Unlocking efficiency and scaling output by setting up modern technology stacks and up-skilling your marketing department.",
    details: [
      "Analytics dashboards implementation (GA4, Mixpanel, Hubspot)",
      "Agile marketing workflow sprint structures (Jira, Notion, Asana)",
      "Direct workshops and training on high-performance performance ad campaigns",
      "Copywriting templates, email automation flows, and conversion optimization training"
    ],
    ctaText: "Request Operations Audit",
    order: 3
  }
];

const DEFAULT_CAMPAIGNS: CampaignItem[] = [
  {
    id: "cmp-1",
    title: "The Zenith Residence Launch",
    description: "Designed and executed the complete brand positioning and digital-first campaign strategy for a premium high-rise estate project, producing unprecedented sell-through times.",
    coverImage: "/images/zenith_campaign.png",
    category: "Real Estate Strategy",
    results: [
      "100% Phase 1 units sold in 21 days",
      "4,200+ qualified investor leads captured",
      "5.8x Return on Ad Spend (ROAS)"
    ],
    fullCaseStudy: "Using a mix of highly-targeted programmatic display ads, premium cinematic video assets, and a bespoke digital interactive booking portal, we repositioned Zenith from a standard high-rise to an exclusive luxury investment class. Our hyper-segmented outreach targeted high-net-worth individuals in the GCC, creating high-intent waiting lists that sold out the property weeks ahead of schedule.",
    order: 1
  },
  {
    id: "cmp-2",
    title: "E-Commerce Hyper-Growth Engine",
    description: "Re-architected the customer acquisition funnel and data infrastructure for a luxury lifestyle and apparel brand, driving exponential growth in recurring online transactions.",
    coverImage: "/images/ecommerce_campaign.png",
    category: "Retail Growth",
    results: [
      "120% YoY E-commerce revenue increase",
      "45% Increase in Customer Lifetime Value (LTV)",
      "3.2% Conversion Rate improvement across desktop and mobile"
    ],
    fullCaseStudy: "By migrating legacy marketing stacks to a modern Customer Data Platform (Segment + Klaviyo), we were able to implement hyper-personalized, behavior-triggered customer flows. Combined with a complete checkout redesign and automated loyalty gamification features, customer retention skyrocketed, shifting dependence away from costly top-of-funnel programmatic ads into high-margin repeat business.",
    order: 2
  },
  {
    id: "cmp-3",
    title: "Apex Cloud Go-To-Market Brand Launch",
    description: "Crafted the brand messaging and organic/paid search strategy for a leading enterprise SaaS platform, capturing significant market share in the B2B tech sector.",
    coverImage: "/images/apex_campaign.png",
    category: "SaaS & Tech",
    results: [
      "$14M ARR added within 18 months",
      "No. 1 ranking for 18 high-volume industry keywords",
      "94% Positive brand sentiment rating across media channels"
    ],
    fullCaseStudy: "Through positioning Apex Cloud as the security-first alternative to legacy databases, we built a content-led inbound system. Combined with high-impact LinkedIn executive roundtables and retargeting ads pointing to custom whitepapers, the cost-per-acquisition for large enterprise accounts dropped by 40% compared to traditional field sales.",
    order: 3
  }
];

const DEFAULT_EDUCATION: EducationItem[] = [
  {
    id: "edu-1",
    degree: "Executive MBA in Strategic Marketing",
    institution: "Indian Institute of Management (IIM)",
    year: "2012 - 2014",
    order: 1
  },
  {
    id: "edu-2",
    degree: "Bachelor of Business Administration (BBA)",
    institution: "Calicut University",
    year: "2008 - 2011",
    order: 2
  }
];

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Sarah Al-Mansoori",
    role: "CEO & Founder",
    company: "Zenith Developments",
    content: "Muhammed completely reshaped how we approached our property launches. His strategic insight, clarity in operations, and emphasis on metrics saved us millions in ad spend while delivering a sold-out phase weeks ahead of schedule. Highly recommended.",
    avatarUrl: "/images/avatar1.webp",
    order: 1
  },
  {
    id: "test-2",
    name: "David Sterling",
    role: "Managing Director",
    company: "Vanguard Lifestyle Group",
    content: "Mubashir operates at a level that bridges creative branding with pure business operations. Under his leadership, our online retail store grew 120% in a single year. He coached our team to become self-sufficient and data-driven.",
    avatarUrl: "/images/avatar2.webp",
    order: 2
  }
];

const DEFAULT_PROFILE: ProfileData = {
  email: "mubashir@consultant.com",
  phone: "+91 98765 43210",
  location: "GCC & India",
  linkedin: "https://linkedin.com/in/mubashir",
  twitter: "https://twitter.com/mubashir_mktg",
  calendlyUrl: "https://calendly.com/mubashir"
};

// Supabase Init
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isSupabaseEnabled = !!(supabaseUrl && supabaseAnonKey);
const supabase = isSupabaseEnabled ? createClient(supabaseUrl, supabaseAnonKey) : null;

// LocalStorage Helper
const isServer = typeof window === 'undefined';

function getLocalData<T>(key: string, defaultValue: T): T {
  if (isServer) return defaultValue;
  try {
    const item = localStorage.getItem(`mubashir_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Failed to read from localStorage:', e);
    return defaultValue;
  }
}

// Write to LocalStorage but only on client side
function setLocalData<T>(key: string, value: T): void {
  if (isServer) return;
  try {
    localStorage.setItem(`mubashir_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to write to localStorage:', e);
  }
}

// Unified Database Access Layer
export const db = {
  async getHero(): Promise<HeroData> {
    if (isSupabaseEnabled && supabase) {
      const { data, error } = await supabase.from('hero').select('*').single();
      if (!error && data) return data;
    }
    return getLocalData<HeroData>('hero', DEFAULT_HERO);
  },

  async updateHero(hero: HeroData): Promise<void> {
    if (isSupabaseEnabled && supabase) {
      await supabase.from('hero').upsert({ id: 1, ...hero });
    } else {
      setLocalData('hero', hero);
    }
  },

  async getAbout(): Promise<AboutData> {
    if (isSupabaseEnabled && supabase) {
      const { data, error } = await supabase.from('about').select('*').single();
      if (!error && data) return data;
    }
    return getLocalData<AboutData>('about', DEFAULT_ABOUT);
  },

  async updateAbout(about: AboutData): Promise<void> {
    if (isSupabaseEnabled && supabase) {
      await supabase.from('about').upsert({ id: 1, ...about });
    } else {
      setLocalData('about', about);
    }
  },

  async getExperiences(): Promise<ExperienceItem[]> {
    if (isSupabaseEnabled && supabase) {
      const { data, error } = await supabase.from('experiences').select('*').order('order', { ascending: true });
      if (!error && data) return data;
    }
    const items = getLocalData<ExperienceItem[]>('experiences', DEFAULT_EXPERIENCE);
    return items.sort((a, b) => a.order - b.order);
  },

  async updateExperiences(items: ExperienceItem[]): Promise<void> {
    if (isSupabaseEnabled && supabase) {
      await supabase.from('experiences').delete().neq('id', '0'); // clear all
      await supabase.from('experiences').insert(items);
    } else {
      setLocalData('experiences', items);
    }
  },

  async getExpertise(): Promise<ExpertiseItem[]> {
    if (isSupabaseEnabled && supabase) {
      const { data, error } = await supabase.from('expertise').select('*').order('order', { ascending: true });
      if (!error && data) return data;
    }
    const items = getLocalData<ExpertiseItem[]>('expertise', DEFAULT_EXPERTISE);
    return items.sort((a, b) => a.order - b.order);
  },

  async updateExpertise(items: ExpertiseItem[]): Promise<void> {
    if (isSupabaseEnabled && supabase) {
      await supabase.from('expertise').delete().neq('id', '0');
      await supabase.from('expertise').insert(items);
    } else {
      setLocalData('expertise', items);
    }
  },

  async getServices(): Promise<ServiceItem[]> {
    if (isSupabaseEnabled && supabase) {
      const { data, error } = await supabase.from('services').select('*').order('order', { ascending: true });
      if (!error && data) return data;
    }
    const items = getLocalData<ServiceItem[]>('services', DEFAULT_SERVICES);
    return items.sort((a, b) => a.order - b.order);
  },

  async updateServices(items: ServiceItem[]): Promise<void> {
    if (isSupabaseEnabled && supabase) {
      await supabase.from('services').delete().neq('id', '0');
      await supabase.from('services').insert(items);
    } else {
      setLocalData('services', items);
    }
  },

  async getCampaigns(): Promise<CampaignItem[]> {
    if (isSupabaseEnabled && supabase) {
      const { data, error } = await supabase.from('campaigns').select('*').order('order', { ascending: true });
      if (!error && data) return data;
    }
    const items = getLocalData<CampaignItem[]>('campaigns', DEFAULT_CAMPAIGNS);
    return items.sort((a, b) => a.order - b.order);
  },

  async updateCampaigns(items: CampaignItem[]): Promise<void> {
    if (isSupabaseEnabled && supabase) {
      await supabase.from('campaigns').delete().neq('id', '0');
      await supabase.from('campaigns').insert(items);
    } else {
      setLocalData('campaigns', items);
    }
  },

  async getEducation(): Promise<EducationItem[]> {
    if (isSupabaseEnabled && supabase) {
      const { data, error } = await supabase.from('education').select('*').order('order', { ascending: true });
      if (!error && data) return data;
    }
    const items = getLocalData<EducationItem[]>('education', DEFAULT_EDUCATION);
    return items.sort((a, b) => a.order - b.order);
  },

  async updateEducation(items: EducationItem[]): Promise<void> {
    if (isSupabaseEnabled && supabase) {
      await supabase.from('education').delete().neq('id', '0');
      await supabase.from('education').insert(items);
    } else {
      setLocalData('education', items);
    }
  },

  async getTestimonials(): Promise<TestimonialItem[]> {
    if (isSupabaseEnabled && supabase) {
      const { data, error } = await supabase.from('testimonials').select('*').order('order', { ascending: true });
      if (!error && data) return data;
    }
    const items = getLocalData<TestimonialItem[]>('testimonials', DEFAULT_TESTIMONIALS);
    return items.sort((a, b) => a.order - b.order);
  },

  async updateTestimonials(items: TestimonialItem[]): Promise<void> {
    if (isSupabaseEnabled && supabase) {
      await supabase.from('testimonials').delete().neq('id', '0');
      await supabase.from('testimonials').insert(items);
    } else {
      setLocalData('testimonials', items);
    }
  },

  async getProfile(): Promise<ProfileData> {
    if (isSupabaseEnabled && supabase) {
      const { data, error } = await supabase.from('profile').select('*').single();
      if (!error && data) return data;
    }
    return getLocalData<ProfileData>('profile', DEFAULT_PROFILE);
  },

  async updateProfile(profile: ProfileData): Promise<void> {
    if (isSupabaseEnabled && supabase) {
      await supabase.from('profile').upsert({ id: 1, ...profile });
    } else {
      setLocalData('profile', profile);
    }
  },

  // Contact Messages Functions
  async getMessages(): Promise<ContactMessage[]> {
    if (isSupabaseEnabled && supabase) {
      const { data, error } = await supabase.from('messages').select('*').order('createdAt', { ascending: false });
      if (!error && data) return data;
    }
    return getLocalData<ContactMessage[]>('messages', []);
  },

  async addMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): Promise<void> {
    const newMessage: ContactMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'unread'
    };

    if (isSupabaseEnabled && supabase) {
      await supabase.from('messages').insert(newMessage);
    } else {
      const current = getLocalData<ContactMessage[]>('messages', []);
      setLocalData('messages', [newMessage, ...current]);
    }
  },

  async updateMessageStatus(id: string, status: 'unread' | 'read' | 'archived'): Promise<void> {
    if (isSupabaseEnabled && supabase) {
      await supabase.from('messages').update({ status }).eq('id', id);
    } else {
      const current = getLocalData<ContactMessage[]>('messages', []);
      const updated = current.map(msg => msg.id === id ? { ...msg, status } : msg);
      setLocalData('messages', updated);
    }
  },

  async deleteMessage(id: string): Promise<void> {
    if (isSupabaseEnabled && supabase) {
      await supabase.from('messages').delete().eq('id', id);
    } else {
      const current = getLocalData<ContactMessage[]>('messages', []);
      const updated = current.filter(msg => msg.id !== id);
      setLocalData('messages', updated);
    }
  }
};
