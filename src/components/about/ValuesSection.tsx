"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import InteractiveSelector from "@/components/ui/interactive-selector";

export function ValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold text-[#60A5FA] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-[#C5BAFF]/20 bg-[#C5BAFF]/5 mb-4">
            Chapter Two
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
            What We{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#C5BAFF] to-[#9EC6F3] bg-clip-text text-transparent">
              Stand For
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
            The core values that guide every project, partnership, and decision we make at BKNetwork.
          </p>
        </motion.div>

        {/* Interactive Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <InteractiveSelector />
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-white/35 text-sm mt-6"
        >
          Click on any value to explore
        </motion.p>
      </div>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C5BAFF]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
