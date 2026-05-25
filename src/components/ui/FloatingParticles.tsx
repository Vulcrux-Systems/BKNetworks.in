"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  xDrift: number;
  yStart: number;
}

export function FloatingParticles({ count = 20 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 10 + 12,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.3 + 0.08,
        xDrift: Math.random() * 16 - 8,
        yStart: Math.random() * 100,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.yStart}%`,
            width: p.size,
            height: p.size,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.xDrift, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
