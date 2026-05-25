"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

interface StatItem {
  value: string
  label: string
}

interface HeroProps {
  eyebrow?: string
  title: string
  highlightedWord?: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
  stats?: StatItem[]
  floatingIconLeft?: ReactNode
  floatingIconRight?: ReactNode
}

export function Hero({
  eyebrow,
  title,
  highlightedWord,
  subtitle,
  ctaLabel,
  ctaHref = "#",
  stats,
  floatingIconLeft,
  floatingIconRight,
}: HeroProps) {
  const titleParts = highlightedWord ? title.split(highlightedWord) : null

  return (
    <section
      id="hero"
      className="relative mx-auto w-full pt-40 px-6 text-center md:px-8 min-h-[calc(100vh-40px)] overflow-hidden rounded-b-xl"
    >
      {/* Grid BG */}
      <div
        className="absolute -z-10 inset-0 opacity-80 h-[600px] w-full bg-[size:6rem_5rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
        }}
      />

      {/* Radial Accent */}
      <div
        className="absolute left-1/2 top-[calc(100%-90px)] lg:top-[calc(100%-150px)] h-[500px] w-[700px] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[140%] -translate-x-1/2 rounded-[100%] animate-fade-up"
        style={{
          background: "radial-gradient(closest-side, #0D47A1 70%, transparent)",
          opacity: 0.7,
        }}
      />

      {/* Floating icons */}
      {floatingIconLeft && (
        <div className="absolute top-24 left-10 hidden md:block animate-float pointer-events-none">
          {floatingIconLeft}
        </div>
      )}
      {floatingIconRight && (
        <div className="absolute bottom-24 right-10 hidden md:block animate-float pointer-events-none" style={{ animationDelay: "1s" }}>
          {floatingIconRight}
        </div>
      )}

      {/* Eyebrow */}
      {eyebrow && (
        <a href="#" className="group inline-block mb-8">
          <span className="text-sm text-[#F8FAFC]/80 mx-auto px-5 py-2 bg-gradient-to-tr from-[#3B82F6]/10 via-[#60A5FA]/5 to-transparent border-[2px] border-[#3B82F6]/20 rounded-3xl w-fit tracking-tight uppercase flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5BAFF] animate-pulse" />
            {eyebrow}
            <ChevronRight className="inline w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1 text-[#60A5FA]" />
          </span>
        </a>
      )}

      {/* Title */}
      <h1 className="animate-fade-in -translate-y-4 text-balance py-6 text-5xl font-black leading-none tracking-tighter opacity-0 sm:text-6xl md:text-7xl lg:text-8xl">
        {titleParts ? (
          <>
            <span className="block text-[#F8FAFC]">{titleParts[0].trim()}</span>
            <span className="block bg-gradient-to-r from-[#3B82F6] via-[#C5BAFF] to-[#9EC6F3] bg-clip-text text-transparent animate-gradient">
              {highlightedWord}
            </span>
            {titleParts[1]?.trim() && (
              <span className="block text-[#F8FAFC]">{titleParts[1].trim()}</span>
            )}
          </>
        ) : (
          <span className="block bg-gradient-to-br from-[#F8FAFC] to-[#F8FAFC]/60 bg-clip-text text-transparent">
            {title}
          </span>
        )}
      </h1>

      {/* Subtitle */}
      <p className="animate-fade-in mb-12 -translate-y-4 text-balance text-lg tracking-tight text-[#F8FAFC]/70 opacity-0 md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
        {subtitle}
      </p>

      {/* CTA */}
      {ctaLabel && (
        <div className="flex justify-center">
          <Button
            asChild
            className="mt-[-20px] w-fit md:w-52 z-20 tracking-tighter text-center text-lg bg-gradient-to-r from-[#3B82F6] to-[#C5BAFF] text-[#F8FAFC] border border-white/60 shadow-xl shadow-[#9EC6F3]/30 hover:shadow-[#9EC6F3]/50 hover:scale-105 transition-all duration-300 rounded-full px-10 py-5 h-auto"
          >
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>
      )}

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div className="animate-fade-up flex flex-wrap justify-center gap-8 md:gap-16 mt-16" style={{ animationDelay: "0.4s" }}>
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-2">{stat.value}</div>
              <div className="text-sm text-[#F8FAFC]/60 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Fade */}
      <div
        className="animate-fade-up relative mt-32 opacity-0 [perspective:2000px] after:absolute after:inset-0 after:z-50"
        style={{ ["--tw-after-content" as string]: '""' }}
      >
        <div className="absolute inset-0 z-50" style={{ background: "linear-gradient(to top, #0D47A1 10%, transparent)" }} />
      </div>
    </section>
  )
}
