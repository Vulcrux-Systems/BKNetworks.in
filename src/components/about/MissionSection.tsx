"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Server, Cloud, Lock, HeadphonesIcon } from "lucide-react";
import Link from "next/link";

function CountUp({ end, decimals = 0, duration = 1800 }: { end: number; decimals?: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * end).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, decimals, duration]);

  return <span ref={ref}>{count.toFixed(decimals)}</span>;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const missions = [
    {
      icon: Server,
      title: "IT Infrastructure",
      description: "Design, deploy, and manage enterprise-grade IT infrastructure that scales with your business needs.",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description: "Accelerate your digital transformation with cloud migrations, CI/CD pipelines, and containerized deployments.",
    },
    {
      icon: Lock,
      title: "Cybersecurity",
      description: "Protect your critical assets with end-to-end security solutions, compliance frameworks, and threat monitoring.",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Managed Support",
      description: "Round-the-clock managed IT services ensuring 99.9% uptime and rapid incident resolution.",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mission-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: ".mission-title",
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
      gsap.fromTo(
        ".mission-card",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.2,
          scrollTrigger: {
            trigger: ".mission-grid",
            start: "top 70%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-[#F8FAFC] uppercase tracking-wider">
            Chapter Three
          </span>
          <h2 className="mission-title text-5xl md:text-7xl font-bold mt-4 mb-6 tracking-tight text-[#F8FAFC]">
            Our Mission
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#3B82F6] to-[#9EC6F3]" />
              <h3 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] leading-tight">
                Building the future of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#9EC6F3]">
                  enterprise IT in India
                </span>
              </h3>
            </div>
            <p className="text-lg text-[#F8FAFC]/70 leading-relaxed">
              BKNetwork Services was born from a mission to make enterprise-grade technology accessible to every organization — from India's judiciary to its largest corporations. We combine strategic consulting with hands-on execution.
            </p>
            <p className="text-lg text-[#F8FAFC]/70 leading-relaxed">
              Our vision is to be the most trusted IT partner for enterprises and government organizations across India — delivering solutions that don't just work, but transform how businesses operate.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#8B6F47] text-[#F8FAFC] rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Start a Conversation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { end: 150, suffix: "+", decimals: 0, label: "Clients Served" },
              { end: 500, suffix: "+", decimals: 0, label: "Projects Delivered" },
              { end: 10, suffix: "+", decimals: 0, label: "Years Experience" },
              { end: 99.9, suffix: "%", decimals: 1, label: "Uptime Guaranteed" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.04 }}
                className="p-6 rounded-2xl relative overflow-hidden border border-white/20 hover:border-white/35 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 24px rgba(0,0,0,0.12)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-2xl" />
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#60A5FA] to-[#C5BAFF] mb-1.5 relative z-10">
                  <CountUp end={stat.end} decimals={stat.decimals} />{stat.suffix}
                </div>
                <div className="text-sm text-white/60 font-medium relative z-10">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mission-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {missions.map((mission) => (
            <motion.div
              key={mission.title}
              className="mission-card group relative p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-[#3B82F6]/30 hover:border-[#C5BAFF] transition-all duration-300 overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <motion.div
                  className="inline-flex p-3 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#9EC6F3] mb-4"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <mission.icon className="w-6 h-6 text-[#F8FAFC]" />
                </motion.div>
                <h4 className="text-xl font-bold text-[#F8FAFC] mb-3 group-hover:text-[#60A5FA] transition-colors">
                  {mission.title}
                </h4>
                <p className="text-sm text-[#F8FAFC]/70 leading-relaxed">{mission.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#C5BAFF]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#3B82F6]/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
