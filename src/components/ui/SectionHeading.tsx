"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeading({
  label,
  title,
  description,
  center = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 lg:mb-16 ${center ? "text-center" : ""}`}
    >
      {label && (
        <div className="inline-block px-4 py-2 rounded-full theme-grad text-[#F8FAFC] text-sm font-semibold tracking-wide border-0 mb-6 shadow-sm">
          {label}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-6 leading-tight tracking-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`text-neutral-500 text-lg leading-relaxed ${
            center ? "max-w-2xl mx-auto" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
