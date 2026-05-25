"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { Server, Shield, Cloud, Zap } from "lucide-react";
import Link from "next/link";
import { DataGridHero } from "@/components/ui/data-grid-hero";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });
  return (
    // @ts-ignore
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      {/* @ts-ignore */}
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.8}>
        {/* @ts-ignore */}
        <MeshDistortMaterial color="#3B82F6" attach="material" distort={0.6} speed={1.5} roughness={0.1} metalness={0.9} />
      </Sphere>
    </Float>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) positions[i] = (Math.random() - 0.5) * 15;
  useFrame((state) => {
    if (particlesRef.current) particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#C5BAFF" transparent opacity={0.6} />
    </points>
  );
}

function ScrollSVGPath({ scrollYProgress }: { scrollYProgress: any }) {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div className="absolute top-0 right-0 md:right-[5%] w-[250px] md:w-[350px] h-full overflow-visible pointer-events-none z-5 opacity-20">
      <svg viewBox="0 0 400 2000" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <motion.path
          d="M200 0 Q150 200 250 400 T200 800 Q100 1000 300 1200 T200 1600 L200 2000"
          stroke="url(#bkGrad)"
          strokeWidth="3"
          fill="none"
          style={{
            pathLength,
            strokeDasharray: 1,
            strokeDashoffset: useTransform(pathLength, (v: number) => 1 - v),
          }}
        />
        <defs>
          <linearGradient id="bkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function HomeHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const features = [
    { icon: Server, label: "Infrastructure" },
    { icon: Shield, label: "Security" },
    { icon: Cloud, label: "Cloud" },
    { icon: Zap, label: "DevOps" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden pt-20"
    >
      <DataGridHero
        background="transparent"
        color="rgba(255,255,255,0.8)"
        opacityMin={0.03}
        opacityMax={0.18}
        pulseEffect={true}
        mouseGlow={true}
        cellSize={40}
        className="z-[1]"
      />


      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} intensity={0.7} color="#A78BFA" />
          <spotLight position={[0, 10, 0]} intensity={0.5} color="#60A5FA" />
          <AnimatedSphere />
          <Particles />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      <motion.div style={{ opacity, scale, y }} className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="absolute inset-0 pointer-events-none">
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              className="absolute"
              style={{ left: `${20 + index * 20}%`, top: `${30 + (index % 2) * 40}%` }}
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 5 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="p-4 rounded-2xl bg-[#0F172A]/80 backdrop-blur-md border border-white/50 shadow-lg shadow-[#9EC6F3]/10">
                <feature.icon className="w-6 h-6 text-[#60A5FA]" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mb-6 relative">
          <motion.div className="relative inline-block" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <motion.div
              className="absolute inset-0 blur-3xl bg-gradient-to-r from-[#3B82F6]/40 to-[#C5BAFF]/40 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F172A]/80 backdrop-blur-sm border border-white/50 shadow-sm"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.span className="w-2 h-2 rounded-full bg-[#60A5FA]" animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-sm font-semibold text-[#F8FAFC] uppercase tracking-wider">Trusted IT Solutions Partner</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="mb-8">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none text-[#F8FAFC] mb-2">
            Empowering
          </h1>
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none bg-gradient-to-r from-[#60A5FA] via-[#A78BFA] to-[#60A5FA] bg-clip-text text-transparent"
            style={{ backgroundSize: "200% 200%", animation: "gradient 5s ease infinite" }}
          >
            Businesses
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none text-[#F8FAFC]">
            with Scalable IT
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="mb-12">
          <motion.p className="text-xl md:text-3xl font-medium text-[#94A3B8] tracking-wide" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }}>
            From{" "}
            <motion.span className="font-semibold text-[#60A5FA]" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>Infrastructure</motion.span>
            {" to "}
            <motion.span className="font-semibold text-[#A78BFA]" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }}>Cloud</motion.span>
            {" to "}
            <motion.span className="font-semibold text-[#9EC6F3]" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, delay: 1, repeat: Infinity }}>AI</motion.span>
          </motion.p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 1.2 }} className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/contact">
            <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="group relative px-10 py-5 bg-gradient-to-r from-[#3B82F6] to-[#C5BAFF] text-[#F8FAFC] rounded-full font-bold text-lg overflow-hidden shadow-xl shadow-[#9EC6F3]/30 border border-white/60">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            </motion.button>
          </Link>
          <Link href="/services">
            <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="px-10 py-5 border border-white/50 bg-[#0F172A]/60 text-[#F8FAFC] rounded-full font-bold text-lg hover:bg-[#0F172A]/80 shadow-lg shadow-[#9EC6F3]/10 transition-colors backdrop-blur-md">
              <span className="flex items-center justify-center gap-2">
                Explore Solutions
                <Server className="w-5 h-5 text-[#60A5FA]" />
              </span>
            </motion.button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2">
            <div className="w-6 h-10 border-2 border-[#60A5FA]/40 rounded-full flex items-start justify-center p-2 bg-white/30 backdrop-blur-sm">
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 bg-[#60A5FA] rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <ScrollSVGPath scrollYProgress={scrollYProgress} />

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
