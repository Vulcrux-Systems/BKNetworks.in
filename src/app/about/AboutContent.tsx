"use client";

import { useRef, useEffect } from "react";
import { Target, Eye, Gem, CheckCircle2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To empower businesses with innovative IT solutions that drive efficiency, security, and sustainable growth in the digital era.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To be the most trusted IT services partner for enterprises and government organizations across India and beyond.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Gem,
    title: "Our Values",
    description:
      "Innovation, integrity, and customer-centricity are the pillars that guide every project we undertake.",
    color: "from-yellow-500 to-orange-500",
  },
];

const highlights = [
  "Over 10 years of industry experience",
  "Trusted by leading High Courts of India",
  "Strategic partnerships with Cisco, IBM, and Dell",
  "Expert team of certified IT professionals",
  "End-to-end solutions from consulting to support",
  "High-performance data center operations",
];

export default function AboutContent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const valuesInView = useInView(valuesRef, { once: false, amount: 0.1 });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      values.forEach((_, index) => {
        gsap.fromTo(
          `.about-value-card-${index}`,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: `.about-value-card-${index}`,
              start: "top 82%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="space-y-0">
      {/* Our Story */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div>
                <span className="chapter-label block mb-4">Our Journey</span>
                <h2 className="text-4xl sm:text-5xl font-display font-black text-foreground tracking-tight leading-tight">
                  A Decade of Transforming{" "}
                  <span className="theme-grad-text">Technology</span> into Growth
                </h2>
              </div>

              <div className="space-y-5 text-lg text-foreground/60 leading-relaxed">
                <p>
                  Founded with a vision to bridge the gap between complex technology
                  and business outcomes, BKNetwork Services has grown into a trusted
                  IT solutions partner for leading enterprises and government
                  institutions across India.
                </p>
                <p>
                  With over a decade of experience, we specialize in delivering
                  end-to-end IT services — from strategic consulting and cloud
                  migrations to cybersecurity and 24/7 managed support.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full theme-grad flex items-center justify-center shrink-0 shadow">
                      <CheckCircle2 className="w-3 h-3 text-[#F8FAFC]" />
                    </div>
                    <span className="text-foreground/70 font-medium text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1121] to-[#9EC6F3] p-8 lg:p-12 border border-white/10 shadow-2xl">
                {/* Inner grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#A78BFA08_1px,transparent_1px),linear-gradient(to_bottom,#A78BFA08_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-display font-bold text-[#F8FAFC] mb-6">
                    Serving Excellence
                  </h3>
                  <p className="text-[#F8FAFC]/60 italic leading-relaxed mb-8">
                    "We're proud to serve esteemed organizations including Tata
                    Powers, Patanjali Group, and multiple Honorable High Courts,
                    demonstrating our capability to handle mission-critical
                    infrastructure."
                  </p>
                  <div className="pt-6 border-t border-white/10">
                    <div className="flex flex-wrap gap-3">
                      {["Tata Powers", "Patanjali", "High Courts", "Lokpal of India"].map((client) => (
                        <span
                          key={client}
                          className="px-3 py-1.5 bg-[#C5BAFF]/10 text-[#60A5FA] text-xs font-bold rounded-full uppercase tracking-wider border border-[#C5BAFF]/20"
                        >
                          {client}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={valuesRef}
        className="py-20 lg:py-32 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-foreground tracking-tight mb-6">
              Guided by{" "}
              <span className="theme-grad-text">Core Values</span>
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Our culture and decisions are anchored in principles that ensure we deliver the highest value to our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className={`about-value-card-${i} group`}>
                  <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-sm border border-foreground/10 hover:border-foreground/20 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />

                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${v.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-7 h-7 text-[#F8FAFC]" />
                    </div>

                    <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-[#F8FAFC] transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-foreground/60 leading-relaxed">
                      {v.description}
                    </p>

                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#A78BFA]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
