'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

// Split text into spans for per-character animation
function SplitChars({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Split description into words with stagger
function SplitWords({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: delay + i * 0.04, ease: 'easeOut' }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

interface StatItem {
  value: string;
  label: string;
}

interface PageHeroProps {
  badge?: string;
  title: string;
  highlightedWord?: string;
  description?: string;
  breadcrumb?: { label: string; href: string }[];
  stats?: StatItem[];
  floatingIconLeft?: ReactNode;
  floatingIconRight?: ReactNode;
}

export function PageHero({
  badge,
  title,
  highlightedWord,
  description,
  breadcrumb,
  stats,
  floatingIconLeft,
  floatingIconRight,
}: PageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ph-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.ph-sub',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const titleParts = highlightedWord ? title.split(highlightedWord) : [title];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_90%_80%_at_50%_50%,#000,transparent)]" />
      {/* Particles */}

      {/* Floating icons */}
      {floatingIconLeft && (
        <motion.div
          className="absolute top-24 left-10 hidden md:block"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {floatingIconLeft}
        </motion.div>
      )}
      {floatingIconRight && (
        <motion.div
          className="absolute bottom-24 right-10 hidden md:block"
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {floatingIconRight}
        </motion.div>
      )}

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
      >
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-sm text-[#F8FAFC]/50 mb-6"
          >
            <Link href="/" className="hover:text-[#F8FAFC] transition-colors">Home</Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3" />
                <Link href={crumb.href} className="hover:text-[#F8FAFC] transition-colors">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </motion.nav>
        )}

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-[#C5BAFF]"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-semibold text-[#F8FAFC] uppercase tracking-wider">
              {badge}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight leading-tight" style={{ perspective: '800px' }}>
          {highlightedWord ? (
            <>
              <span className="block text-[#F8FAFC]">
                <SplitChars text={titleParts[0].trim()} delay={0.3} />
              </span>
              <span
                className="block bg-gradient-to-r from-[#3B82F6] via-[#C5BAFF] to-[#9EC6F3] bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 200%', animation: 'gradient 5s ease infinite' }}
              >
                <SplitChars text={highlightedWord} delay={0.3 + titleParts[0].trim().length * 0.03 + 0.05} />
              </span>
            </>
          ) : (
            <span className="block text-[#F8FAFC]">
              <SplitChars text={title} delay={0.3} />
            </span>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p className="text-xl md:text-2xl text-[#F8FAFC]/70 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
            <SplitWords text={description} delay={0.6} />
          </p>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ opacity: 0, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.5, delay: 1.1 + i * 0.12 }}
                  className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-[#F8FAFC]/60 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>


      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}

export default PageHero;
