import { SiteHeader } from "./SiteHeader";

interface NavbarProps {
  navLinks: { href: string; label: string }[];
}

/** Retains the existing API while using the shared page navigation. */
export function Navbar({ navLinks }: NavbarProps) {
  return <SiteHeader sectionLinks={navLinks} />;
}
