"use client";

import { useEffect, useRef, useState } from "react";

export interface Stat {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
}

function useCounterAnimation(target: number, active: boolean, duration = 2000) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!active) return;
    const increment = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplay(target);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return display;
}

function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCounterAnimation(stat.numericValue, active);
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        {active ? `${count.toLocaleString("es-AR")}${stat.suffix}` : `${stat.value}${stat.suffix}`}
      </div>
      <div className="text-white/70 text-sm">{stat.label}</div>
    </div>
  );
}

export function HeroStats({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActive(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-3 gap-4 md:gap-8 mt-10">
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} active={active} />
      ))}
    </div>
  );
}
