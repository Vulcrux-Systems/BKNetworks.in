import type { Metadata } from "next";
import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { StorySection } from "@/components/about/StorySection";
import { ValuesSection } from "@/components/about/ValuesSection";
import { MissionSection } from "@/components/about/MissionSection";
import { CoreSpecializations } from "@/components/about/CoreSpecializations";
import CTASection from "@/components/sections/CTASection";
import BrandLoop from "@/components/sections/BrandLoop";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about BKNetwork Services — our mission, vision, and expertise in IT Consulting, Cloud, DevOps & AI.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHeroSection />
      <BrandLoop />
      <StorySection />
      <CoreSpecializations />
      <ValuesSection />
      <MissionSection />
      <CTASection
        title="Ready to Transform Your Business?"
        description="Let's build something powerful together. Our experts are ready to design a solution tailored to your needs."
        primaryCTA={{ label: "Get in Touch", href: "/contact" }}
        secondaryCTA={{ label: "View Services", href: "/services" }}
      />
    </main>
  );
}
