"use client";

import {
  Zap,
  Users,
  Clock,
  Award,
  TrendingUp,
  Lock,
} from "lucide-react";
import { useIntersection } from "@/hooks/useIntersection";

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Cutting-Edge Technology",
    description: "We leverage the latest technologies to deliver innovative solutions that keep you ahead.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Expert Team",
    description: "Our certified professionals bring decades of combined experience across all IT domains.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "24/7 Support",
    description: "Round-the-clock technical support ensuring your operations never miss a beat.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Proven Track Record",
    description: "150+ satisfied clients across corporate and government sectors trust our expertise.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Scalable Solutions",
    description: "Solutions designed to grow with your business, from startups to enterprise scale.",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Enterprise Security",
    description: "Industry-standard security practices protecting your data and infrastructure.",
  },
];

export default function WhyChooseUs() {
  const { ref, isVisible } = useIntersection();

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {features.map((feature, i) => (
        <div
          key={feature.title}
          className={`glass rounded-2xl p-6 card-hover ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
            {feature.icon}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {feature.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
