"use client";

import { useEffect, useState, useRef } from "react";
import { useIntersection } from "@/hooks/useIntersection";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  label,
  duration = 2000,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useIntersection(0.3);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const isDecimal = value % 1 !== 0;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
        {count}
        {suffix}
      </div>
      <p className="text-muted text-sm">{label}</p>
    </div>
  );
}
