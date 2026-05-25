"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const SPECIALIZATIONS = [
  {
    imageSrc: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Live Streaming Setup",
    title: "Live Streaming Solutions",
    description: "Enterprise-grade streaming setups for professional broadcasting and events.",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Data Center Server Room",
    title: "Data Center Setup",
    description: "Complete design, implementation & optimization of modern data centers.",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Network Infrastructure",
    title: "Structured Networking",
    description: "LAN/WAN infrastructure, hardware solutions & professional cabling.",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop&q=80",
    imageAlt: "DevOps and AI Technology",
    title: "DevOps & AI Solutions",
    description: "Cloud-native applications, automation, and AI-driven development tools.",
  },
];


export function CoreSpecializations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const router = useRouter();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".spec-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".spec-grid",
            start: "top 75%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#60A5FA08_1px,transparent_1px),linear-gradient(to_bottom,#60A5FA08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000,transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20 space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block text-xs font-bold text-[#60A5FA] uppercase tracking-[0.3em] px-4 py-2 rounded-full border border-[#C5BAFF]/20 bg-[#C5BAFF]/5"
          >
            What We Do
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F8FAFC] leading-none">
            Our Core{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #60A5FA 100%)",
                backgroundSize: "200% 200%",
                animation: "shimmer 4s ease infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Specializations
            </span>
          </h2>

          <p className="text-lg text-[#F8FAFC]/60 max-w-2xl mx-auto font-light leading-relaxed">
            Comprehensive IT solutions designed to scale with your business needs.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="spec-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIALIZATIONS.map((spec) => (
            <div
              key={spec.title}
              className="spec-card group relative w-full overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:shadow-xl hover:shadow-[#3B82F6]/15 flex flex-col"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={spec.imageSrc}
                  alt={spec.imageAlt}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Gradient overlay at image bottom */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-44 rounded-t-2xl bg-gradient-to-b from-transparent via-transparent to-[#0F172A]/60" />

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold tracking-tight text-white transition-colors duration-300">
                  {spec.title}
                </h3>

                <p className="mt-2 text-sm text-white/60 leading-relaxed flex-1">
                  {spec.description}
                </p>

                <div className="mt-5">
                  <button
                    onClick={() => router.push("/services")}
                    className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[#3B82F6]/30"
                    style={{ background: "linear-gradient(135deg, #3B82F6 0%, #C5BAFF 100%)" }}
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
