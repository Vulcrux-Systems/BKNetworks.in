import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for ${COMPANY.name} — disclaimer, liability, and intellectual property.`,
};

const sections = [
  {
    title: "1. Disclaimer",
    content: `The information provided on this website is for general informational purposes only. ${COMPANY.name} makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related content contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.`,
  },
  {
    title: "2. Service Accuracy",
    content: "While we strive to ensure the accuracy and timeliness of the information on our website, we do not warrant that the content is free from errors, inaccuracies, or omissions. Service descriptions, pricing, availability, and other details are subject to change without prior notice. We recommend contacting us directly for the most up-to-date information regarding our services and offerings.",
  },
  {
    title: "3. Limitation of Liability",
    content: `In no event shall ${COMPANY.name}, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website or services.`,
  },
  {
    title: "4. Intellectual Property Rights",
    content: `All content on this website — including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software — is the property of ${COMPANY.name} or its content suppliers and is protected by Indian and international intellectual property laws. The compilation of all content on this site is the exclusive property of ${COMPANY.name}.`,
  },
  {
    title: "5. Use of Website",
    content: "By accessing and using this website, you agree to be bound by these terms and conditions. You may not use this website for any unlawful purpose or in any way that could damage, disable, overburden, or impair the website. You may not attempt to gain unauthorized access to any part of the website, its servers, or any systems connected to the website.",
  },
  {
    title: "6. Governing Law & Jurisdiction",
    content: "These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising from or relating to these terms shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.",
  },
];

export default function TermsConditionsPage() {
  return (
    <>
      <PageHero
        badge="Legal Information"
        title="Terms and Conditions of "
        highlightedWord="Service"
        description="Please read these terms carefully before using our website and services at BKNETWORK SERVICES PVT. LTD."
        breadcrumb={[{ label: "Terms & Conditions", href: "/terms-conditions" }]}
      />

      <section className="py-20 lg:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-foreground/10 overflow-hidden shadow-xl">
            {sections.map((section, i) => (
              <div key={section.title} className={`p-8 lg:p-12 ${i > 0 ? 'border-t border-foreground/10' : ''}`}>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="text-foreground/60 leading-relaxed">{section.content}</p>
              </div>
            ))}
            <div className="p-8 lg:p-12 border-t border-foreground/10 bg-gradient-to-br from-[#0B1121]/5 to-transparent">
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                7. Contact Information
              </h2>
              <p className="text-foreground/60 leading-relaxed">
                For questions regarding these Terms & Conditions, please contact us at{" "}
                <a href={`mailto:${COMPANY.email}`} className="text-[#60A5FA] font-semibold hover:underline">
                  {COMPANY.email}
                </a>{" "}
                or call{" "}
                <a href={`tel:${COMPANY.phone}`} className="text-[#60A5FA] font-semibold hover:underline">
                  {COMPANY.phone}
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
