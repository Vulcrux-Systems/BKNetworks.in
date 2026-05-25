"use client";

import { useState, FormEvent } from "react";
import {
  User,
  FileText,
  Wrench,
  BarChart3,
  Calendar,
  Info,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";
import {
  REQUIRED_SERVICES,
  PREFERRED_TECHNOLOGIES,
  TARGET_PLATFORMS,
  BUDGET_RANGES,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

const sections = [
  { id: "client", title: "Client Information", icon: User },
  { id: "project", title: "Project Overview", icon: FileText },
  { id: "technical", title: "Technical Requirements", icon: Wrench },
  { id: "scope", title: "Project Scope", icon: BarChart3 },
  { id: "timeline", title: "Timeline & Budget", icon: Calendar },
  { id: "additional", title: "Additional Information", icon: Info },
];

export default function ProjectRequirementsForm() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["client"]));
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [selectedTech, setSelectedTech] = useState<Set<string>>(new Set());
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleChip = (
    value: string,
    set: Set<string>,
    setter: React.Dispatch<React.SetStateAction<Set<string>>>
  ) => {
    setter((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-12 text-center border border-neutral-200 shadow-xl"
      >
        <div className="w-20 h-20 rounded-full theme-grad flex items-center justify-center mx-auto mb-6 shadow-lg">
          <CheckCircle className="w-10 h-10 text-[#F8FAFC]" />
        </div>
        <h3 className="text-3xl font-bold text-neutral-900 mb-4">Requirements Submitted!</h3>
        <p className="text-neutral-500 text-lg">
          Our team will review your requirements and reach out within 24 hours with a detailed proposal.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {sections.map((section) => {
        const isOpen = openSections.has(section.id);
        const Icon = section.icon;
        return (
          <Card key={section.id} className="rounded-2xl overflow-hidden border-neutral-200 bg-white">
            <button
              type="button"
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-neutral-50/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl theme-grad flex items-center justify-center shadow-md">
                  <Icon className="w-5 h-5 text-[#F8FAFC]" />
                </div>
                <span className="text-neutral-900 font-bold text-lg">{section.title}</span>
              </div>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-neutral-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-400" />
              )}
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-8 pt-2 space-y-6">
                    {section.id === "client" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Name *</label>
                          <Input required placeholder="Your name" className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Email *</label>
                          <Input type="email" required placeholder="you@company.com" className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Phone</label>
                          <Input placeholder="01204502546" className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Company</label>
                          <Input placeholder="Company name" className="rounded-xl h-12" />
                        </div>
                        <div className="sm:col-span-2 space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Role</label>
                          <Input placeholder="e.g., CTO, Project Manager" className="rounded-xl h-12" />
                        </div>
                      </div>
                    )}

                    {section.id === "project" && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Project Title *</label>
                          <Input required placeholder="Project name" className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Description</label>
                          <Textarea rows={4} placeholder="Describe your project..." className="rounded-xl p-4 resize-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Objectives</label>
                          <Textarea rows={3} placeholder="Key objectives and goals..." className="rounded-xl p-4 resize-none" />
                        </div>
                      </div>
                    )}

                    {section.id === "technical" && (
                      <div className="space-y-8">
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-neutral-700">Required Services</label>
                          <div className="flex flex-wrap gap-2">
                            {REQUIRED_SERVICES.map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => toggleChip(s, selectedServices, setSelectedServices)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                  selectedServices.has(s)
                                    ? "theme-grad text-[#F8FAFC] border-transparent"
                                    : "bg-neutral-50 border-neutral-100 text-neutral-500 hover:border-neutral-200"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-neutral-700">Preferred Technologies</label>
                          <div className="flex flex-wrap gap-2">
                            {PREFERRED_TECHNOLOGIES.map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => toggleChip(t, selectedTech, setSelectedTech)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                  selectedTech.has(t)
                                    ? "theme-grad text-[#F8FAFC] border-transparent"
                                    : "bg-neutral-50 border-neutral-100 text-neutral-500 hover:border-neutral-200"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-neutral-700">Target Platforms</label>
                          <div className="flex flex-wrap gap-2">
                            {TARGET_PLATFORMS.map((p) => (
                              <button
                                key={p}
                                type="button"
                                onClick={() => toggleChip(p, selectedPlatforms, setSelectedPlatforms)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                  selectedPlatforms.has(p)
                                    ? "theme-grad text-[#F8FAFC] border-transparent"
                                    : "bg-neutral-50 border-neutral-100 text-neutral-500 hover:border-neutral-200"
                                }`}
                              >
                                {p}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === "scope" && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Project Size</label>
                          <Select><SelectTrigger className="rounded-xl h-12"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="small">Small</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="large">Large</SelectItem><SelectItem value="enterprise">Enterprise</SelectItem></SelectContent></Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Team Size</label>
                          <Select><SelectTrigger className="rounded-xl h-12"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="1-5">1-5</SelectItem><SelectItem value="5-15">5-15</SelectItem><SelectItem value="15-50">15-50</SelectItem><SelectItem value="50+">50+</SelectItem></SelectContent></Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Complexity</label>
                          <Select><SelectTrigger className="rounded-xl h-12"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="vhigh">Very High</SelectItem></SelectContent></Select>
                        </div>
                      </div>
                    )}

                    {section.id === "timeline" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-700">Start Date</label>
                            <Input type="date" min={new Date().toISOString().split("T")[0]} className="rounded-xl h-12" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-700">Target Completion</label>
                            <Input type="date" min={new Date().toISOString().split("T")[0]} className="rounded-xl h-12" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-700">Timeline Flexibility</label>
                            <Select><SelectTrigger className="rounded-xl h-12"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="fixed">Fixed</SelectItem><SelectItem value="flexible">Somewhat Flexible</SelectItem><SelectItem value="vflexible">Very Flexible</SelectItem></SelectContent></Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-700">Budget Range</label>
                            <Select><SelectTrigger className="rounded-xl h-12"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{BUDGET_RANGES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Budget Notes</label>
                          <Textarea rows={2} placeholder="Any notes about the budget..." className="rounded-xl p-4 resize-none" />
                        </div>
                      </div>
                    )}

                    {section.id === "additional" && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Existing Infrastructure</label>
                          <Textarea rows={3} placeholder="Describe your current setup..." className="rounded-xl p-4 resize-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Compliance & Security</label>
                          <Textarea rows={2} placeholder="Any compliance standards or security requirements..." className="rounded-xl p-4 resize-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-neutral-700">Additional Notes</label>
                          <Textarea rows={3} placeholder="Anything else we should know..." className="rounded-xl p-4 resize-none" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        );
      })}

      <Button
        type="submit"
        disabled={loading}
        className="btn-grad w-full rounded-xl py-8 text-lg font-bold border-0 shadow-lg"
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Submit Requirements
          </>
        )}
      </Button>
    </form>
  );
}
