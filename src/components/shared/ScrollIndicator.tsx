"use client";

import { useEffect, useState } from "react";

export function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handler = () => {
      if (window.pageYOffset > 100) setVisible(false);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  return (
    <div
      data-scroll-indicator
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 text-sm transition-opacity duration-500"
    >
      <span>Deslizá para explorar</span>
      <div
        className="w-6 h-6 border-2 border-white/70 border-t-transparent border-l-transparent rotate-45"
        style={{ animation: "bounce-slow 2s infinite" }}
      />
    </div>
  );
}
