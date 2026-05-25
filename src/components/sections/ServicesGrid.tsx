"use client";

import { useState } from "react";
import { Lightbulb, Cloud, Headphones, GitMerge, Database, Wifi, Smartphone, Globe, BrainCircuit, ArrowRight, X, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, any> = {
  Lightbulb, Cloud, Headphones, GitMerge, Database, Wifi, Smartphone, Globe, BrainCircuit,
};

const services = [
  {
    id: "it-consulting",
    title: "IT Consulting",
    description: "Strategic technology planning and digital transformation guidance tailored to your business objectives.",
    icon: "Lightbulb",
    color: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    badge: "Consulting",
    stats: [{ label: "Clients Served", value: "80+" }, { label: "Avg ROI", value: "3.5x" }, { label: "Experience", value: "10+ Yrs" }],
    features: ["Technology Assessment", "Strategic Roadmap Development", "Digital Transformation Planning", "Vendor Selection Assistance"],
    modalContent: {
      overview: "Our IT consulting practice helps businesses make smarter technology decisions. We assess your current landscape, identify gaps, and create a practical roadmap that aligns IT investments with your business goals — delivering measurable outcomes.",
      highlights: [
        "Comprehensive IT health check and maturity assessment",
        "Vendor-neutral technology selection and procurement advisory",
        "IT governance frameworks (ITIL, COBIT, ISO 20000)",
        "Total Cost of Ownership (TCO) and ROI analysis",
        "Board-level technology briefings and executive advisory",
        "Third-party auditing and independent verification services",
      ],
      process: ["Discovery", "Assessment", "Strategy Design", "Roadmap", "Implementation Support", "Review"],
      whyUs: "Our consultants bring 10+ years of field experience and hold certifications from leading bodies including ITIL, PMP, and TOGAF. We've advised 80+ organizations across BFSI, education, and government sectors.",
    },
  },
  {
    id: "cloud-services",
    title: "Cloud Services",
    description: "Cloud migration, management, and optimization services across all major platforms.",
    icon: "Cloud",
    color: "from-green-500 to-emerald-500",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    badge: "Cloud",
    stats: [{ label: "Cost Savings", value: "35%" }, { label: "Migrations", value: "100+" }, { label: "Uptime", value: "99.9%" }],
    features: ["Cloud Migration Planning", "Multi-Cloud Management", "Cost Optimization", "Backup & Disaster Recovery"],
    modalContent: {
      overview: "We take the complexity out of cloud. From lift-and-shift migrations to cloud-native rebuilds, our certified cloud architects design solutions that maximize performance, security, and cost efficiency across AWS, Azure, and GCP.",
      highlights: [
        "Cloud migration with minimal downtime using proven runbooks",
        "FinOps — continuous cloud cost monitoring and rightsizing",
        "Hybrid and multi-cloud management with unified visibility",
        "Kubernetes-based container orchestration and microservices",
        "Cloud security posture management (CSPM)",
        "Disaster recovery in the cloud with automated failover",
      ],
      process: ["Cloud Readiness Assessment", "Migration Strategy", "Pilot Migration", "Full Migration", "Optimization", "Managed Operations"],
      whyUs: "AWS Advanced Partner and Microsoft Azure Partner. Our cloud team has delivered 100+ migrations with an average 35% reduction in infrastructure spend post-migration.",
    },
  },
  {
    id: "support",
    title: "24/7 Support",
    description: "Round-the-clock technical support and maintenance ensuring your systems run smoothly with minimal downtime.",
    icon: "Headphones",
    color: "from-indigo-500 to-purple-500",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    badge: "Support",
    stats: [{ label: "First-Call Fix", value: "92%" }, { label: "Response", value: "<30 min" }, { label: "Satisfaction", value: "98%" }],
    features: ["24/7 Helpdesk Support", "Remote Troubleshooting", "System Monitoring", "Preventive Maintenance"],
    modalContent: {
      overview: "Technology never sleeps and neither do we. Our 24/7 support team provides rapid, expert assistance across all levels — from L1 helpdesk to L3 engineering — ensuring your business operations face zero unplanned interruptions.",
      highlights: [
        "Multi-channel support: phone, email, chat, and remote desktop",
        "Tiered support structure: L1, L2, and L3 escalation paths",
        "Proactive monitoring with auto-ticket generation on anomalies",
        "Dedicated support portal with real-time ticket tracking",
        "SLA-backed response times with penalty clauses",
        "Monthly service review reports and trend analysis",
      ],
      process: ["Onboarding", "Knowledge Base Setup", "Monitoring Integration", "Escalation Matrix", "Go-Live", "Continuous Improvement"],
      whyUs: "Our support team maintains a 92% first-call resolution rate and 98% client satisfaction score. We currently manage over 5,000 endpoints across 80+ organizations in NCR and beyond.",
    },
  },
  {
    id: "system-integration",
    title: "System Integration",
    description: "Seamless integration of business systems and applications to unify your technology ecosystem.",
    icon: "GitMerge",
    color: "from-orange-500 to-amber-500",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    badge: "Integration",
    stats: [{ label: "Projects Done", value: "200+" }, { label: "Efficiency Gain", value: "↑60%" }, { label: "Downtime", value: "↓80%" }],
    features: ["API Development & Integration", "Legacy System Modernization", "Workflow Automation", "Custom Software Development"],
    modalContent: {
      overview: "Disconnected systems cost time and money. We design and implement seamless integration solutions that connect your applications, automate workflows, and synchronize data — giving you a single, coherent technology ecosystem.",
      highlights: [
        "RESTful and GraphQL API design, development, and management",
        "Legacy system modernization and re-platforming",
        "Enterprise Service Bus (ESB) and middleware configuration",
        "Real-time data synchronization across platforms",
        "Custom workflow automation using low-code and custom code",
        "End-to-end testing and integration quality assurance",
      ],
      process: ["Systems Audit", "Integration Design", "API Development", "Testing", "Deployment", "Ongoing Management"],
      whyUs: "With 200+ integration projects delivered, we have deep expertise across ERP, CRM, HRMS, and e-commerce platforms. Our solutions reduce manual effort by an average of 60% and eliminate data silos.",
    },
  },
  {
    id: "data-management",
    title: "Data Management",
    description: "Comprehensive data solutions and analytics services to turn your data into a strategic asset.",
    icon: "Database",
    color: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    badge: "Data",
    stats: [{ label: "Data Points", value: "1B+" }, { label: "Recovery SLA", value: "99.9%" }, { label: "Compliance", value: "100%" }],
    features: ["Database Design & Optimization", "Data Migration Services", "Business Intelligence Setup", "Compliance & Governance"],
    modalContent: {
      overview: "Your data is your most valuable asset. We provide end-to-end data management services — from database architecture and migration to BI dashboards and compliance — ensuring your data is secure, accessible, and actionable.",
      highlights: [
        "Database architecture design for OLTP and analytical workloads",
        "Secure data migration with zero data loss guarantees",
        "Business intelligence and dashboard development (Power BI, Tableau)",
        "Data governance frameworks and metadata management",
        "Automated backup, recovery, and archival solutions",
        "GDPR, PDPA, and CERT-In compliance implementations",
      ],
      process: ["Data Audit", "Architecture Design", "Migration Planning", "Implementation", "BI & Reporting", "Governance"],
      whyUs: "We have managed over 1 billion data records with a 99.9% recovery SLA and zero compliance failures. Our data engineers hold certifications in AWS, Azure, and Google Cloud data services.",
    },
  },
  {
    id: "network-management",
    title: "Network Management",
    description: "Complete network infrastructure management and optimization for peak performance and security.",
    icon: "Wifi",
    color: "from-teal-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    badge: "Network",
    stats: [{ label: "Uptime", value: "99.9%" }, { label: "Networks Managed", value: "500+" }, { label: "Response", value: "<15 min" }],
    features: ["Network Design & Setup", "Performance Optimization", "Security Configuration", "Wireless Network Deployment"],
    modalContent: {
      overview: "A robust network is the backbone of every business. We design, deploy, and manage enterprise network infrastructure — from LAN/WAN and SD-WAN to wireless and security — ensuring maximum uptime and performance.",
      highlights: [
        "Network design, topology planning, and structured cabling",
        "SD-WAN deployment for intelligent traffic management",
        "Wireless network deployment: enterprise Wi-Fi 6/6E solutions",
        "Firewall, VPN, and network security configuration",
        "24/7 network monitoring with real-time alerting",
        "Bandwidth analysis, QoS tuning, and capacity planning",
      ],
      process: ["Network Audit", "Design & Planning", "Procurement", "Deployment", "Testing", "Monitoring & Management"],
      whyUs: "We manage 500+ enterprise networks with a 99.9% uptime guarantee and sub-15-minute incident response. Our network engineers are certified in Cisco, Juniper, and Fortinet platforms.",
    },
  },
  {
    id: "mobile-solutions",
    title: "Mobile Solutions",
    description: "Mobile device management and application development for the modern mobile workforce.",
    icon: "Smartphone",
    color: "from-rose-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    badge: "Mobile",
    stats: [{ label: "Apps Deployed", value: "100+" }, { label: "Platforms", value: "iOS & Android" }, { label: "Users", value: "500K+" }],
    features: ["Mobile Device Management (MDM)", "Mobile App Development", "BYOD Policy Implementation", "Mobile Security Solutions"],
    modalContent: {
      overview: "We help organizations harness the power of mobile technology — from building cross-platform apps to managing entire device fleets. Our mobile solutions keep your workforce productive and your corporate data secure.",
      highlights: [
        "Enterprise MDM deployment: Jamf, Microsoft Intune, VMware Workspace ONE",
        "iOS, Android, and cross-platform app development (Flutter, React Native)",
        "BYOD policy design, implementation, and employee training",
        "Mobile application management (MAM) and containerization",
        "Remote wipe, geofencing, and compliance policy enforcement",
        "App Store/Play Store publishing and ongoing maintenance",
      ],
      process: ["Requirements Gathering", "MDM/App Design", "Development", "Security Hardening", "Deployment", "Support & Updates"],
      whyUs: "We have delivered 100+ mobile projects serving over 500,000 end users. Our team covers the full mobile lifecycle — from UX design to enterprise-grade security — across iOS and Android platforms.",
    },
  },
  {
    id: "website-development",
    title: "Website Development",
    description: "Custom website design and development solutions built for performance, growth, and user experience.",
    icon: "Globe",
    color: "from-sky-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    badge: "Web Dev",
    stats: [{ label: "Sites Built", value: "200+" }, { label: "Performance", value: "98 Score" }, { label: "Satisfaction", value: "96%" }],
    features: ["Responsive Web Design", "E-Commerce Development", "Content Management Systems", "SEO Optimization"],
    modalContent: {
      overview: "Your website is your most visible business asset. We design and build fast, secure, and scalable websites — from corporate portals and e-commerce stores to custom web applications — optimized for search engines and conversions.",
      highlights: [
        "Pixel-perfect responsive design for all devices and screen sizes",
        "E-commerce development: Shopify, WooCommerce, and custom builds",
        "CMS integration: WordPress, Contentful, Sanity, and headless CMS",
        "Technical SEO, Core Web Vitals optimization, and schema markup",
        "Security hardening: SSL, WAF, OWASP best practices",
        "Ongoing maintenance, updates, and performance monitoring",
      ],
      process: ["Discovery & Brief", "UI/UX Design", "Development", "Content Integration", "QA & Testing", "Launch & Maintenance"],
      whyUs: "We have delivered 200+ websites with an average Lighthouse performance score of 98. Our full-stack team covers design, development, SEO, and hosting — so you get a single partner for your entire web presence.",
    },
  },
  {
    id: "ai-solutions",
    title: "AI Solutions",
    description: "Intelligent AI-powered solutions to automate operations, unlock insights, and drive competitive advantage.",
    icon: "BrainCircuit",
    color: "from-violet-500 to-fuchsia-500",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    badge: "AI",
    stats: [{ label: "Automation", value: "85%" }, { label: "Cost Reduction", value: "40%" }, { label: "Accuracy", value: "99%+" }],
    features: ["AI Chatbots & Virtual Agents", "Machine Learning Models", "Intelligent Process Automation", "Predictive Analytics"],
    modalContent: {
      overview: "AI is no longer a future technology — it's a competitive necessity. We design and deploy practical AI solutions tailored to your business: from intelligent chatbots and document processing to custom ML models and end-to-end automation pipelines.",
      highlights: [
        "Custom LLM-powered chatbots and virtual assistants for customer support",
        "Machine learning model development, training, and productionization",
        "Intelligent document processing: OCR, extraction, and classification",
        "Predictive analytics for sales forecasting, churn, and inventory",
        "Robotic Process Automation (RPA) for repetitive business workflows",
        "AI governance, explainability, and bias auditing frameworks",
      ],
      process: ["Use Case Discovery", "Data Assessment", "Model Design", "Development & Training", "Integration", "Monitoring & Retraining"],
      whyUs: "Our AI team combines domain expertise with cutting-edge research — delivering solutions that achieve 99%+ accuracy and reduce operational costs by up to 40%. We work with open-source and enterprise AI stacks including OpenAI, Hugging Face, and Azure AI.",
    },
  },
];

export default function ServicesGrid() {
  const [selected, setSelected] = useState<typeof services[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon] || Lightbulb;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="relative h-full rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${service.color} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />

                  <span className="absolute top-4 left-4 text-xs font-bold text-white bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full">
                    {service.badge}
                  </span>

                  <div className={`absolute bottom-4 left-5 p-3 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg border border-white/20`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-display font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{service.description}</p>

                  {/* Features */}
                  <div className="space-y-1.5 mb-5">
                    {service.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-white/50">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} shrink-0`} />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-5 py-3 border-y border-white/10">
                    {service.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-sm font-bold text-white">{stat.value}</div>
                        <div className="text-[10px] text-white/40 mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelected(service)}
                      className={`flex-1 py-2.5 rounded-xl bg-gradient-to-r ${service.color} text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5`}
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
                  {(() => { const Icon = iconMap[selected.icon] || Lightbulb; return <Icon className="w-5 h-5 text-white" />; })()}
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
