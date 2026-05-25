import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${COMPANY.name} — how we collect, use, and protect your data.`,
};

const sections = [
  {
    title: "1. Information We Collect",
    content: "We collect personal information that you voluntarily provide when using our services or filling out forms on our website. This may include:",
    items: [
      "Name, email address, phone number, and company name provided through contact forms",
      "Project details and technical requirements submitted through our requirements form",
      "Consultation scheduling preferences including date and time selections",
      "Usage data and analytics collected automatically through cookies",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: "We use the information we collect to:",
    items: [
      "Respond to your inquiries and provide requested IT services",
      "Process and manage consultation bookings",
      "Improve our website and services based on usage patterns",
      "Send relevant communications about our services (with your consent)",
    ],
  },
  {
    title: "3. Cookies",
    content: "Our website uses cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how visitors use our website, remember your preferences, and improve overall site performance. You can control cookie settings through your browser preferences. Disabling cookies may affect certain website functionalities.",
    items: [],
  },
  {
    title: "4. Third-Party Links",
    content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party websites you visit through links on our site.",
    items: [],
  },
  {
    title: "5. Data Protection",
    content: "We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security of your data.",
    items: [],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        badge="Legal Information"
        title="Our Privacy Commitment to "
        highlightedWord="Data Security"
        description="Learn how we collect, use, and protect your information at BKNETWORK SERVICES PVT. LTD."
        breadcrumb={[{ label: "Privacy Policy", href: "/privacy-policy" }]}
      />

      <section className="py-20 lg:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-foreground/10 overflow-hidden shadow-xl">
            {sections.map((section, i) => (
              <div key={section.title} className={`p-8 lg:p-12 ${i > 0 ? 'border-t border-foreground/10' : ''}`}>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="text-foreground/60 leading-relaxed mb-4">{section.content}</p>
                {section.items.length > 0 && (
                  <ul className="space-y-3 mt-4">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5BAFF] mt-2 shrink-0" />
                        <span className="text-foreground/60 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="p-8 lg:p-12 border-t border-foreground/10 bg-gradient-to-br from-[#0B1121]/5 to-transparent">
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                6. Contact Us
              </h2>
              <p className="text-foreground/60 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href={`mailto:${COMPANY.email}`} className="text-[#60A5FA] font-semibold hover:underline">
                  {COMPANY.email}
                </a>{" "}
                or call us at{" "}
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
