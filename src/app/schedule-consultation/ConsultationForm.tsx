"use client";

import { useState, FormEvent } from "react";
import { CalendarDays, Clock, CheckCircle, Send, User, Mail, Phone, Briefcase } from "lucide-react";
import { SERVICE_OPTIONS, TIME_SLOTS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function ConsultationForm() {
  const [selectedTime, setSelectedTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    const body = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      service: fd.get("service"),
      date: fd.get("date"),
      time: selectedTime,
      message: fd.get("message"),
    };

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

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
        <h3 className="text-3xl font-bold text-white mb-4">Consultation Scheduled!</h3>
        <p className="text-white/60 text-lg">
          We&apos;ve confirmed your consultation. You&apos;ll receive a confirmation email shortly.
        </p>
      </motion.div>
    );
  }

  const inputClass = "w-full h-11 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-white/30 text-sm px-4 focus:outline-none focus:border-[#60A5FA]/60 focus:bg-white/10 transition-all";
  const labelClass = "text-xs font-semibold text-white/50 uppercase tracking-wider";

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="rounded-3xl p-8 lg:p-10 space-y-8 bg-white/5 backdrop-blur-md border border-white/15 shadow-2xl"
    >
      {/* Section: Contact Info */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-white/10">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#C5BAFF]" />
          <h3 className="text-lg font-bold text-white">Contact Information</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className={labelClass}>
              <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> Full Name *</span>
            </label>
            <input name="name" required placeholder="Your name" className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>
              <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> Email Address *</span>
            </label>
            <input name="email" type="email" required placeholder="you@company.com" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className={labelClass}>
              <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> Phone Number</span>
            </label>
            <input name="phone" placeholder="01204502546" className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>
              <span className="flex items-center gap-1.5"><Briefcase className="w-3 h-3" /> Service of Interest *</span>
            </label>
            <select
              name="service"
              required
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
      </div>

      {/* Section: Schedule Details */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-white/10">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#C5BAFF]" />
          <h3 className="text-lg font-bold text-white">Schedule Details</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className={labelClass}>
              <span className="flex items-center gap-1.5"><CalendarDays className="w-3 h-3" /> Preferred Date *</span>
            </label>
            <input
              name="date"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              className={`${inputClass} cursor-pointer`}
              style={{ colorScheme: "dark" }}
            />
          </div>

          <div className="space-y-1.5">
            <label className={labelClass}>
              <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Preferred Time Slot *</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.slice(0, 4).map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedTime === slot
                      ? "bg-gradient-to-r from-[#3B82F6] to-[#C5BAFF] text-white border-transparent shadow-lg shadow-blue-500/20"
                      : "bg-white/5 border-white/15 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/25"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Message */}
      <div className="space-y-1.5">
        <label className={labelClass}>Additional Message</label>
        <textarea
          name="message"
          rows={3}
          placeholder="Anything specific you'd like to discuss..."
          className="w-full rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-white/30 text-sm px-4 py-3 focus:outline-none focus:border-[#60A5FA]/60 focus:bg-white/10 transition-all resize-none"
        />
      </div>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !selectedTime}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#C5BAFF] text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            Schedule Consultation
          </>
        )}
      </button>
    </motion.form>
  );
}
