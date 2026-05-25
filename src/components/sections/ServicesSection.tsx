'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightbulb, Shield, Cloud, Cpu, Headphones, Video } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { ExpandCards } from '@/components/ui/expand-cards';
import type { ServiceCard } from '@/components/ui/expand-cards';

const cardMeta: Record<string, { icon: typeof Lightbulb; gradient: string; accentColor: string }> = {
  Lightbulb: { icon: Lightbulb, gradient: 'from-blue-500 to-cyan-500',    accentColor: '#22D3EE' },
  Shield:    { icon: Shield,    gradient: 'from-purple-500 to-pink-500',   accentColor: '#C084FC' },
  Cloud:     { icon: Cloud,     gradient: 'from-green-500 to-emerald-500', accentColor: '#34D399' },
  Cpu:       { icon: Cpu,       gradient: 'from-orange-500 to-red-500',    accentColor: '#FB923C' },
  Headphones:{ icon: Headphones,gradient: 'from-indigo-500 to-purple-500', accentColor: '#818CF8' },
  Video:     { icon: Video,     gradient: 'from-teal-500 to-cyan-500',     accentColor: '#2DD4BF' },
};

const cards: ServiceCard[] = SERVICES.map((s) => {
  const meta = cardMeta[s.icon] ?? cardMeta['Lightbulb'];
  return {
    id:          s.id,
    title:       s.title,
    description: s.description,
    features:    s.features,
    icon:        meta.icon,
    gradient:    meta.gradient,
    accentColor: meta.accentColor,
  };
});

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section ref={sectionRef} id="services" className="relative py-24 overflow-hidden">

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="chapter-label block mb-4">What We Offer</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight mb-6">
            Our{' '}
            <span className="theme-grad-text">Services</span>
          </h2>
          <p className="text-xl md:text-2xl text-foreground/60 max-w-3xl mx-auto font-light">
            Enterprise-grade IT solutions designed to accelerate your digital transformation.
          </p>
        </motion.div>
      </div>

      {/* Expand-on-hover cards */}
      <ExpandCards cards={cards} />

      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C5BAFF]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
