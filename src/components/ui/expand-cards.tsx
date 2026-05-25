"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  gradient: string;   // tailwind gradient classes e.g. "from-blue-500 to-cyan-500"
  accentColor: string; // hex e.g. "#60A5FA"
}

interface ExpandCardsProps {
  cards: ServiceCard[];
}

export function ExpandCards({ cards }: ExpandCardsProps) {
  const [expanded, setExpanded] = useState<number>(0);

  return (
    <div className="w-full flex items-center justify-center overflow-x-auto scrollbar-hide px-4 py-8">
      <div className="flex items-stretch gap-3 w-full max-w-6xl min-h-[420px]">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const isOpen = expanded === idx;

          return (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                layout: { duration: 0.55, ease: [0.23, 0.86, 0.39, 0.96] },
                opacity: { duration: 0.5, delay: idx * 0.07 },
                y: { duration: 0.6, delay: idx * 0.07, ease: [0.23, 0.86, 0.39, 0.96] },
              }}
              style={{ flexShrink: 0 }}
              className={`
                relative cursor-pointer rounded-3xl overflow-hidden
                transition-[width] duration-500 ease-[cubic-bezier(0.23,0.86,0.39,0.96)]
                ${isOpen ? "w-[22rem] md:w-[26rem]" : "w-[4.5rem] md:w-[5rem]"}
                bg-white/10 backdrop-blur-md border border-white/20
                hover:border-white/40 shadow-xl
              `}
              onMouseEnter={() => setExpanded(idx)}
              onClick={() => setExpanded(idx)}
            >
              {/* Gradient tint on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity duration-500 ${isOpen ? "opacity-10" : ""} pointer-events-none rounded-3xl`}
              />

              {/* Top color bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
              />

              {/* Collapsed state — vertical title */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              >
                <div className="flex flex-col items-center gap-4 px-2">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span
                    className="text-[#F8FAFC]/80 text-xs font-bold uppercase tracking-widest"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                  >
                    {card.title}
                  </span>
                </div>
              </div>

              {/* Expanded state — full content */}
              <div
                className={`absolute inset-0 p-7 flex flex-col transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.gradient} mb-5 shadow-lg w-fit`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Number */}
                <div
                  className="absolute top-5 right-6 text-7xl font-black text-white/5 select-none pointer-events-none leading-none"
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black text-[#F8FAFC] mb-3 tracking-tight leading-tight">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-[#F8FAFC]/60 text-sm leading-relaxed mb-5 flex-shrink-0">
                  {card.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mt-auto">
                  {card.features.map((f, i) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: isOpen ? 0.2 + i * 0.07 : 0, duration: 0.4 }}
                      className="flex items-center gap-2 text-sm text-[#F8FAFC]/70"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: card.accentColor }}
                      />
                      {f}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
