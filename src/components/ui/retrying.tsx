"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatItem { value: string; label: string }
interface Crumb    { label: string; href: string }

interface GravitationalMeshHeroProps {
  badge?:          string;
  title:           string;
  highlightedWord?: string;
  description:     string;
  primaryCTA?:   { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  stats?:   StatItem[];
  breadcrumb?: Crumb[];
}

// ─── Canvas 2D gravitational mesh (no WebGL) ─────────────────────────────────

const MeshCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLS = 22;
    const ROWS = 14;
    const WARP_R  = 180;
    const WARP_S  = 38;

    type Pt = { bx: number; by: number; x: number; y: number };
    let pts: Pt[][] = [];
    let t = 0;
    let raf: number;
    const mouse = { x: -9999, y: -9999, sx: -9999, sy: -9999 };

    const buildGrid = () => {
      pts = [];
      const W = canvas.width, H = canvas.height;
      for (let r = 0; r <= ROWS; r++) {
        const row: Pt[] = [];
        for (let c = 0; c <= COLS; c++) {
          const bx = (c / COLS) * W;
          const by = (r / ROWS) * H;
          row.push({ bx, by, x: bx, y: by });
        }
        pts.push(row);
      }
    };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      buildGrid();
    };
    resize();

    const onMove  = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = ()              => { mouse.x = -9999;     mouse.y = -9999; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout",  onLeave);
    window.addEventListener("resize",    resize);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      t += 0.012;
      mouse.sx += (mouse.x - mouse.sx) * 0.06;
      mouse.sy += (mouse.y - mouse.sy) * 0.06;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update positions
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const p = pts[r][c];
          const wave = Math.sin(c * 0.55 + t * 0.9) * 6 + Math.cos(r * 0.7 + t * 0.7) * 5;
          const dx = p.bx - mouse.sx, dy = p.by - mouse.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let wx = 0, wy = 0;
          if (dist < WARP_R && dist > 0) {
            const force = (1 - dist / WARP_R) ** 2;
            wx = -dx * force * (WARP_S / dist);
            wy = -dy * force * (WARP_S / dist);
          }
          p.x = p.bx + wx;
          p.y = p.by + wave + wy;
        }
      }

      const drawLine = (ax: number, ay: number, bx: number, by: number, mx: number, my: number) => {
        const dx = ax - mx, dy = ay - my;
        const d  = Math.sqrt(dx * dx + dy * dy);
        const g  = d < WARP_R ? (1 - d / WARP_R) : 0;
        ctx.strokeStyle = g > 0.15
          ? `rgba(196,181,253,${0.08 + g * 0.38})`
          : `rgba(59,130,246,${0.07 + g * 0.15})`;
        ctx.lineWidth = 0.7 + g * 0.7;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      };

      // Horizontal lines
      for (let r = 0; r <= ROWS; r++)
        for (let c = 0; c < COLS; c++)
          drawLine(pts[r][c].x, pts[r][c].y, pts[r][c+1].x, pts[r][c+1].y, mouse.sx, mouse.sy);

      // Vertical lines
      for (let c = 0; c <= COLS; c++)
        for (let r = 0; r < ROWS; r++)
          drawLine(pts[r][c].x, pts[r][c].y, pts[r+1][c].x, pts[r+1][c].y, mouse.sx, mouse.sy);

      // Glow dots near cursor
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const p = pts[r][c];
          const dx = p.x - mouse.sx, dy = p.y - mouse.sy;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < WARP_R * 0.55) {
            const v = (1 - d / (WARP_R * 0.55)) ** 2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5 + v * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(186,230,253,${v * 0.85})`;
            ctx.fill();
          }
        }
      }
    };

    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout",  onLeave);
      window.removeEventListener("resize",    resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 z-0 w-full h-full pointer-events-none" />;
};

// ─── Character animation helpers ─────────────────────────────────────────────

const Char = ({ char, delay }: { char: string; delay: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 48 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay, ease: [0.2, 0.65, 0.3, 0.9] }}
    style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}
  >
    {char}
  </motion.span>
);

const AnimChars = ({ text, startDelay, className }: { text: string; startDelay: number; className?: string }) => {
  const lines = text.split("\n");
  let charCount = 0;
  return (
    <>
      {lines.map((line, li) => {
        const lineStart = charCount;
        charCount += line.length;
        return (
          <span key={li} className={`block ${className ?? ""}`}>
            {line.split("").map((ch, i) => (
              <Char key={i} char={ch} delay={startDelay + (lineStart + i) * 0.04} />
            ))}
          </span>
        );
      })}
    </>
  );
};

// ─── Main hero component ──────────────────────────────────────────────────────

export const GravitationalMeshHero = ({
  badge,
  title,
  highlightedWord,
  description,
  primaryCTA,
  secondaryCTA,
  stats,
  breadcrumb,
}: GravitationalMeshHeroProps) => {
  const titleParts = highlightedWord ? title.split(highlightedWord) : null;
  const part1 = titleParts?.[0].trim() ?? "";
  const part2 = titleParts?.[1]?.trim() ?? "";

  // Calculate when each section of the title finishes so next can follow
  const p1Delay   = 0.5;
  const hlDelay   = p1Delay  + part1.length  * 0.04 + 0.08;
  const p2Delay   = hlDelay  + (highlightedWord?.length ?? 0) * 0.04 + 0.08;
  const afterTitle = (part2 ? p2Delay + part2.length * 0.04 : hlDelay + (highlightedWord?.length ?? 0) * 0.04) + 0.2;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20">
      <MeshCanvas />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">

        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-sm text-[#F8FAFC]/50 mb-6"
          >
            <Link href="/" className="hover:text-[#F8FAFC] transition-colors">Home</Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3" />
                <Link href={crumb.href} className="hover:text-[#F8FAFC] transition-colors">{crumb.label}</Link>
              </span>
            ))}
          </motion.nav>
        )}

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "backOut" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/25 mb-8 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 text-[#60A5FA]" />
            <span className="text-sm font-semibold text-[#F8FAFC] uppercase tracking-wider">{badge}</span>
          </motion.div>
        )}

        {/* Title — character-by-character */}
        <div
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6 leading-tight"
          style={{ textShadow: "0 0 80px rgba(59,130,246,0.2)" }}
        >
          {titleParts ? (
            <>
              {part1 && (
                <AnimChars text={part1} startDelay={p1Delay} className="text-[#F8FAFC]" />
              )}
              <AnimChars
                text={highlightedWord!}
                startDelay={hlDelay}
                className="bg-gradient-to-r from-[#60A5FA] via-[#C5BAFF] to-[#BAE6FD] bg-clip-text text-transparent animate-gradient"
              />
              {part2 && (
                <AnimChars text={part2} startDelay={p2Delay} className="text-[#F8FAFC]" />
              )}
            </>
          ) : (
            <AnimChars text={title} startDelay={p1Delay} className="text-[#F8FAFC]" />
          )}
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: afterTitle, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-lg text-[#F8FAFC]/70 mb-10 leading-relaxed font-light"
        >
          {description}
        </motion.p>

        {/* CTAs */}
        {(primaryCTA || secondaryCTA) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: afterTitle + 0.25, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {primaryCTA && (
              <Link href={primaryCTA.href}>
                <button className="group px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#C5BAFF] text-[#F8FAFC] font-bold rounded-full shadow-xl shadow-[#9EC6F3]/30 border border-white/60 hover:shadow-[#9EC6F3]/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto sm:mx-0">
                  {primaryCTA.label}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            )}
            {secondaryCTA && (
              <Link href={secondaryCTA.href}>
                <button className="px-8 py-4 border border-white/50 bg-white/10 backdrop-blur-sm text-[#F8FAFC] font-bold rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2 mx-auto sm:mx-0">
                  {secondaryCTA.label}
                </button>
              </Link>
            )}
          </motion.div>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: afterTitle + 0.5, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-1">{stat.value}</div>
                <div className="text-sm text-[#F8FAFC]/60 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: afterTitle + 0.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[#60A5FA]/40 rounded-full flex items-start justify-center p-2 bg-white/10 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-[#60A5FA] rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default GravitationalMeshHero;
