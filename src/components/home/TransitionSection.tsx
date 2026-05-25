"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function TransitionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[120vh] flex items-start justify-center overflow-hidden">
      <motion.div style={{ opacity }} className="sticky top-0 h-screen w-full flex items-center justify-center">
        <div className="relative flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-4 text-center">
          <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
            <span className="block text-foreground/40">The Journey</span>
            <span className="block bg-gradient-to-r from-[#3B82F6] via-[#C5BAFF] to-[#9EC6F3] bg-clip-text text-transparent" style={{ backgroundSize: "200% 200%", animation: "gradient 5s ease infinite" }}>
              Continues
            </span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="text-xl md:text-2xl text-foreground max-w-2xl font-light">
            Every project we deliver shapes the future of enterprise technology in India.
          </motion.p>
        </div>
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
