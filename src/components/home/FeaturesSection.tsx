"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Cloud, Zap, Monitor, Server, Network } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LucideIcon } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface Card {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  gradient: string;
  accentColor: string;
}

const CARDS: Card[] = [
  {
    id: "infrastructure",
    title: "IT Infrastructure",
    description: "End-to-end design, deployment, and management of enterprise-grade IT infrastructure built for scale and reliability.",
    features: ["Server & Storage Solutions", "Network Architecture", "Data Center Design", "Hardware Procurement"],
    icon: Server,
    gradient: "from-blue-500 to-cyan-500",
    accentColor: "#22D3EE",
  },
  {
    id: "cloud",
    title: "Cloud Solutions",
    description: "Cloud migration, architecture, and optimization — from private data centers to hybrid multi-cloud environments.",
    features: ["Cloud Migration", "Hybrid Cloud Setup", "Cost Optimization", "Cloud Security"],
    icon: Cloud,
    gradient: "from-purple-500 to-pink-500",
    accentColor: "#C084FC",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Comprehensive security assessments, compliance frameworks, and 24/7 threat monitoring to protect critical assets.",
    features: ["Security Audits", "Compliance Management", "Threat Monitoring", "Incident Response"],
    icon: Shield,
    gradient: "from-green-500 to-emerald-500",
    accentColor: "#34D399",
  },
  {
    id: "devops",
    title: "DevOps & Automation",
    description: "CI/CD pipelines, containerization, and infrastructure-as-code to accelerate your software delivery lifecycle.",
    features: ["CI/CD Pipelines", "Containerization", "Infrastructure as Code", "Process Automation"],
    icon: Zap,
    gradient: "from-orange-500 to-red-500",
    accentColor: "#FB923C",
  },
  {
    id: "managed",
    title: "Managed IT Services",
    description: "Round-the-clock managed services with proactive monitoring, rapid incident response, and 99.9% SLA uptime.",
    features: ["24/7 Monitoring", "Rapid Incident Response", "99.9% SLA Uptime", "Proactive Maintenance"],
    icon: Monitor,
    gradient: "from-indigo-500 to-purple-500",
    accentColor: "#818CF8",
  },
  {
    id: "network",
    title: "Network Solutions",
    description: "Enterprise networking with Cisco, HPE, and Aruba — LAN, WAN, SD-WAN, and wireless infrastructure.",
    features: ["LAN/WAN Design", "SD-WAN Implementation", "Wireless Infrastructure", "Network Security"],
    icon: Network,
    gradient: "from-teal-500 to-cyan-500",
    accentColor: "#2DD4BF",
  },
];

const COLLAPSED_W = 80;   // px ≈ 5rem
const EXPANDED_W  = 420;  // px ≈ 26rem
const GAP         = 12;   // px = gap-3

export function FeaturesSection() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef     = useRef<HTMLDivElement>(null);
  const isInView     = useInView(sectionRef, { once: false, amount: 0.05 });

  // Per-card refs
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const collapsedRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expandedRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const strip     = stripRef.current;
    const container = containerRef.current;
    if (!strip || !container) return;

    // ── Initial state: card 0 expanded, rest collapsed ─────────────────────
    CARDS.forEach((_, i) => {
      const card      = cardRefs.current[i];
      const collapsed = collapsedRefs.current[i];
      const expanded  = expandedRefs.current[i];
      if (!card || !collapsed || !expanded) return;

      if (i === 0) {
        gsap.set(card,      { width: EXPANDED_W });
        gsap.set(collapsed, { opacity: 0, pointerEvents: "none" });
        gsap.set(expanded,  { opacity: 1 });
      } else {
        gsap.set(card,      { width: COLLAPSED_W });
        gsap.set(collapsed, { opacity: 1 });
        gsap.set(expanded,  { opacity: 0, pointerEvents: "none" });
      }
    });

    // Center card 0 initially: strip x = viewport_center - EXPANDED_W/2
    const centerCard = (i: number) =>
      window.innerWidth / 2 - i * (COLLAPSED_W + GAP) - EXPANDED_W / 2;

    gsap.set(strip, { x: centerCard(0) });

    // ── Build scroll-driven timeline ────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger:           container,
        pin:               true,
        scrub:             1.2,
        end:               `+=${CARDS.length * 600}`,
        invalidateOnRefresh: true,
        anticipatePin:     1,
      },
    });

    CARDS.forEach((_, i) => {
      if (i === 0) return; // card 0 starts open

      const label = `step${i}`;
      const prev  = i - 1;

      // Collapse previous card
      tl.to(cardRefs.current[prev]!,      { width: COLLAPSED_W, duration: 1, ease: "power2.inOut" }, label)
        .to(expandedRefs.current[prev]!,  { opacity: 0, duration: 0.25 }, label)
        .to(collapsedRefs.current[prev]!, { opacity: 1, duration: 0.25, pointerEvents: "auto" }, `${label}+=0.25`)

      // Expand current card
        .to(cardRefs.current[i]!,         { width: EXPANDED_W, duration: 1, ease: "power2.inOut" }, label)
        .to(collapsedRefs.current[i]!,    { opacity: 0, duration: 0.25 }, label)
        .to(expandedRefs.current[i]!,     { opacity: 1, duration: 0.25, pointerEvents: "auto" }, `${label}+=0.25`)

      // Pan strip so card i is centered in viewport
        .to(strip, { x: centerCard(i), duration: 1, ease: "power2.inOut" }, label);
    });

    return () => tl.scrollTrigger?.kill();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm font-semibold text-[#F8FAFC] uppercase tracking-wider">Chapter Three</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mt-4 mb-8 tracking-tight">
            What We{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#9EC6F3] bg-clip-text text-transparent">Offer</span>
          </h2>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto">
            Everything your enterprise needs — from infrastructure to intelligence.
          </p>
        </motion.div>
      </div>

      {/* Pinned horizontal section */}
      <div ref={containerRef}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div ref={stripRef} className="flex items-stretch gap-3" style={{ willChange: "transform" }}>
            {CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  ref={el => { cardRefs.current[idx] = el; }}
                  className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex-shrink-0"
                  style={{ height: 420 }}
                >
                  {/* Gradient tint */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10 pointer-events-none rounded-3xl`} />

                  {/* Top color bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`} />

                  {/* Collapsed — vertical title */}
                  <div
                    ref={el => { collapsedRefs.current[idx] = el; }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="flex flex-col items-center gap-4 px-2">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span
                        className="text-[#F8FAFC]/80 text-xs font-bold uppercase tracking-widest"
                        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                      >
                        {card.title}
                      </span>
                    </div>
                  </div>

                  {/* Expanded — full content */}
                  <div
                    ref={el => { expandedRefs.current[idx] = el; }}
                    className="absolute inset-0 p-7 flex flex-col"
                    style={{ width: EXPANDED_W }}
                  >
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.gradient} mb-5 shadow-lg w-fit`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <div className="absolute top-5 right-6 text-7xl font-black text-white/5 select-none pointer-events-none leading-none">
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    <h3 className="text-2xl font-black text-[#F8FAFC] mb-3 tracking-tight leading-tight">
                      {card.title}
                    </h3>

                    <p className="text-[#F8FAFC]/60 text-sm leading-relaxed mb-5 flex-shrink-0">
                      {card.description}
                    </p>

                    <ul className="space-y-2 mt-auto">
                      {card.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-[#F8FAFC]/70">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: card.accentColor }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#C5BAFF]/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
