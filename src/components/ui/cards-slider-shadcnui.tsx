"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { animate, motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight, Zap, X, Phone, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface CardData {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  highlights: string[];
}

const cards: CardData[] = [
  {
    id: 1,
    title: "Enterprise Infrastructure",
    description: "Design, deploy, and manage robust IT infrastructure tailored to enterprise and government needs across India.",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    date: "Est. 2010",
    readTime: "Trusted Partner",
    highlights: [
      "Network design & deployment",
      "Server & storage solutions",
      "Data center management",
      "24/7 infrastructure monitoring",
    ],
  },
  {
    id: 2,
    title: "Cloud & Cybersecurity",
    description: "Blur the lines between on-prem and cloud with enterprise-grade security, compliance, and hybrid architectures.",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    date: "24/7 Support",
    readTime: "Always On",
    highlights: [
      "Hybrid & multi-cloud setup",
      "Firewall & endpoint security",
      "Compliance (ISO, GDPR)",
      "Threat monitoring & response",
    ],
  },
  {
    id: 3,
    title: "Trusted by Courts & Corporates",
    description: "From India's Honorable High Courts to Tata Powers — our decade-long track record speaks for itself.",
    category: "Government",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    date: "50+ Clients",
    readTime: "Pan India",
    highlights: [
      "High Court IT infrastructure",
      "Corporate ERP integrations",
      "Secure government networks",
      "Pan-India deployments",
    ],
  },
  {
    id: 4,
    title: "DevOps & Automation",
    description: "CI/CD pipelines, containerization, and infrastructure-as-code to accelerate your software delivery lifecycle.",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    date: "Agile Ready",
    readTime: "Fast Deploy",
    highlights: [
      "CI/CD pipeline setup",
      "Docker & Kubernetes",
      "Infrastructure as Code",
      "Automated testing & QA",
    ],
  },
  {
    id: 5,
    title: "End-to-End IT Solutions",
    description: "Consulting, cloud, DevOps, cybersecurity, and 24/7 managed support — all under one roof for your enterprise.",
    category: "Managed IT",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    date: "99.9% SLA",
    readTime: "End-to-End",
    highlights: [
      "IT consulting & strategy",
      "Managed services (MSP)",
      "Vendor management",
      "SLA-backed support",
    ],
  },
];

function Modal({ card, onClose }: { card: CardData; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/50"
        style={{ background: "linear-gradient(135deg, #0d1f4e 0%, #0a1628 100%)" }}
      >
        {/* Top image strip */}
        <div className="relative h-44 overflow-hidden">
          <Image src={card.image} alt={card.title} fill className="object-cover" sizes="512px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f4e] via-[#0d1f4e]/40 to-transparent" />
          <Badge className="absolute top-4 left-4 bg-[#3B82F6]/20 backdrop-blur-md border border-[#3B82F6]/30 text-[#93C5FD] text-xs font-medium px-3 py-1">
            {card.category}
          </Badge>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{card.title}</h2>
            <p className="text-white/60 text-sm leading-relaxed">{card.description}</p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-2">
            {card.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                <span className="text-white/70 text-xs">{h}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* Contact strip */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex-1 space-y-0.5">
              <p className="text-[11px] text-white/40 uppercase tracking-wider">Get in touch</p>
              <a href="tel:01204502546" className="flex items-center gap-1.5 text-[#60A5FA] text-sm font-semibold hover:text-[#93C5FD] transition-colors">
                <Phone className="w-3.5 h-3.5" /> 01204502546
              </a>
              <a href="mailto:sale@bknetwork.in" className="flex items-center gap-1.5 text-white/50 text-xs hover:text-white/80 transition-colors">
                <Mail className="w-3 h-3" /> sale@bknetwork.in
              </a>
            </div>
            <Link
              href="/schedule-consultation"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white text-sm font-bold hover:opacity-90 transition-opacity shrink-0"
            >
              Book Call <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CardsSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const isPaused = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [activeCard, setActiveCard] = useState<CardData | null>(null);
  const SPEED = 0.6;

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (width === 0) return;
    const tick = () => {
      if (!isPaused.current) {
        const next = x.get() - SPEED;
        x.set(next <= -width ? 0 : next);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [width, x]);

  const scrollTo = (direction: "left" | "right") => {
    const currentX = x.get();
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const scrollAmount = containerWidth * 0.8;
    let newX = direction === "left" ? currentX + scrollAmount : currentX - scrollAmount;
    newX = Math.max(Math.min(newX, 0), -width);
    animate(x, newX, { type: "spring", stiffness: 300, damping: 30, mass: 1 });
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-8 relative group/slider">
        <div className="absolute top-1/2 -translate-y-1/2 left-2 z-20 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
          <button onClick={() => scrollTo("left")} className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all active:scale-95">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-2 z-20 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
          <button onClick={() => scrollTo("right")} className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all active:scale-95">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        <motion.div
          ref={containerRef}
          className="cursor-grab active:cursor-grabbing overflow-hidden px-4 py-8 -mx-4 -my-8"
          whileTap={{ cursor: "grabbing" }}
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            dragElastic={0.1}
            style={{ x }}
            className="flex gap-6"
          >
            {cards.map((card) => (
              <motion.div
                key={card.id}
                className="min-w-[280px] sm:min-w-[320px] max-w-[280px] sm:max-w-[320px] h-[420px]"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="group relative h-full overflow-hidden rounded-3xl border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-[#3B82F6]/50 hover:shadow-2xl hover:shadow-[#3B82F6]/20">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="320px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#3B82F6]/20 backdrop-blur-md border border-[#3B82F6]/30 text-[#93C5FD] text-xs font-medium px-3 py-1">
                        {card.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCard(card)}
                        className="flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-black shadow-lg"
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col h-[calc(100%-12rem)] justify-between">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold leading-tight tracking-tight text-[#F8FAFC] transition-colors group-hover:text-[#60A5FA]">
                        {card.title}
                      </h3>
                      <p className="line-clamp-3 text-sm text-[#F8FAFC]/60 leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-auto border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#60A5FA] bg-[#3B82F6]/10 px-3 py-1.5 rounded-full border border-[#3B82F6]/20">
                        <Zap className="h-3 w-3" />
                        <span>{card.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-[#F8FAFC]/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        <span>{card.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeCard && <Modal card={activeCard} onClose={() => setActiveCard(null)} />}
      </AnimatePresence>
    </>
  );
}
