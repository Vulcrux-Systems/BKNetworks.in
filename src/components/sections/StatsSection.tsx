"use client";

import { STATS } from "@/lib/constants";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function StatsSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
