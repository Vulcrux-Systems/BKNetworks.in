import type { Metadata } from "next";
import { OFFICES, BUSINESS_HOURS, COMPANY } from "@/lib/constants";
import { Phone, Mail, MapPin, Clock, Linkedin } from "lucide-react";
import ContactForm from "./ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { MessageSquare, HeadphonesIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with BKNetwork Services. Call us, email us, or fill out our contact form.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Contact Us"
        title="Let's Start a "
        highlightedWord="Conversation"
        description="Have a project in mind or need IT support? Reach out to discuss how BKNetwork can help transform your organization."
        breadcrumb={[{ label: "Contact", href: "/contact" }]}
        stats={[
          { value: "24/7", label: "Support Available" },
          { value: "<2hr", label: "Response Time" },
          { value: "100%", label: "Client Satisfaction" },
        ]}
        floatingIconLeft={<MessageSquare className="w-16 h-16 text-[#F8FAFC]/20" />}
        floatingIconRight={<HeadphonesIcon className="w-20 h-20 text-[#60A5FA]/20" />}
      />

      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-4">
              <div className="mb-2">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  Contact Information
                </h3>
                <p className="text-white/65 leading-relaxed text-sm">
                  Get in touch with our team. We're available to assist you with any inquiries about our solutions.
                </p>
              </div>

              {/* Contact items */}
              <div className="space-y-3">
                {[
                  { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                  { icon: Phone, label: "Phone", value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                  { icon: Linkedin, label: "LinkedIn", value: "BKNetwork Services Pvt. Ltd.", href: COMPANY.linkedin },
                  { icon: MapPin, label: "Headquarters", value: COMPANY.location, href: undefined },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-white/20 hover:border-white/35 transition-all duration-300 relative overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 24px rgba(0,0,0,0.1)' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-2xl" />
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#C5BAFF] flex items-center justify-center shrink-0 shadow-md relative z-10">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-xs font-bold text-white/55 uppercase tracking-widest mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-white font-semibold text-sm hover:text-[#60A5FA] transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-white font-semibold text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Offices */}
              <div className="p-5 rounded-2xl border border-white/20 relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 24px rgba(0,0,0,0.1)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-2xl" />
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#C5BAFF]" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Our Offices</h3>
                </div>
                <div className="space-y-4 relative z-10">
                  {OFFICES.map((office) => (
                    <div key={office.type}>
                      <p className="text-xs font-bold text-[#60A5FA] uppercase tracking-widest mb-1">
                        {office.type}
                      </p>
                      <p className="text-sm text-white/80 leading-relaxed">
                        {office.address}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-5 rounded-2xl border border-white/20 relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 24px rgba(0,0,0,0.1)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-2xl" />
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#C5BAFF]" />
                  <Clock className="w-4 h-4 text-[#60A5FA]" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Business Hours</h3>
                </div>
                <div className="space-y-2.5 relative z-10">
                  {BUSINESS_HOURS.map((bh) => (
                    <div key={bh.day} className="flex justify-between items-center text-sm">
                      <span className="text-white/70">{bh.day}</span>
                      <span className="text-white font-semibold">{bh.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
