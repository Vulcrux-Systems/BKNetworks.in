"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, Building2, Globe } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const timeline = [
    {
      date: "2014",
      icon: Rocket,
      title: "The Foundation",
      description:
        "BKNetwork Services was founded with a clear vision — to bridge the gap between complex enterprise technology and real business outcomes. Starting with a small but expert team, we took on our first IT infrastructure projects.",
      color: "from-[#3B82F6] to-[#8B6F47]",
    },
    {
      date: "2018",
      icon: Building2,
      title: "Government Trust",
      description:
        "We earned the trust of India's Honorable High Courts — including Madhya Pradesh, Bihar, and Sikkim — delivering mission-critical IT infrastructure for the judiciary. This milestone cemented our reputation for reliability and precision.",
      color: "from-[#A78BFA] to-[#FFD700]",
    },
    {
      date: "Today",
      icon: Globe,
      title: "Enterprise at Scale",
      description:
        "Today, BKNetwork is a full-spectrum IT solutions partner — serving 150+ clients including Tata Powers, Patanjali Group, and multiple High Courts. We're certified partners with IBM, Dell, Cisco, Red Hat, and more.",
      color: "from-[#3B82F6] to-[#9EC6F3]",
    },
  ];

  useEffect(() => {}, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-[#F8FAFC] uppercase tracking-wider">
            Chapter One
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mt-4 mb-6 tracking-tight text-[#F8FAFC]">
            Our Journey
          </h2>
          <p className="text-xl text-[#F8FAFC]/70 max-w-2xl mx-auto">
            A decade of transforming technology into growth for enterprises and governments
          </p>
        </motion.div>

        <div className="timeline-container relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3B82F6]/20 via-[#C5BAFF]/40 to-[#9EC6F3]/20" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.title}
              className="relative mb-16 last:mb-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`flex flex-col md:flex-row items-start gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="relative flex-shrink-0">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg z-10`}>
                    <item.icon className="w-8 h-8 text-[#F8FAFC]" />
                  </div>
                  <div className="absolute -top-2 -right-2 px-3 py-1 bg-[#3B82F6] text-[#F8FAFC] text-xs font-bold rounded-full">
                    {item.date}
                  </div>
                </div>

                <div className="flex-1 group">
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/50 backdrop-blur-sm border border-[#3B82F6]/10 hover:border-[#3B82F6]/30 transition-colors duration-300 shadow-lg">
                    <h3 className="text-3xl font-bold mb-4 text-[#F8FAFC] group-hover:text-[#60A5FA] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[#F8FAFC]/70 leading-relaxed text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#C5BAFF]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
