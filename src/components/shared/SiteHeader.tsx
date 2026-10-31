"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WHATSAPP_URL } from "@/lib/constants";
import styles from "./site-header.module.css";

interface SiteHeaderProps {
  sectionLinks?: { href: string; label: string }[];
  accountSlot?: ReactNode;
}

const pageLinks = [
  { href: "/", label: "Proyecto" },
  { href: "/alquiler", label: "Alquiler" },
  { href: "/plano", label: "Plano" },
];

export function SiteHeader({ sectionLinks = [], accountSlot }: SiteHeaderProps) {
  const pathname = usePathname();
  const menuId = useId();
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const links = accountSlot && pathname === "/st-thomas"
    ? [...pageLinks, { href: "/st-thomas", label: "St. Thomas" }]
    : pageLinks;

  useEffect(() => {
    if (!open) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <header className={styles.header} data-site-header>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="Paseo La Palmerina, inicio"
          onClick={() => setOpen(false)}
        >
          <span className={styles.brandMark} aria-hidden="true">P</span>
          <span translate="no">LA PALMERINA<small>PASEO COMERCIAL</small></span>
        </Link>

        <button
          ref={toggle}
          type="button"
          className={styles.menuToggle}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen(!open)}
        >
          {open ? "Cerrar" : "Menú"}
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>

        <div id={menuId} className={`${styles.menus} ${open ? styles.menusOpen : ""}`}>
          <nav className={styles.primary} aria-label="Navegación principal">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {sectionLinks.length > 0 && (
            <nav className={styles.sections} aria-label="Secciones de esta página">
              {sectionLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          <div className={styles.actions}>
            {accountSlot ?? (
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.consult}>
                Consultar <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
