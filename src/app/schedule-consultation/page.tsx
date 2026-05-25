import type { Metadata } from "next";
import ConsultationForm from "./ConsultationForm";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Schedule Consultation",
  description:
    "Book a free consultation with our IT experts. Choose your preferred date and time.",
};

export default function ScheduleConsultationPage() {
  return (
    <>
      <PageHero
        badge="Free Consultation"
        title="Schedule Your Expert "
        highlightedWord="Strategy Session"
        description="Select a convenient time to discuss your project with our IT experts. No obligations, just solutions."
        breadcrumb={[{ label: "Schedule Consultation", href: "/schedule-consultation" }]}
      />

      <section className="py-20 lg:py-32 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ConsultationForm />
        </div>
      </section>
    </>
  );
}
