"use client";
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export type ClientEntry = {
  name: string;
  tag: string;
  abbr: string;
  color: string;
  Icon: LucideIcon;
  type: "corporate" | "government";
};

export const TestimonialsColumn = (props: {
  className?: string;
  clients: ClientEntry[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5 pb-5"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.clients.map(({ name, tag, abbr, color, Icon, type }, i) => (
              <div
                key={i}
                className="relative p-5 rounded-2xl border border-white/10 max-w-xs w-full overflow-hidden bg-[#0d1f4e]/60 backdrop-blur-md shadow-lg shadow-black/20 group"
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                  }}
                />

                {/* Faded watermark */}
                <div
                  className="absolute -bottom-2 -right-1 text-[4.5rem] font-black leading-none select-none pointer-events-none opacity-[0.06]"
                  style={{ color }}
                >
                  {abbr}
                </div>

                {/* Card content */}
                <div className="relative flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-white font-bold text-sm leading-snug truncate">
                      {name}
                    </span>
                    <span
                      className="text-[11px] font-medium mt-1 px-2 py-0.5 rounded-full self-start"
                      style={{
                        color,
                        background: `${color}14`,
                        border: `1px solid ${color}22`,
                      }}
                    >
                      {tag}
                    </span>
                  </div>
                </div>

                {/* Type badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded-md text-white/30 bg-white/5 border border-white/10 uppercase">
                    {type === "corporate" ? "Corp" : "Govt"}
                  </span>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
