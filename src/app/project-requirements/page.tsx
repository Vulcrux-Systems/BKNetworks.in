import type { Metadata } from "next";
import ProjectRequirementsForm from "./ProjectRequirementsForm";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Project Requirements",
  description:
    "Submit your detailed project requirements for a tailored IT solution from BKNetwork Services.",
};

export default function ProjectRequirementsPage() {
  return (
    <>
      <PageHero
        badge="Tailored Solutions"
        title="Define Your Vision for "
        highlightedWord="Excellence"
        description="Fill out the form below to help us understand your needs. We'll get back to you with a tailored proposal."
        breadcrumb={[{ label: "Project Requirements", href: "/project-requirements" }]}
      />

      <section className="py-20 lg:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ProjectRequirementsForm />
        </div>
      </section>
    </>
  );
}
