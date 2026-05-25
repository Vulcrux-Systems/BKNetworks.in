"use client";

import { Server, Shield } from "lucide-react";
import { Hero } from "@/components/ui/hero-1";

export function AboutHeroSection() {
  return (
    <Hero
      eyebrow="Our Story"
      title="Powering Enterprise Technology"
      highlightedWord="Enterprise"
      subtitle="From a bold vision to India's trusted IT solutions partner — a decade of empowering enterprises and government institutions with technology that works."
      ctaLabel="Get In Touch"
      ctaHref="/contact"
      stats={[
        { value: "150+", label: "Clients Served" },
        { value: "10+", label: "Years Experience" },
        { value: "500+", label: "Projects Delivered" },
      ]}
      floatingIconLeft={<Server className="w-16 h-16 text-[#F8FAFC]/20" />}
      floatingIconRight={<Shield className="w-20 h-20 text-[#60A5FA]/20" />}
    />
  );
}
