"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";

interface StatItem {
  value: string;
  label: string;
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface AetherFlowHeroProps {
  badge?: string;
  title: string;
  highlightedWord?: string;
  description: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  stats?: StatItem[];
  breadcrumb?: BreadcrumbItem[];
}

export function AetherFlowHero({
  badge,
  title,
  highlightedWord,
  description,
  primaryCTA,
  secondaryCTA,
  stats,
  breadcrumb,
}: AetherFlowHeroProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: null as number | null, y: null as number | null, radius: 180 };

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;

      constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx!.fillStyle = this.color;
        ctx!.fill();
      }

      update() {
        if (this.x > canvas!.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas!.height || this.y < 0) this.directionY = -this.directionY;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 5;
            this.y -= (dy / distance) * force * 5;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    let particles: Particle[] = [];

    function init() {
      particles = [];
      const count = (canvas!.height * canvas!.width) / 9000;
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas!.width - size * 4) + size * 2;
        const y = Math.random() * (canvas!.height - size * 4) + size * 2;
        const dirX = Math.random() * 0.4 - 0.2;
        const dirY = Math.random() * 0.4 - 0.2;
        // Blue-themed particle colors matching the site palette
        const colors = [
          "rgba(96, 165, 250, 0.85)",  // #60A5FA - blue accent
          "rgba(147, 197, 253, 0.7)",  // lighter blue
          "rgba(196, 181, 253, 0.75)", // #C5BAFF - lavender accent
          "rgba(186, 230, 253, 0.6)",  // #BAE6FD - sky blue
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, dirX, dirY, size, color));
      }
    }

    function connect() {
      const threshold = (canvas!.width / 7) * (canvas!.height / 7);
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dist =
            (particles[a].x - particles[b].x) ** 2 +
            (particles[a].y - particles[b].y) ** 2;

          if (dist < threshold) {
            const opacity = 1 - dist / 20000;
            const nearMouse =
              mouse.x !== null &&
              Math.sqrt((particles[a].x - mouse.x) ** 2 + (particles[a].y - mouse.y!) ** 2) < mouse.radius;

            // White lines near mouse, blue lines elsewhere
            ctx!.strokeStyle = nearMouse
              ? `rgba(255, 255, 255, ${opacity * 0.9})`
              : `rgba(96, 165, 250, ${opacity * 0.45})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
      }
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      // Clear with slight transparency for trail effect on top of blue bg
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach((p) => p.update());
      connect();
    }

    const resize = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      init();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseOut);

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fadeUp: Record<string, any> = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.18 + 0.3, duration: 0.8, ease: "easeInOut" },
    }),
  };

  const titleParts = highlightedWord ? title.split(highlightedWord) : null;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Canvas particle field */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">

        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.nav
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-2 text-sm text-[#F8FAFC]/50 mb-6"
          >
            <Link href="/" className="hover:text-[#F8FAFC] transition-colors">Home</Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3" />
                <Link href={crumb.href} className="hover:text-[#F8FAFC] transition-colors">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </motion.nav>
        )}

        {/* Badge */}
        {badge && (
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 text-[#60A5FA]" />
            <span className="text-sm font-semibold text-[#F8FAFC] uppercase tracking-wider">
              {badge}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-none"
        >
          {titleParts ? (
            <>
              <span className="block text-[#F8FAFC]">{titleParts[0].trim()}</span>
              <span className="block bg-gradient-to-r from-[#60A5FA] via-[#C5BAFF] to-[#BAE6FD] bg-clip-text text-transparent animate-gradient">
                {highlightedWord}
              </span>
              {titleParts[1]?.trim() && (
                <span className="block text-[#F8FAFC]">{titleParts[1].trim()}</span>
              )}
            </>
          ) : (
            <span className="block bg-gradient-to-b from-[#F8FAFC] to-[#F8FAFC]/60 bg-clip-text text-transparent">
              {title}
            </span>
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-lg text-[#F8FAFC]/70 mb-10 leading-relaxed font-light"
        >
          {description}
        </motion.p>

        {/* CTAs */}
        {(primaryCTA || secondaryCTA) && (
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
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
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
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

      {/* Bottom scroll hint */}
      <motion.div
        custom={6}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="animate-bounce-scroll flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-[#60A5FA]/40 rounded-full flex items-start justify-center p-2 bg-white/10 backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#60A5FA] rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AetherFlowHero;
