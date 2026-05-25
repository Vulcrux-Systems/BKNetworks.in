"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function HomeCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-title", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: ".cta-title", start: "top 80%", end: "top 40%", scrub: 1 } });
      gsap.fromTo(".cta-subtitle", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: ".cta-subtitle", start: "top 80%", end: "top 50%", scrub: 1 } });
      gsap.fromTo(".cta-buttons", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: ".cta-buttons", start: "top 85%", end: "top 60%", scrub: 1 } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_90%_80%_at_50%_50%,#000,transparent)]" />

      <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C5BAFF]/20 rounded-full blur-3xl" animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} />

      <motion.div style={{ opacity, scale }} className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8">
          <Sparkles className="w-4 h-4 text-[#F8FAFC]" />
          <span className="text-sm font-medium text-[#F8FAFC]">Start Your Digital Transformation</span>
        </motion.div>

        <h2 className="cta-title text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tighter">
          Ready to Transform{" "}
          <span className="bg-gradient-to-r from-[#3B82F6] via-[#C5BAFF] to-[#9EC6F3] bg-clip-text text-transparent" style={{ backgroundSize: "200% 200%", animation: "gradient 5s ease infinite" }}>
            Your Business
          </span>
          ?
        </h2>

        <p className="cta-subtitle text-xl md:text-3xl text-foreground/70 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Join 150+ enterprises and government organizations that trust BKNetwork to power their critical IT infrastructure.
        </p>

        <div className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/contact">
            <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="group relative px-10 py-5 bg-gradient-to-r from-[#3B82F6] to-[#8B6343] text-[#F8FAFC] rounded-full font-bold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-[#3B82F6]/50">
              <span className="relative z-10 flex items-center gap-2">
                Get in Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.button>
          </Link>
          <Link href="/services">
            <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="px-10 py-5 border-2 border-[#3B82F6] text-[#F8FAFC] rounded-full font-bold text-lg hover:bg-[#3B82F6] hover:text-[#F8FAFC] transition-all">
              Explore Services
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 -left-20 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-3xl -z-10" />
      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#C5BAFF]/20 rounded-full blur-3xl -z-10" />

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
