"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Rocket, Sparkles, Globe } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function CommunitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const values = [
    {
      icon: Heart,
      title: "Client-First Always",
      description: "Every decision we make puts our clients first — from SMEs to India's highest courts, we deliver with care and precision.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Rocket,
      title: "Innovation at Core",
      description: "We continuously adopt cloud, AI, and DevOps practices to keep our clients ahead of the technology curve.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Sparkles,
      title: "Certified Excellence",
      description: "Strategic partnerships with IBM, Dell, Cisco, Red Hat, and Lenovo ensure every delivery meets the highest standards.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Globe,
      title: "Pan-India Presence",
      description: "Serving enterprises and government institutions across India with reliable, scalable IT infrastructure solutions.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      values.forEach((_, index) => {
        gsap.fromTo(`.value-card-${index}`, { opacity: 0, y: 100, scale: 0.8 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: `.value-card-${index}`, start: "top 80%", end: "top 40%", toggleActions: "play none none reverse" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span className="text-sm font-semibold text-[#F8FAFC] uppercase tracking-wider">Chapter Two</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mt-4 mb-8 tracking-tight">
            Partnering with{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#9EC6F3] bg-clip-text text-transparent">BKNetwork</span>
          </h2>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto">
            More than a vendor — we're a long-term technology partner that grows with your business.
          </p>
        </motion.div>

        <div className="values-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {values.map((value, index) => (
            <div key={value.title} className={`value-card-${index} group`}>
              <div className="relative p-8 h-full rounded-3xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-md border border-foreground/10 hover:border-foreground/20 transition-all duration-500 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`} />
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-[#F8FAFC]" />
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-[#F8FAFC] transition-colors">{value.title}</h3>
                <p className="text-foreground/70 text-lg leading-relaxed">{value.description}</p>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#A78BFA]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <p className="text-2xl md:text-3xl text-foreground/60 font-light">Ready to transform your technology?</p>
        </div>
      </div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C5BAFF]/5 rounded-full blur-3xl -z-10 animate-pulse" />
    </section>
  );
}
