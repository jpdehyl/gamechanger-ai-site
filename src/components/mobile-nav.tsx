"use client";

import { useEffect, useRef } from "react";

type Link = { label: string; href: string };

export function MobileNav({ links }: { links: readonly Link[] }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const link = target?.closest("a");
      const details = ref.current;
      if (!details?.open) return;
      if (link && details.contains(link)) {
        details.open = false;
      }
    }
    function onHash() {
      const details = ref.current;
      if (details?.open) details.open = false;
    }
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return (
    <details ref={ref} className="nav-mobile" aria-label="Sections">
      <summary aria-label="Open menu">
        <span className="bar" aria-hidden="true" />
        <span className="bar" aria-hidden="true" />
        <span className="bar" aria-hidden="true" />
      </summary>
      <nav className="nav-mobile-panel" aria-label="Sections">
        {links.map((link) => (
          <a className="nav-mobile-link" href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
        <a className="nav-mobile-link is-book" href="#cta" data-booker="">
          <span className="dot" />
          Book a session
        </a>
      </nav>
    </details>
  );
}
