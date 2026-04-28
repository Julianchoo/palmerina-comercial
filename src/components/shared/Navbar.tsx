"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL } from "@/lib/constants";

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  navLinks: NavLink[];
}

export function Navbar({ navLinks }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.pageYOffset > 100);

      const sectionIds = navLinks
        .filter((l) => l.href.startsWith("#"))
        .map((l) => l.href.slice(1));

      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [navLinks]);

  const isAlquiler = pathname === "/alquiler";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-brand-dark/95 shadow-card-lg backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
            La Palmerina
          </Link>

          {/* Page tabs */}
          <div className="hidden md:flex items-center gap-1 bg-white/10 rounded-full px-1 py-1">
            <Link
              href="/"
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                !isAlquiler
                  ? "bg-brand-accent text-white"
                  : "text-white/70 hover:text-white",
              )}
            >
              Inversión
            </Link>
            <Link
              href="/alquiler"
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                isAlquiler
                  ? "bg-brand-accent text-white"
                  : "text-white/70 hover:text-white",
              )}
            >
              Alquiler
            </Link>
          </div>

          {/* Nav links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = link.href.startsWith("#")
                ? activeSection === link.href.slice(1)
                : false;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    isActive ? "text-brand-accent" : "text-white/80 hover:text-white",
                  )}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-brand-accent text-white text-sm font-semibold hover:bg-brand-accent-dark transition-colors duration-200"
            >
              Consultar
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            <div className="w-5 h-0.5 bg-current mb-1 transition-all" />
            <div className="w-5 h-0.5 bg-current mb-1 transition-all" />
            <div className="w-5 h-0.5 bg-current transition-all" />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 bg-brand-dark/95">
            <div className="flex gap-2 mb-4 pt-2">
              <Link
                href="/"
                className={cn(
                  "flex-1 text-center px-3 py-2 rounded-full text-sm font-medium",
                  !isAlquiler ? "bg-brand-accent text-white" : "text-white/70",
                )}
                onClick={() => setMobileOpen(false)}
              >
                Inversión
              </Link>
              <Link
                href="/alquiler"
                className={cn(
                  "flex-1 text-center px-3 py-2 rounded-full text-sm font-medium",
                  isAlquiler ? "bg-brand-accent text-white" : "text-white/70",
                )}
                onClick={() => setMobileOpen(false)}
              >
                Alquiler
              </Link>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-white/80 hover:text-white text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
