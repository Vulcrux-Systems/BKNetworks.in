import type { Metadata } from "next";
import PartnersCarousel from "@/components/sections/PartnersCarousel";
import PartnersContent from "./PartnersContent";
import WhyPartnerWithUs from "@/components/sections/WhyPartnerWithUs";
import CTASection from "@/components/sections/CTASection";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export const metadata: Metadata = {
  title: "Partners in Growth",
  description:
    "Our technology partners and trusted clients across corporate and government sectors.",
};

export default function PartnersPage() {
  return (
    <>
      <HeroGeometric
        badge="Partners in Growth"
        title1="Building Success Together through"
        title2="Collaboration"
        description="We collaborate with global technology leaders and serve esteemed organizations across corporate and government sectors."
        breadcrumb={[{ label: "Partners", href: "/partners" }]}
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "View Solutions", href: "/solutions" }}
        stats={[
          { value: "12+", label: "Tech Partners" },
          { value: "50+", label: "Corporate Clients" },
          { value: "20+", label: "Govt. Clients" },
        ]}
      />

      <PartnersCarousel />

      <PartnersContent />

      <WhyPartnerWithUs />

      <CTASection
        title="Partner With Us"
        description="Join our growing network of successful partnerships and accelerate your business transformation."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "View Solutions", href: "/solutions" }}
      />
    </>
  );
}
