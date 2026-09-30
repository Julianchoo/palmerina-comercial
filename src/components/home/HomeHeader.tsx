"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "@/app/home.module.css";

const links = [
  { href: "#proyecto", label: "El proyecto" },
  { href: "#espacios", label: "Espacios" },
  { href: "/plano", label: "Plano" },
  { href: "#ubicacion", label: "Entorno" },
  { href: "#contacto", label: "Contacto" },
];

export function HomeHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={styles.header} data-home-header>
      <Link href="/" className={styles.brand} aria-label="Paseo La Palmerina, inicio">
        <span className={styles.brandMark} aria-hidden="true">
          P
        </span>
        <span>
          LA PALMERINA<small>PASEO COMERCIAL</small>
        </span>
      </Link>
      <button
        ref={toggle}
        type="button"
        className={styles.menuToggle}
        aria-expanded={open}
        aria-controls="home-navigation"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen(!open)}
        data-menu-toggle
      >
        <span>{open ? "Cerrar" : "Menú"}</span>
        <span className={styles.menuIcon} aria-hidden="true">
          {open ? "×" : "☰"}
        </span>
      </button>
      <nav
        id="home-navigation"
        className={`${styles.navigation} ${open ? styles.navigationOpen : ""}`}
        aria-label="Navegación principal"
        data-open={open}
      >
        {links.map((link) => (
          <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link href="/alquiler" className={styles.rentalLink} onClick={() => setOpen(false)}>
          Alquileres <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
