import type { Metadata } from "next";
import CTASection from "@/components/sections/CTASection";
import SolutionsContent from "./SolutionsContent";
import { AetherFlowHero } from "@/components/ui/aether-flow-hero";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Business-focused IT solutions for enterprise infrastructure, digital transformation, and scalable growth.",
};

export default function SolutionsPage() {
  return (
    <>
      <AetherFlowHero
        badge="Enterprise Solutions"
        title="Scalable & Secure Architectures for Modern Business"
        highlightedWord="Business"
        description="Scalable, secure, and innovative solutions designed to transform your business operations and drive measurable results."
        breadcrumb={[{ label: "Solutions", href: "/solutions" }]}
        primaryCTA={{ label: "Schedule Consultation", href: "/schedule-consultation" }}
        secondaryCTA={{ label: "View Services", href: "/services" }}
        stats={[
          { value: "50+", label: "Solutions Delivered" },
          { value: "99.9%", label: "Uptime SLA" },
          { value: "150+", label: "Happy Clients" },
        ]}
      />

      <SolutionsContent />

      <CTASection
        title="Let's Build Your Solution"
        description="Every business is unique. Let us architect a solution that perfectly fits your requirements."
        primaryCTA={{ label: "Schedule Consultation", href: "/schedule-consultation" }}
        secondaryCTA={{ label: "View Services", href: "/services" }}
      />
    </>
  );
}
