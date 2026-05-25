"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardsSlider } from "@/components/ui/cards-slider-shadcnui";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-title", { opacity: 0, y: 100 }, {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: { trigger: ".about-title", start: "top 80%", end: "top 50%", scrub: 1 },
      });
      gsap.fromTo(".about-text", { opacity: 0, y: 80 }, {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: { trigger: ".about-text", start: "top 80%", end: "top 50%", scrub: 1 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8 }} className="mb-6">
            <span className="text-sm font-semibold text-[#F8FAFC] uppercase tracking-wider">Chapter One</span>
          </motion.div>
          <h2 className="about-title text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
            What is{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#9EC6F3] bg-clip-text text-transparent">BKNetwork</span>
            ?
          </h2>
          <p className="about-text text-xl md:text-2xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
            BKNetwork Services is more than an IT company — it's a trusted technology partner. With over a decade of experience, we deliver end-to-end IT solutions for enterprises and government organizations across India, transforming complex technology into measurable business growth.
          </p>
        </div>

        <CardsSlider />
      </div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#C5BAFF]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
