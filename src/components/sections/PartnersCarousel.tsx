'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { TECHNOLOGY_PARTNERS } from '@/lib/constants';
import { Marquee } from '@/components/ui/marquee';

export default function PartnersCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const goldOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0, 0.08, 0.18, 0.08, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Subtle glow on scroll */}
      <motion.div
        style={{ opacity: goldOpacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(255,255,255,0.08),transparent)] pointer-events-none"
      />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_50%,#000,transparent)]" />

      {/* Particles */}

      {/* Side fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1a56c4]/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1a56c4]/80 to-transparent z-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block text-xs font-bold text-[#60A5FA] uppercase tracking-[0.3em] mb-6 px-4 py-2 rounded-full border border-[#C5BAFF]/20 bg-[#C5BAFF]/5"
          >
            Trusted Partners
          </motion.span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#F8FAFC] mb-6 leading-none">
            Trusted By{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #60A5FA 100%)',
                backgroundSize: '200% 200%',
                animation: 'shimmer 4s ease infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Industry Leaders
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#F8FAFC]/60 max-w-2xl mx-auto font-light leading-relaxed">
            Strategic partnerships with the world's most trusted technology brands.
          </p>
        </motion.div>

        {/* Marquee Row 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4"
        >
          <Marquee pauseOnHover className="[--duration:40s]">
            {TECHNOLOGY_PARTNERS.map((partner, i) => (
              <div key={`${partner.name}-${i}`} className="mx-3 flex items-center justify-center">
                <div className="group relative flex items-center justify-center w-[220px] h-[100px] px-6 py-4 rounded-2xl transition-all duration-500 overflow-hidden">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={160}
                    height={64}
                    className="object-contain max-h-[64px] w-auto opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </motion.div>

        {/* Marquee Row 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <Marquee reverse pauseOnHover className="[--duration:50s]">
            {[...TECHNOLOGY_PARTNERS].reverse().map((partner, i) => (
              <div key={`${partner.name}-rev-${i}`} className="mx-3 flex items-center justify-center">
                <div className="group relative flex items-center justify-center w-[220px] h-[100px] px-6 py-4 rounded-2xl transition-all duration-500 overflow-hidden">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={160}
                    height={64}
                    className="object-contain max-h-[64px] w-auto opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </motion.div>

      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
