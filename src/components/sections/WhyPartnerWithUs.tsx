"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Handshake, TrendingUp, ShieldCheck, Users, BadgeCheck, Lightbulb,
} from "lucide-react";

const cards = [
  {
    icon: Handshake,
    title: "Strategic Partnership",
    description: "Long-term relationships built on trust, transparency, and mutual success. We align our goals with yours to create shared value that lasts.",
    color: "#3B82F6",
    gradient: "from-blue-600 to-cyan-500",
    bg: "from-blue-950/60 to-cyan-950/40",
    num: "01",
  },
  {
    icon: TrendingUp,
    title: "Business Growth",
    description: "Technology solutions designed to scale with your business and drive growth. Every solution we build is engineered to grow as fast as you do.",
    color: "#10B981",
    gradient: "from-emerald-600 to-teal-500",
    bg: "from-emerald-950/60 to-teal-950/40",
    num: "02",
  },
  {
    icon: ShieldCheck,
    title: "Risk Mitigation",
    description: "Comprehensive security and compliance measures to protect your business. We identify threats before they become problems.",
    color: "#8B5CF6",
    gradient: "from-violet-600 to-purple-500",
    bg: "from-violet-950/60 to-purple-950/40",
    num: "03",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Access to certified professionals with deep industry expertise. Our team brings decades of combined experience to every engagement.",
    color: "#F97316",
    gradient: "from-orange-500 to-amber-400",
    bg: "from-orange-950/60 to-amber-950/40",
    num: "04",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assurance",
    description: "Rigorous quality standards and best practices in every project. We don't ship until it's right — and we stand behind everything we deliver.",
    color: "#EC4899",
    gradient: "from-pink-600 to-rose-500",
    bg: "from-pink-950/60 to-rose-950/40",
    num: "05",
  },
  {
    icon: Lightbulb,
    title: "Innovation Focus",
    description: "Cutting-edge technologies and innovative solutions for competitive advantage. We constantly evolve so your business stays ahead of the curve.",
    color: "#0EA5E9",
    gradient: "from-sky-500 to-indigo-500",
    bg: "from-sky-950/60 to-indigo-950/40",
    num: "06",
  },
];

export default function WhyPartnerWithUs() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-cycle every 3.5s, pause on hover
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((p) => (p + 1) % cards.length), 3500);
    return () => clearInterval(t);
  }, [paused]);

  const card = cards[active];
  const Icon = card.icon;

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-36 relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:30px_30px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-white/10 border border-white/20 backdrop-blur-sm">
            Why Partner With Us
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: numbered list ── */}
          <div className="space-y-1">
            {cards.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.title}
                  onClick={() => setActive(i)}
                  className="w-full text-left group"
                >
                  <motion.div
                    className={`relative flex items-center gap-5 px-5 py-4 rounded-2xl transition-all duration-300
                      ${isActive ? "bg-white/8" : "hover:bg-white/4"}`}
                  >
                    {/* Active left bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeBar"
                        className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b ${c.gradient}`}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}

                    {/* Number */}
                    <span
                      className={`text-xs font-black font-mono transition-colors duration-300 w-6 shrink-0
                        ${isActive ? "text-white/90" : "text-white/25 group-hover:text-white/40"}`}
                    >
                      {c.num}
                    </span>

                    {/* Title */}
                    <span
                      className={`text-base font-bold transition-colors duration-300 flex-1
                        ${isActive ? "text-white" : "text-white/45 group-hover:text-white/70"}`}
                    >
                      {c.title}
                    </span>

                    {/* Progress pill — only on active */}
                    {isActive && (
                      <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden shrink-0">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${c.gradient} rounded-full`}
                          initial={{ scaleX: 0 }}
                          animate={paused ? {} : { scaleX: 1 }}
                          transition={{ duration: 3.5, ease: "linear" }}
                          style={{ transformOrigin: "left" }}
                          key={`${active}-${paused}`}
                        />
                      </div>
                    )}
                  </motion.div>
                </button>
              );
            })}
          </div>

          {/* ── RIGHT: showcase panel ── */}
          <div className="relative">

            {/* Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl border border-white/12 bg-white/6 backdrop-blur-sm overflow-hidden p-8 lg:p-10"
              >
                {/* Big decorative number */}
                <span
                  className="absolute -bottom-6 -right-4 text-[9rem] font-black leading-none select-none pointer-events-none"
                  style={{ color: `${card.color}12` }}
                >
                  {card.num}
                </span>

                {/* Top gradient strip */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.gradient}`} />

                {/* Icon */}
                <div className="mb-8">
                  <motion.div
                    initial={{ scale: 0.5, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.05 }}
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-2xl relative`}
                  >
                    {/* Ping */}
                    <motion.span
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient}`}
                      animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                    />
                    <Icon className="relative w-8 h-8 text-white" strokeWidth={1.5} />
                  </motion.div>
                </div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="text-2xl lg:text-3xl font-display font-bold text-white mb-4 leading-tight"
                >
                  {card.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 }}
                  className="text-white/70 text-base leading-relaxed mb-8"
                >
                  {card.description}
                </motion.p>

                {/* Bottom row: dots */}
                <div className="flex items-center gap-2">
                  {cards.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className="transition-all duration-300"
                    >
                      <div
                        className={`rounded-full transition-all duration-300 ${
                          i === active ? "w-6 h-2" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                        }`}
                        style={i === active ? {
                          background: `linear-gradient(to right, ${card.color}, ${card.color}99)`
                        } : {}}
                      />
                    </button>
                  ))}
                  <span className="ml-auto text-xs font-mono text-white/30">
                    {card.num} / {String(cards.length).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
