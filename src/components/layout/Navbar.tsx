'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Info, Lightbulb, Wrench, Handshake, Mail, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: Info },
  { href: '/solutions', label: 'Solutions', icon: Lightbulb },
  { href: '/services', label: 'Services', icon: Wrench },
  { href: '/partners', label: 'Partners', icon: Handshake },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <motion.nav
          animate={{
            scale: isScrolled ? 0.97 : 1,
            y: isScrolled ? -2 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-2xl border border-white/30 shadow-lg shadow-white/10"
          style={{ WebkitBackdropFilter: 'blur(32px)', backdropFilter: 'blur(32px)', background: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-center gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mr-1">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/logo.png"
                  alt="BKNETWORK"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
              </motion.div>
              <span className="text-[#F8FAFC] font-display font-bold text-sm hidden lg:inline tracking-tight">
                BK<span className="text-[#60A5FA]">NETWORK</span>
              </span>
            </Link>

            {/* Divider */}
            <div className="w-px h-6 bg-[#64748B]/20 hidden md:block mx-1" />

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;

                return (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-3 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'text-[#F8FAFC]'
                          : 'text-[#E2E8F0] hover:text-[#F8FAFC] hover:bg-[#0F172A]/60'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavPill"
                          className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/50 to-[#C5BAFF]/50 rounded-full -z-10 border border-white/60"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <div className="flex items-center gap-1.5">
                        <Icon className="h-3.5 w-3.5" />
                        <span className="text-xs font-semibold whitespace-nowrap">{link.label}</span>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Get Started CTA */}
            <div className="hidden md:block ml-2">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-4 py-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#C5BAFF] text-[#F8FAFC] text-xs font-bold overflow-hidden transition-all hover:shadow-lg hover:shadow-[#9EC6F3]/40 border border-white/60"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.button>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#F8FAFC] p-2 hover:bg-[#0F172A]/60 rounded-full transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.nav>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-20 left-4 right-4 z-40 md:hidden"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl p-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1.5 transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#3B82F6] to-[#C5BAFF] text-[#F8FAFC] border border-white/60'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F172A]/60'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-semibold">{link.label}</span>
                  </motion.div>
                </Link>
              );
            })}
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <motion.div
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#C5BAFF] text-[#F8FAFC] font-bold text-sm border border-white/60"
              >
                Get Started
              </motion.div>
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
