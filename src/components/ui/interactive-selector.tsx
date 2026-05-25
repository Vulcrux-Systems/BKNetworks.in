import React, { useState, useEffect } from 'react';
import { Shield, Users, Zap, Heart, Target, Award } from 'lucide-react';

const options = [
  {
    title: "Integrity First",
    description: "Trusted by India's High Courts & Fortune 500",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    icon: Shield,
  },
  {
    title: "Client-Centric",
    description: "Solutions tailored to every unique need",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    icon: Users,
  },
  {
    title: "Innovation Driven",
    description: "Cloud, AI & DevOps — future-ready delivery",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    icon: Zap,
  },
  {
    title: "Long-Term Partnership",
    description: "Lasting relationships, not just projects",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    icon: Heart,
  },
  {
    title: "Precision & Excellence",
    description: "99.9% uptime — meticulous in every detail",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    icon: Target,
  },
  {
    title: "Certified Expertise",
    description: "IBM, Dell, Cisco, Red Hat certified team",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    icon: Award,
  },
];

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 120 * i);
      timers.push(timer);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full">
      {/* Expandable Cards */}
      <div className="flex w-full h-[380px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
        {options.map((option, index) => {
          const Icon = option.icon;
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className="relative overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex flex-col justify-end"
              style={{
                backgroundImage: `url('${option.image}')`,
                backgroundSize: isActive ? 'auto 100%' : 'auto 120%',
                backgroundPosition: 'center',
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-40px)',
                flex: isActive ? '6 1 0%' : '1 1 0%',
                borderRight: index < options.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                willChange: 'flex-grow',
              }}
            >
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0 transition-all duration-700"
                style={{
                  background: isActive
                    ? 'linear-gradient(to top, rgba(10,20,50,0.92) 0%, rgba(10,20,50,0.4) 50%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(10,20,50,0.85) 0%, rgba(10,20,50,0.6) 100%)',
                }}
              />

              {/* Active top accent line */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3B82F6] to-[#C5BAFF]" />
              )}

              {/* Content */}
              <div className="relative z-10 flex items-end gap-3 p-4">
                {/* Icon */}
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-xl border border-white/20 transition-all duration-300"
                  style={{
                    width: 40,
                    height: 40,
                    background: isActive
                      ? 'linear-gradient(135deg, #3B82F6, #C5BAFF)'
                      : 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>

                {/* Text — only visible when active */}
                <div
                  className="overflow-hidden transition-all duration-700"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateX(0)' : 'translateX(20px)',
                    maxWidth: isActive ? '400px' : '0px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div className="text-white font-bold text-base leading-tight">{option.title}</div>
                  <div className="text-white/65 text-xs mt-0.5">{option.description}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {options.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: activeIndex === i ? 20 : 6,
              height: 6,
              background: activeIndex === i
                ? 'linear-gradient(90deg, #3B82F6, #C5BAFF)'
                : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveSelector;
