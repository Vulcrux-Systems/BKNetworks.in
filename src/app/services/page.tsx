import type { Metadata } from "next";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ServiceProcess from "@/components/sections/ServiceProcess";
import CTASection from "@/components/sections/CTASection";
import { GravitationalMeshHero } from "@/components/ui/retrying";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our comprehensive IT services — IT Consulting, Cybersecurity, Cloud Services, DevOps & AI, 24/7 Support, and Live Streaming.",
};

export default function ServicesPage() {
  return (
    <>
      <GravitationalMeshHero
        badge="Our Services"
        title={"Comprehensive IT Solutions\nfor Digital Excellence"}
        highlightedWord="Excellence"
        description="From strategic consulting to 24/7 support, we provide end-to-end IT services designed to accelerate your digital transformation."
        breadcrumb={[{ label: "Services", href: "/services" }]}
        primaryCTA={{ label: "Submit Requirements", href: "/project-requirements" }}
        secondaryCTA={{ label: "Schedule a Call", href: "/schedule-consultation" }}
        stats={[
          { value: "9+", label: "Core Services" },
          { value: "24/7", label: "Support" },
          { value: "500+", label: "Projects Done" },
        ]}
      />

      <section className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ServicesGrid />
        </div>
      </section>

      <ServiceProcess />

      <CTASection
        title="Need a Custom Solution?"
        description="Our team of experts will work closely with you to design and implement solutions tailored to your specific needs."
        primaryCTA={{ label: "Submit Requirements", href: "/project-requirements" }}
        secondaryCTA={{ label: "Schedule a Call", href: "/schedule-consultation" }}
      />
    </>
  );
}
