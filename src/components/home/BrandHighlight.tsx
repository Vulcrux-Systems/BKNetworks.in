"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function BrandHighlight() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".highlight-title", { opacity: 0, scale: 0.5, rotateX: -30 }, {
        opacity: 1, scale: 1, rotateX: 0, duration: 1.5,
        scrollTrigger: { trigger: ".highlight-title", start: "top 70%", end: "top 30%", scrub: 1 },
      });
      gsap.fromTo(".highlight-subtitle", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: { trigger: ".highlight-subtitle", start: "top 80%", end: "top 50%", scrub: 1 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_50%,#000,transparent)]" />

      {/* Particles */}

      <motion.div style={{ scale, opacity }} className="relative z-10 text-center">
        {/* Rotating rings behind text */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/20 rounded-full -z-10" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#60A5FA]/25 rounded-full -z-10" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/10 rounded-full -z-10" />

        <div className="perspective-1000">
          <h2
            className="highlight-title text-8xl md:text-[12rem] lg:text-[16rem] font-black mb-8 leading-none tracking-tighter text-white"
            style={{
              textShadow: "0 0 60px rgba(96, 165, 250, 0.6), 0 0 120px rgba(96, 165, 250, 0.3), 0 4px 24px rgba(0,0,0,0.4)",
              filter: "drop-shadow(0 0 30px rgba(96,165,250,0.4))",
            }}
          >
            BKNetwork
          </h2>
        </div>
        <p className="highlight-subtitle text-xl md:text-3xl lg:text-4xl text-[#F8FAFC]/70 max-w-3xl mx-auto font-light tracking-wide px-4">
          The Signature of Enterprise IT,<br />Trusted by Courts & Corporates
        </p>
      </motion.div>

      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#3B82F6]/25 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10" />

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  );
}
