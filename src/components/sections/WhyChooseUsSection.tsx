'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Rocket, Sparkles, Globe } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description:
      'Enterprise-grade cybersecurity woven into every solution we deliver, protecting your assets around the clock.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Rocket,
    title: 'High Performance',
    description:
      '99.9% uptime guaranteed with optimized infrastructure that scales effortlessly as your business grows.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Sparkles,
    title: 'Innovation Driven',
    description:
      'Leveraging cutting-edge AI, DevOps, and cloud technologies to keep you ahead of the competition.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Globe,
    title: 'Nationwide Reach',
    description:
      'Serving enterprise and government clients across India with 24/7 support and on-site expertise.',
    color: 'from-green-500 to-emerald-500',
  },
];

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      values.forEach((_, index) => {
        gsap.fromTo(
          `.why-card-${index}`,
          { opacity: 0, y: 80, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: `.why-card-${index}`,
              start: 'top 82%',
              end: 'top 45%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="chapter-label block mb-4">Chapter Two</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight mb-8">
            Why Choose{' '}
            <span className="theme-grad-text">BKNETWORK</span>
          </h2>
          <p className="text-xl md:text-2xl text-foreground/60 max-w-3xl mx-auto font-light">
            More than an IT vendor — a strategic partner committed to your long-term success.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {values.map((value, index) => (
            <div key={value.title} className={`why-card-${index} group`}>
              <div className="relative p-8 h-full rounded-3xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md border border-foreground/10 hover:border-foreground/20 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl">
                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Icon */}
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <value.icon className="w-8 h-8 text-[#F8FAFC]" />
                </div>

                {/* Content */}
                <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-[#F8FAFC] transition-colors">
                  {value.title}
                </h3>
                <p className="text-foreground/60 text-lg leading-relaxed">
                  {value.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#A78BFA]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div className="text-center mt-20">
          <p className="text-2xl md:text-3xl text-foreground/40 font-display font-light">
            Ready to transform your business?
          </p>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C5BAFF]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}

export default WhyChooseUsSection;
