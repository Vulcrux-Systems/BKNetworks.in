import { HomeHeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { BrandHighlight } from "@/components/home/BrandHighlight";
import { CommunitySection } from "@/components/home/CommunitySection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HomeCTASection } from "@/components/home/HomeCTASection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HomeHeroSection />
      <AboutSection />
      <BrandHighlight />
      <CommunitySection />
      <FeaturesSection />
      <HomeCTASection />
    </main>
  );
}
