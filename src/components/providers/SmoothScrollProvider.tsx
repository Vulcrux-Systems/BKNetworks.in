"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5,
        infinite: false,
        orientation: "vertical",
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
