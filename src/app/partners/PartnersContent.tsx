"use client";

import { motion } from "framer-motion";
import { Building2, Landmark, ArrowRight, CheckCircle2 } from "lucide-react";

const CORPORATE = [
  "Tata Powers",
  "Patanjali Group",
  "Greenlam Industries",
  "Hitachi Systems MICRO Clinic Pvt. Ltd",
  "Krishna Maruti Limited",
  "Uno Minda",
  "Step by Step Schools, Noida",
];

const GOVERNMENT = [
  "Honorable High Court of Punjab & Haryana",
  "Honorable High Court of Madhya Pradesh",
  "Honorable High Court of Bihar",
  "Honorable High Court of Sikkim",
  "Honorable High Court of West Bengal",
  "Honorable Calcutta High Court, Kolkata",
  "Lokpal of India",
];

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const listItem = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

function ClientCard({
  icon: Icon,
  tag,
  title,
  subtitle,
  clients,
  gradient,
  iconBg,
  accentColor,
  stat,
  delay = 0,
}: {
  icon: React.ElementType<React.SVGProps<SVGSVGElement>>;
  tag: string;
  title: string;
  subtitle: string;
  clients: string[];
  gradient: string;
  iconBg: string;
  accentColor: string;
  stat: { value: string; label: string };
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="flex-1 min-w-0 rounded-3xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10 flex flex-col"
    >
      {/* ── Gradient header ── */}
      <div className={`relative h-44 ${gradient} overflow-hidden`}>
        {/* animated shimmer blob */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-30 blur-3xl"
          style={{ background: accentColor }}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full opacity-20 blur-2xl"
          style={{ background: accentColor }}
        />

        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* tag heading */}
        <motion.div
          className="absolute top-5 left-6 right-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide drop-shadow-lg"
            animate={{ textShadow: ["0 0 8px rgba(255,255,255,0.2)", "0 0 20px rgba(255,255,255,0.45)", "0 0 8px rgba(255,255,255,0.2)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {tag}
          </motion.h2>
        </motion.div>

        {/* floating icon */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-4 left-5 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: iconBg, border: "1px solid rgba(255,255,255,0.25)" }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>


      </div>

      {/* ── Content body ── */}
      <div className="bg-[#0f2260]/80 backdrop-blur-md px-6 py-6 flex-1">
        <h3 className="text-xl font-bold text-white mb-1.5 tracking-tight">{title}</h3>
        <p className="text-white/55 text-sm mb-5 leading-relaxed">{subtitle}</p>

        <motion.ul
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-3 mb-6"
        >
          {clients.map((name) => (
            <motion.li key={name} variants={listItem} className="flex items-center gap-2.5 group">
              <CheckCircle2
                className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform duration-150"
                style={{ color: accentColor }}
              />
              <span className="text-white/80 text-base font-medium group-hover:text-white transition-colors duration-150">
                {name}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}

export default function PartnersContent() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 py-1.5 px-4 rounded-full mb-4 text-xs font-semibold text-white/60 uppercase tracking-widest">
            Our Clients
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Trusted by{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Industry Leaders
            </span>
          </h2>
          <p className="text-foreground/55 mt-3 text-sm max-w-md">
            Serving top corporations and government institutions across India with world-class IT solutions.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <ClientCard
            icon={Building2}
            tag="Corporate Clients"
            title="Corporate Excellence"
            subtitle="Leading enterprises across energy, manufacturing, IT, automotive, and education sectors."
            clients={CORPORATE}
            gradient="bg-gradient-to-br from-[#1a4fd6] via-[#1e6bbf] to-[#0ea5a0]"
            iconBg="rgba(30,107,191,0.7)"
            accentColor="#60A5FA"
            stat={{ value: "", label: "" }}
            delay={0.1}
          />
          <ClientCard
            icon={Landmark}
            tag="Government Sector"
            title="Serving the High Courts"
            subtitle="Mission-critical solutions for constitutional bodies and honourable courts across India."
            clients={GOVERNMENT}
            gradient="bg-gradient-to-br from-[#2d1b6b] via-[#4c2a8a] to-[#1a3fa0]"
            iconBg="rgba(76,42,138,0.7)"
            accentColor="#A78BFA"
            stat={{ value: "", label: "" }}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
