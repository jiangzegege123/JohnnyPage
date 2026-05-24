"use client";

import { useEffect, useRef, useState } from "react";

type View = "home" | "projects" | "about";

interface NavItem {
  id: View;
  label: string;
}

interface Props {
  items: NavItem[];
  activeView: View;
  onViewChange: (view: View) => void;
}

export default function Navbar({ items, activeView, onViewChange }: Props) {
  const [indicator, setIndicator] = useState({ width: 0, transform: "translateX(0)" });

  const pillRef  = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Re-measure whenever activeView or label list changes
  useEffect(() => {
    const idx    = items.findIndex((n) => n.id === activeView);
    const itemEl = itemRefs.current[idx];
    const pillEl = pillRef.current;
    if (!itemEl || !pillEl) return;

    const ir = itemEl.getBoundingClientRect();
    const pr = pillEl.getBoundingClientRect();
    setIndicator({
      width:     ir.width,
      transform: `translateX(${ir.left - pr.left - 4}px)`,
    });
  }, [activeView, items]);

  return (
    <nav className="absolute bottom-10 w-full flex justify-center pointer-events-auto">
      <div className="nav-pill" ref={pillRef}>
        <div
          className="nav-indicator"
          style={{ width: indicator.width, transform: indicator.transform }}
        />
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => { itemRefs.current[i] = el; }}
            className={`nav-item${activeView === item.id ? " active" : ""}`}
            onClick={() => onViewChange(item.id)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </nav>
  );
}
