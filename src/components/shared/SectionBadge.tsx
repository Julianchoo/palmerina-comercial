export function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20 mb-4">
      {children}
    </span>
  );
}
