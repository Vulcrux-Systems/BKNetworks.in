'use client';

import Image from 'next/image';
import { Mail, Linkedin, Phone, MapPin } from 'lucide-react';
import { Footer as AnimatedFooter } from '@/components/ui/modem-animated-footer';
import { COMPANY, SERVICES } from '@/lib/constants';
import logoImg from '@/assets/logo.png';

const socialLinks = [
  { icon: <Linkedin className="w-4 h-4" />, href: COMPANY.linkedin, label: 'LinkedIn' },
  { icon: <Mail className="w-4 h-4" />, href: `mailto:${COMPANY.email}`, label: 'Email' },
];

const columns = [
  {
    title: 'COMPANY',
    links: [
      { label: 'About Us',  href: '/about' },
      { label: 'Services',  href: '/services' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Partners',  href: '/partners' },
      { label: 'Contact',   href: '/contact' },
    ],
  },
  {
    title: 'SERVICES',
    links: SERVICES.slice(0, 5).map((s) => ({ label: s.title, href: '/services' })),
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy Policy',     href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-conditions' },
    ],
  },
];

const contactItems = [
  {
    icon: <Phone className="w-3.5 h-3.5" />,
    label: COMPANY.phone,
    href: `tel:${COMPANY.phone.replace(/\s/g, '')}`,
  },
  {
    icon: <Mail className="w-3.5 h-3.5" />,
    label: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
  },
  {
    icon: <MapPin className="w-3.5 h-3.5" />,
    label: 'GF-5, 10/17, Addharshila, Sahibabad, Ghaziabad, UP - 201005',
  },
];

export default function Footer() {
  return (
    <AnimatedFooter
      brandName="BKNetwork Services"
      brandLogo={
        <Image
          src={logoImg}
          alt={COMPANY.name}
          width={40}
          height={40}
          className="h-10 w-auto"
        />
      }
      brandBackgroundText={
        <span className="leading-none tracking-tighter">BKNETWORK</span>
      }
      brandDescription={
        <>
          Let&apos;s build something{' '}
          <span className="text-[#60A5FA] font-bold">extraordinary</span>
          {' '}— delivering innovative IT services and strategic technology solutions.
        </>
      }
      ctaText="Start a project"
      ctaLink="/schedule-consultation"
      socialLinks={socialLinks}
      columns={columns}
      contactItems={contactItems}
className="border-t border-[#3B82F6]/20"
    />
  );
}
