"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Search, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We start with a comprehensive consultation to understand your unique business needs and challenges.",
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/30",
  },
  {
    number: "02",
    title: "Assessment",
    description:
      "Our experts conduct a thorough assessment of your current IT infrastructure and identify improvement opportunities.",
    icon: Search,
    color: "from-violet-500 to-purple-500",
    glow: "shadow-violet-500/30",
  },
  {
    number: "03",
    title: "Implementation",
    description:
      "We execute the solution with minimal disruption to your business operations, following industry best practices.",
    icon: Rocket,
    color: "from-orange-500 to-rose-500",
    glow: "shadow-orange-500/30",
  },
  {
    number: "04",
    title: "Optimization",
    description:
      "Continuous monitoring and optimization ensure your systems perform at peak efficiency and deliver maximum value.",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    glow: "shadow-green-500/30",
  },
];

export default function ServiceProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-36 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-white/10 border border-white/20 backdrop-blur-sm mb-5">
            Our Service Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-5 leading-tight">
            How We{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Deliver Results
            </span>
          </h2>
          <p className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We follow a proven methodology to ensure successful project delivery
            and long-term client satisfaction.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-violet-500 via-orange-500 to-green-500 opacity-30"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
            {/* Animated traveling dot */}
            {inView && (
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-lg shadow-white/50"
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Icon circle */}
                  <div className="relative mb-8">
                    {/* Pulse ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-20`}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: "easeInOut",
                      }}
                    />
                    <div
                      className={`relative w-[104px] h-[104px] rounded-full bg-gradient-to-br ${step.color} shadow-2xl ${step.glow} flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500`}
                    >
                      <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                    </div>

                    {/* Step number badge */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#0F172A] border-2 border-white/20 flex items-center justify-center">
                      <span className="text-[10px] font-black text-white/90">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Step label */}
                  <div className="mb-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}
                    >
                      Step {i + 1}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white mt-1">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-white/75 text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>

                  {/* Bottom accent line */}
                  <motion.div
                    className={`mt-5 h-0.5 w-12 rounded-full bg-gradient-to-r ${step.color}`}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                    style={{ transformOrigin: "left" }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-white/55 text-xs mt-16 tracking-wide"
        >
          Every engagement is customized — timelines vary based on project scope and complexity.
        </motion.p>
      </div>
    </section>
  );
}
