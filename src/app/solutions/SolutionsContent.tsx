"use client";

import { useState } from "react";
import { Video, Database, Wifi, Package, Scale, Cpu, ArrowRight, X, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, any> = {
  Video, Database, Wifi, Package, Scale, Cpu,
};

const solutions = [
  {
    id: "live-streaming",
    title: "Live Streaming Solutions",
    description: "Professional 4K/8K live streaming infrastructure for corporate events, webinars, and virtual conferences with multi-platform distribution.",
    icon: "Video",
    color: "from-teal-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    badge: "Live Streaming",
    stats: [{ label: "Stream Quality", value: "4K/8K" }, { label: "Platforms", value: "10+" }, { label: "Events Done", value: "500+" }],
    modalContent: {
      overview: "BKNetwork delivers end-to-end live streaming solutions for organizations that demand broadcast-quality output. From studio setup to global CDN distribution, we manage every aspect of your live event — ensuring zero lag, crystal-clear video, and seamless audience engagement at scale.",
      highlights: [
        "4K/8K streaming with professional encoding and low-latency distribution",
        "Multi-platform simulcasting: YouTube, LinkedIn, Facebook, Zoom, and custom RTMP",
        "Real-time analytics dashboard for audience engagement and stream health",
        "Interactive features: live polls, Q&A, chat moderation, and virtual breakout rooms",
        "Scalable infrastructure supporting 10 to 100,000+ concurrent viewers",
        "Professional studio setup, OBS/vMix configuration, and on-site technical crew",
      ],
      process: ["Requirement Gathering", "Studio & Tech Setup", "Rehearsal & Testing", "Live Event Execution", "Recording & Archival", "Post-Event Analytics"],
    },
  },
  {
    id: "data-center-setup",
    title: "Data Center Setup",
    description: "End-to-end modular data center design and construction with energy-efficient cooling, redundant power, and enterprise-grade infrastructure.",
    icon: "Database",
    color: "from-blue-500 to-indigo-500",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    badge: "Data Center",
    stats: [{ label: "Power Efficiency", value: "PUE 1.2" }, { label: "Uptime", value: "99.99%" }, { label: "Certified", value: "Tier III" }],
    modalContent: {
      overview: "From greenfield builds to facility upgrades, BKNetwork delivers complete data center lifecycle management. Our designs are engineered for maximum density, energy efficiency, and operational resilience — meeting TIA-942 and Uptime Institute Tier III standards.",
      highlights: [
        "Modular data center design for phased capacity expansion",
        "Energy-efficient cooling: hot/cold aisle containment, CRAC units, and liquid cooling",
        "Redundant power: UPS systems, generators, and dual-feed PDUs",
        "Advanced monitoring via DCIM software with real-time alerts",
        "Disaster recovery integration with geo-redundant offsite backups",
        "Compliance with ISO 27001, TIA-942, and industry-specific regulations",
      ],
      process: ["Site Survey", "Capacity Planning", "Design & Engineering", "Build & Commissioning", "Acceptance Testing", "Facilities Management"],
    },
  },
  {
    id: "structured-networking",
    title: "Structured Networking",
    description: "Enterprise fiber optic and structured cabling infrastructure for offices, campuses, and large-scale commercial installations.",
    icon: "Wifi",
    color: "from-purple-500 to-violet-500",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    badge: "Networking",
    stats: [{ label: "Cable Standards", value: "Cat6A/Fiber" }, { label: "Installations", value: "300+" }, { label: "Support", value: "24/7" }],
    modalContent: {
      overview: "A well-designed network is the foundation of every digital operation. BKNetwork plans and installs structured cabling systems that deliver maximum throughput, minimal interference, and long-term scalability — from small offices to multi-floor enterprise campuses.",
      highlights: [
        "Fiber optic backbone installation for high-speed inter-floor and campus connectivity",
        "Structured cabling: Cat6A, Cat7, and fiber patch panel management",
        "Network security integration: firewalls, VLANs, and access control policies",
        "Wireless infrastructure: enterprise Wi-Fi 6/6E design and deployment",
        "Performance optimization: traffic shaping, QoS, and load balancing",
        "24/7 network monitoring with proactive fault detection and resolution",
      ],
      process: ["Site Assessment", "Network Design", "Cable Installation", "Equipment Commissioning", "Performance Testing", "Ongoing Monitoring"],
    },
  },
  {
    id: "hardware-supplies",
    title: "Hardware Supplies",
    description: "Enterprise-grade hardware procurement, bulk supply, and professional installation for workstations, servers, and peripherals.",
    icon: "Package",
    color: "from-orange-500 to-amber-500",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    badge: "Hardware",
    stats: [{ label: "OEM Partners", value: "12+" }, { label: "Units Supplied", value: "10,000+" }, { label: "Warranty", value: "3–5 Yrs" }],
    modalContent: {
      overview: "BKNetwork is an authorized reseller and deployment partner for leading OEMs including Dell, HP, Lenovo, Cisco, and Acer. We handle everything from bulk procurement and logistics to professional installation and asset tracking — simplifying your hardware lifecycle end to end.",
      highlights: [
        "Enterprise-grade equipment: servers, workstations, laptops, and networking hardware",
        "Bulk procurement with competitive pricing and volume discounts",
        "Professional installation and configuration by certified engineers",
        "Warranty management and annual maintenance contract (AMC) services",
        "Asset tracking and inventory management with ITAM tools",
        "Hardware lifecycle management: refresh planning and responsible disposal",
      ],
      process: ["Requirements Analysis", "Vendor Selection & Quotation", "Procurement & Logistics", "Deployment & Configuration", "Asset Registration", "AMC & Support"],
    },
  },
  {
    id: "judiciary-solutions",
    title: "Solutions for Judiciary System",
    description: "Specialized digital infrastructure for High Courts and judicial bodies — case management, court recording, video conferencing, and secure document management.",
    icon: "Scale",
    color: "from-emerald-500 to-green-500",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    badge: "Judiciary — Special Vertical",
    stats: [{ label: "High Courts", value: "5+" }, { label: "Courtrooms", value: "200+" }, { label: "Uptime", value: "99.9%" }],
    modalContent: {
      overview: "BKNetwork has a dedicated vertical for judicial and government institutions. We have successfully deployed digital court infrastructure across multiple Honorable High Courts in India, enabling paperless proceedings, remote hearings, and secure case data management.",
      highlights: [
        "Court case management system (CMS) integration and customization",
        "Digital evidence management with tamper-proof audit trails",
        "Court recording systems: audio/video capture, transcription, and archival",
        "Video conferencing for remote hearings with end-to-end encrypted sessions",
        "Document management with e-filing, e-stamping, and digital signatures",
        "AES-256 encryption and strict access control for sensitive judicial data",
      ],
      process: ["Needs Assessment", "System Design", "Secure Deployment", "Staff Training", "Pilot Court", "Full Rollout & Support"],
    },
  },
  {
    id: "devops-ai",
    title: "DevOps & AI Solutions",
    description: "Accelerate software delivery with CI/CD pipelines, cloud-native architecture, container orchestration, and AI/ML model deployment.",
    icon: "Cpu",
    color: "from-indigo-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    badge: "DevOps & AI",
    stats: [{ label: "Deploy Frequency", value: "10x Faster" }, { label: "Failure Rate", value: "–80%" }, { label: "AI Models", value: "50+" }],
    modalContent: {
      overview: "BKNetwork bridges the gap between development speed and operational stability. Our DevOps engineers and AI specialists design fully automated pipelines, cloud-native environments, and production-grade ML deployments that help your teams ship faster without sacrificing reliability.",
      highlights: [
        "CI/CD pipeline design: Jenkins, GitLab CI, GitHub Actions, and ArgoCD",
        "Cloud-native architecture on AWS, Azure, and GCP with IaC (Terraform, Ansible)",
        "AI/ML model deployment: MLflow, Kubeflow, SageMaker, and custom APIs",
        "Container orchestration with Docker, Kubernetes, and Helm charts",
        "Infrastructure as Code (IaC) for repeatable, version-controlled environments",
        "Automated testing, code quality gates, and security scanning in every pipeline",
      ],
      process: ["Current State Audit", "Pipeline Design", "Containerization", "CI/CD Implementation", "AI/ML Integration", "Monitoring & Iteration"],
    },
  },
];

export default function SolutionsContent() {
  const [selected, setSelected] = useState<typeof solutions[0] | null>(null);

  return (
    <>
      <section className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, i) => {
              const Icon = iconMap[solution.icon] || Video;
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-full rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">

                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={solution.image}
                        alt={solution.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-b ${solution.color} opacity-60`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />

                      {/* Badge */}
                      <span className="absolute top-4 left-4 text-xs font-bold text-white bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full">
                        {solution.badge}
                      </span>

                      {/* Icon */}
                      <div className={`absolute bottom-4 left-5 p-3 rounded-2xl bg-gradient-to-br ${solution.color} shadow-lg border border-white/20`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-lg font-display font-bold text-white mb-2 leading-tight">
                        {solution.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed mb-5">
                        {solution.description}
                      </p>

                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-2 mb-5 py-4 border-y border-white/10">
                        {solution.stats.map((stat) => (
                          <div key={stat.label} className="text-center">
                            <div className="text-sm font-bold text-white">{stat.value}</div>
                            <div className="text-[10px] text-white/40 mt-0.5">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between gap-3">
                        <button
                          onClick={() => setSelected(solution)}
                          className={`flex-1 py-2.5 rounded-xl bg-gradient-to-r ${solution.color} text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5`}
                        >
                          Know More <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          href="/contact"
                          className="flex-1 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-white/20 transition-colors text-center"
                        >
                          Enquire Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="relative w-full max-w-lg rounded-2xl bg-[#0F172A] border border-white/15 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Compact Header */}
              <div className={`bg-gradient-to-r ${selected.color} px-5 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  {(() => { const Icon = iconMap[selected.icon] || Video; return <Icon className="w-5 h-5 text-white" />; })()}
                  <div>
                    <p className="text-white/70 text-[10px] font-semibold uppercase tracking-wider">{selected.badge}</p>
                    <h2 className="text-white font-bold text-base leading-tight">{selected.title}</h2>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-full bg-black/25 hover:bg-black/40 text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  {selected.stats.map((stat) => (
                    <div key={stat.label} className="text-center py-2 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-sm font-bold text-white">{stat.value}</div>
                      <div className="text-[10px] text-white/45">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Overview */}
                <p className="text-white/65 text-xs leading-relaxed">{selected.modalContent.overview}</p>

                {/* Highlights — 2 columns */}
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">What We Deliver</p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {selected.modalContent.highlights.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-white/65 text-[11px] leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Our Process</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.modalContent.process.map((step, idx) => (
                      <span key={idx} className={`px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gradient-to-r ${selected.color} text-white opacity-90`}>
                        {idx + 1}. {step}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  onClick={() => setSelected(null)}
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r ${selected.color} text-white font-bold text-sm hover:opacity-90 transition-opacity`}
                >
                  Enquire Now — Free Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
