"use client";

import { motion } from "framer-motion";
import { Circle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatItem  { value: string; label: string }
interface CrumbItem { label: string; href: string }

// ─── Floating shape ───────────────────────────────────────────────────────────

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(96,165,250,0.12)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

function HeroGeometric({
  badge,
  title1 = "Elevate Your",
  title2 = "Digital Vision",
  description,
  stats,
  breadcrumb,
  primaryCTA,
  secondaryCTA,
}: {
  badge?:    string;
  title1?:   string;
  title2?:   string;
  description?: string;
  stats?:       StatItem[];
  breadcrumb?:  CrumbItem[];
  primaryCTA?:  { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}) {
  // Simple staggered delays — no Variants type issues
  const d = (i: number) => 0.4 + i * 0.2;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">

      {/* Subtle radial glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/[0.06] via-transparent to-[#C5BAFF]/[0.06] blur-3xl pointer-events-none" />

      {/* Floating shapes — blue/lavender palette */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape delay={0.3} width={600} height={140} rotate={12}
          gradient="from-[#3B82F6]/[0.22]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />

        <ElegantShape delay={0.5} width={500} height={120} rotate={-15}
          gradient="from-[#C5BAFF]/[0.18]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />

        <ElegantShape delay={0.4} width={300} height={80} rotate={-8}
          gradient="from-[#60A5FA]/[0.20]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />

        <ElegantShape delay={0.6} width={200} height={60} rotate={20}
          gradient="from-[#BAE6FD]/[0.22]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" />

        <ElegantShape delay={0.7} width={150} height={40} rotate={-25}
          gradient="from-[#818CF8]/[0.18]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">

          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: d(0) }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8 md:mb-10 backdrop-blur-sm"
            >
              <Circle className="h-2 w-2 fill-[#60A5FA]" />
              <span className="text-sm font-semibold text-[#F8FAFC]/80 tracking-wider uppercase">
                {badge}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: d(1), ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black mb-6 md:mb-8 tracking-tighter leading-[1.1]">
              {/* First line(s) — white, split on \n */}
              {(title1 ?? "").split("\n").map((line, i) => (
                <span key={i} className="block bg-clip-text text-transparent bg-gradient-to-b from-[#F8FAFC] to-[#F8FAFC]/80">
                  {line}
                </span>
              ))}
              {/* Last line — blue/lavender gradient */}
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] via-[#C5BAFF] to-[#BAE6FD] animate-gradient mt-2">
                {title2}
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: d(2), ease: [0.25, 0.4, 0.25, 1] }}
            className="text-base sm:text-lg md:text-xl text-[#F8FAFC]/60 mb-10 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4"
          >
            {description ?? "Crafting exceptional digital experiences through innovative design and cutting-edge technology."}
          </motion.p>

          {/* CTAs */}
          {(primaryCTA || secondaryCTA) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: d(3), ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              {primaryCTA && (
                <Link href={primaryCTA.href}>
                  <button className="group px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#C5BAFF] text-[#F8FAFC] font-bold rounded-full shadow-xl shadow-[#9EC6F3]/30 border border-white/60 hover:shadow-[#9EC6F3]/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto sm:mx-0">
                    {primaryCTA.label}
                  </button>
                </Link>
              )}
              {secondaryCTA && (
                <Link href={secondaryCTA.href}>
                  <button className="px-8 py-4 border border-white/50 bg-white/10 backdrop-blur-sm text-[#F8FAFC] font-bold rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2 mx-auto sm:mx-0">
                    {secondaryCTA.label}
                  </button>
                </Link>
              )}
            </motion.div>
          )}

          {/* Stats */}
          {stats && stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: d(4), ease: "easeOut" }}
              className="flex flex-wrap justify-center gap-8 md:gap-16"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-1">{stat.value}</div>
                  <div className="text-sm text-[#F8FAFC]/60 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          )}

        </div>
      </div>

      {/* Bottom blend into page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D47A1]/30 to-transparent pointer-events-none" />
    </div>
  );
}

export { HeroGeometric };
