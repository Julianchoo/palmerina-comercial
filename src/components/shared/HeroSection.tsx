"use client";

import { useEffect, useRef } from "react";
import { ScrollIndicator } from "./ScrollIndicator";
import { HeroStats, type Stat } from "./HeroStats";
import { WhatsAppButton } from "./WhatsAppButton";

interface HeroSectionProps {
  backgroundImage: string;
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  stats: Stat[];
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  page: string;
}

export function HeroSection({
  backgroundImage,
  badge,
  title,
  subtitle,
  stats,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  page,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => {
      const scrolled = window.pageYOffset;
      if (heroRef.current && scrolled < window.innerHeight) {
        heroRef.current.style.backgroundPositionY = `${scrolled * 0.5}px`;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-overlay" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20 pb-32">
        <div
          className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/40 text-brand-accent text-sm font-semibold mb-6"
          style={{ animation: "fade-in-up 0.8s ease-out both" }}
        >
          {badge}
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", animation: "fade-in-up 0.8s ease-out 0.2s both" }}
        >
          {title}
        </h1>

        <p
          className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-8"
          style={{ animation: "fade-in-up 0.8s ease-out 0.4s both" }}
        >
          {subtitle}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animation: "fade-in-up 0.8s ease-out 0.6s both" }}
        >
          <WhatsAppButton label="Consultar por WhatsApp" page={page} source="hero-cta" />
          <a
            href={ctaSecondaryHref}
            className="px-6 py-3 rounded-full border-2 border-white/50 text-white font-semibold hover:bg-white/10 transition-colors duration-200"
          >
            {ctaSecondaryLabel}
          </a>
        </div>

        <div style={{ animation: "fade-in-up 0.8s ease-out 0.8s both" }}>
          <HeroStats stats={stats} />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
