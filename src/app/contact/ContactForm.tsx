"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle, User, Mail, Phone, Briefcase } from "lucide-react";
import { SERVICE_OPTIONS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "9e1732ce-57c3-4426-88ad-5c9b6b1223b0");
    formData.append("subject", `New Contact Form — ${formData.get("name") || "Website Visitor"}`);
    formData.append("from_name", "BKNetwork Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full h-11 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-white/55 text-sm px-4 focus:outline-none focus:border-[#60A5FA]/60 focus:bg-white/10 transition-all";
  const labelClass = "flex items-center gap-1.5 text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl p-12 text-center bg-white/5 backdrop-blur-md border border-white/15 shadow-2xl"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#C5BAFF] flex items-center justify-center mx-auto mb-6 shadow-lg">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">Thank You!</h3>
        <p className="text-white/60 text-lg">We've received your message and will get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="rounded-3xl p-8 lg:p-10 space-y-5 border border-white/20 relative overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 32px rgba(0,0,0,0.15)' }}
    >
      {/* Inner top shine */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-3xl" />

      {/* Header */}
      <div className="pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#C5BAFF]" />
          <h3 className="text-xl font-bold text-white">Send us a message</h3>
        </div>
        <p className="text-white/45 text-sm pl-3">Fill out the form and our team will get back to you.</p>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
        <div>
          <label className={labelClass}><User className="w-3 h-3" /> Full Name *</label>
          <input name="name" required placeholder="John Doe" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}><Mail className="w-3 h-3" /> Email Address *</label>
          <input name="email" type="email" required placeholder="john@company.com" className={inputClass} />
        </div>
      </div>

      {/* Phone + Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}><Phone className="w-3 h-3" /> Phone Number</label>
          <input name="phone" placeholder="01204502546" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}><Briefcase className="w-3 h-3" /> Interest Area</label>
          <select
            name="service"
            defaultValue=""
            className={`${inputClass} appearance-none cursor-pointer`}
            style={{ colorScheme: "dark" }}
          >
            <option value="" disabled className="bg-[#0F172A] text-white/40">Select a service</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s.toLowerCase()} className="bg-[#0F172A] text-white">{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>Message *</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project or requirements..."
          className="w-full rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-white/55 text-sm px-4 py-3 focus:outline-none focus:border-[#60A5FA]/60 focus:bg-white/10 transition-all resize-none"
        />
      </div>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#C5BAFF] text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <><Send className="w-4 h-4" /> Send Message</>
        )}
      </button>
    </motion.form>
  );
}
