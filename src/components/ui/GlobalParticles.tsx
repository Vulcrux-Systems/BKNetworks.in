"use client";

import { FloatingParticles } from "./FloatingParticles";

export function GlobalParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <FloatingParticles count={20} />
    </div>
  );
}
