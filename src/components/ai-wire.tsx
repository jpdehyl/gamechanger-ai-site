"use client";

import { useEffect, useState } from "react";
import { marquee as booking } from "@/content/site";

type Status = "fallback" | "fetching" | "live";

export function AiWire() {
  const [items, setItems] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("fetching");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/ai-wire")
      .then((res) => res.json())
      .then((data: { items?: unknown }) => {
        if (cancelled) return;
        if (Array.isArray(data.items) && data.items.length) {
          setItems(data.items.map((i) => String(i)));
          setStatus("live");
        } else {
          setStatus("fallback");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("fallback");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const label =
    status === "live"
      ? "AI Wire · Live"
      : status === "fetching"
        ? "AI Wire · Fetching…"
        : "Booking · Open";

  const entries: Array<{ text: string; wire: boolean }> = [
    ...items.map((text) => ({ text, wire: true })),
    ...booking.map((text) => ({ text, wire: false })),
  ];
  const doubled = [...entries, ...entries];

  return (
    <div className="cta-marquee" aria-hidden="true">
      <div className="cta-marquee-label">
        <span className="dot" />
        <span>{label}</span>
      </div>
      <div className="cta-marquee-mask">
        <div className="cta-marquee-track">
          {doubled.map((entry, i) => (
            <span key={i} className={entry.wire ? "wire" : undefined}>
              {entry.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
