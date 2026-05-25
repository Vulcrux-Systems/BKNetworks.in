"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isText?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export interface ContactItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
}

export interface FooterProps {
  brandName?: string;
  brandBackgroundText?: React.ReactNode;
  brandDescription?: React.ReactNode;
  ctaText?: string;
  ctaLink?: string;
  socialLinks?: SocialLink[];
  columns?: FooterColumn[];
  contactItems?: ContactItem[];
  creatorName?: string;
  creatorUrl?: string;
  brandLogo?: React.ReactNode;
  className?: string;
}

export const Footer = ({
  brandName = "YourBrand",
  brandBackgroundText,
  brandDescription,
  ctaText,
  ctaLink,
  socialLinks = [],
  columns = [],
  contactItems = [],
  creatorName,
  creatorUrl,
  brandLogo,
  className,
}: FooterProps) => {
  return (
    <section className={cn("relative w-full overflow-hidden", className)}>
      <footer className="border-t bg-background relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-8 relative z-10">

          {/* ── Row 1: Brand  +  3 link columns ── */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8 mb-10">

            {/* Brand */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                {brandLogo}
                <div className="flex flex-col leading-tight">
                  <span className="text-foreground text-sm font-black uppercase tracking-widest">BKNetwork</span>
                  <span className="text-foreground/50 text-[11px] font-semibold uppercase tracking-widest">Services Pvt. Ltd.</span>
                </div>
              </div>

              {brandDescription && (
                <p className="text-foreground/65 text-sm leading-relaxed">{brandDescription}</p>
              )}

              {ctaText && ctaLink && (
                <Link href={ctaLink} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#60A5FA] hover:text-[#93C5FD] transition-colors w-fit">
                  {ctaText} <span className="text-base">→</span>
                </Link>
              )}

              {socialLinks.length > 0 && (
                <div className="flex gap-2.5">
                  {socialLinks.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-foreground/45 hover:text-foreground hover:border-white/25 hover:bg-white/10 transition-all duration-200"
                    >
                      {link.icon}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 3 link columns — last one also holds Stay Connected */}
            {columns.slice(0, 3).map((col, ci) => {
              const isLast = ci === columns.slice(0, 3).length - 1;
              return (
                <div key={ci} className="flex flex-col gap-4">
                  <h4 className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.18em]">
                    {col.title}
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {col.links.map((link, li) => (
                      <li key={li}>
                        <Link
                          href={link.href}
                          className="text-foreground/55 text-sm font-medium hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Stay Connected sits below Legal */}
                  {isLast && contactItems.length > 0 && (
                    <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-white/8">
                      <h4 className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.18em]">
                        Stay Connected
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {contactItems.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="shrink-0 mt-0.5 text-[#60A5FA]">{item.icon}</span>
                            {item.href ? (
                              <Link
                                href={item.href}
                                className="text-foreground/55 text-sm font-medium hover:text-foreground transition-colors leading-snug"
                              >
                                {item.label}
                              </Link>
                            ) : (
                              <span className="text-foreground/55 text-sm font-medium leading-snug">
                                {item.label}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Bottom bar ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-foreground/30 text-center sm:text-left">
              © {new Date().getFullYear()} BKNetwork Services Pvt. Ltd. All rights reserved.
            </p>
            {creatorName && creatorUrl && (
              <Link href={creatorUrl} className="text-xs text-foreground/30 hover:text-foreground/55 transition-colors font-medium">
                Crafted by {creatorName}
              </Link>
            )}
          </div>
        </div>

        {/* Large bg text */}
        <div
          className="bg-gradient-to-b from-foreground/15 via-foreground/8 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-8 font-black tracking-tighter pointer-events-none select-none text-center z-0"
          style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)", maxWidth: "100vw" }}
        >
          {brandBackgroundText ?? brandName.toUpperCase()}
        </div>

        <div className="bg-gradient-to-t from-background/80 via-background/30 to-transparent absolute bottom-0 w-full h-14 z-0 pointer-events-none" />
      </footer>
    </section>
  );
};
