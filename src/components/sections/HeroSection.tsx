'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Server, Shield, Cloud, Zap, ArrowRight, MessageSquare, ChevronDown } from 'lucide-react';

const floatingFeatures = [
  { icon: Server, label: 'Infrastructure' },
  { icon: Shield, label: 'Security' },
  { icon: Cloud, label: 'Cloud' },
  { icon: Zap, label: 'DevOps' },
];

const stats = [
  { num: '150+', label: 'Clients Served' },
  { num: '500+', label: 'Projects Delivered' },
  { num: '99.9%', label: 'Uptime Guaranteed' },
  { num: '10+', label: 'Years Experience' },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden pt-20"
      style={{
        background: 'radial-gradient(ellipse at top, #0B1121 0%, #60A5FA 50%, #0B1121 100%)',
      }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#A78BFA10_1px,transparent_1px),linear-gradient(to_bottom,#A78BFA10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]" />

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C5BAFF]/10 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B82F6]/30 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Hero Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center"
      >
        {/* Floating Feature Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingFeatures.map((feature, index) => (
            <motion.div
              key={feature.label}
              className="absolute hidden md:block"
              style={{
                left: `${15 + index * 20}%`,
                top: `${25 + (index % 2) * 45}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 4, 0, -4, 0],
              }}
              transition={{
                duration: 5 + index * 0.7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#3B82F6]/60 to-[#9EC6F3]/10 backdrop-blur-sm border border-[#C5BAFF]/20 shadow-lg">
                <feature.icon className="w-6 h-6 text-[#60A5FA]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5BAFF]/10 border border-[#C5BAFF]/30 mb-8"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-[#C5BAFF]"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-semibold text-[#60A5FA] tracking-wide">
            Trusted IT Solutions Partner
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight leading-none text-[#F8FAFC] mb-4">
            Empowering{' '}
            <motion.span
              className="inline-block"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: 'linear-gradient(to right, #A78BFA, #F7D460, #A78BFA)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Businesses
            </motion.span>
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight leading-none text-[#F8FAFC]">
            with{' '}
            <motion.span
              className="inline-block"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
              style={{
                background: 'linear-gradient(to right, #F7D460, #F9E4A0, #A78BFA)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Scalable
            </motion.span>{' '}
            <span className="text-[#F8FAFC]/90">IT</span>
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-[#F8FAFC]/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          From live streaming to data centers, from DevOps to AI – we transform technology into growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-[#3B82F6] to-[#9EC6F3] text-[#F8FAFC] rounded-full font-bold text-lg overflow-hidden shadow-2xl shadow-[#C5BAFF]/30 border border-[#C5BAFF]/30"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Solutions
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.button>
          </Link>

          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-white/20 text-[#F8FAFC] rounded-full font-bold text-lg hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm"
            >
              <span className="flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Talk to an Expert
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-display font-black text-[#F8FAFC] mb-1">
                {stat.num}
              </div>
              <div className="text-xs text-[#F8FAFC]/40 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-[#C5BAFF] rounded-full"
              />
            </div>
            <ChevronDown className="w-4 h-4 text-[#F8FAFC]/30" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative SVG scroll path */}
      <div className="absolute top-0 right-0 md:right-[5%] w-[200px] md:w-[300px] h-full overflow-visible pointer-events-none z-5 opacity-10">
        <svg viewBox="0 0 400 2000" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M200 0 Q150 200 250 400 T200 800 Q100 1000 300 1200 T200 1600 L200 2000"
            stroke="url(#bkGradient)"
            strokeWidth="2"
            fill="none"
          />
          <defs>
            <linearGradient id="bkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </svg>
      </div>

    </section>
  );
}

export default HeroSection;
