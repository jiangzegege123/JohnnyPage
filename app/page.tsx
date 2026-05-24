"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import AboutView from "./components/AboutView";
import HomeView from "./components/HomeView";
import ProjectsView from "./components/ProjectsView";

const WebGLBackground = dynamic(
  () => import("./components/WebGLBackground"),
  { ssr: false },
);

type View = "home" | "projects" | "about";

const NAV_ITEMS: { id: View; label: string }[] = [
  { id: "home",     label: "Engine"   },
  { id: "projects", label: "Output"   },
  { id: "about",    label: "Identity" },
];

export default function PortfolioPage() {
  const [activeView, setActiveView] = useState<View>("home");
  const [time, setTime]             = useState("");
  const [indicator, setIndicator]   = useState({ width: 0, transform: "translateX(0)" });

  const navPillRef  = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Live clock
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", {
        hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit",
      }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Slide nav indicator to the active item
  useEffect(() => {
    const idx    = NAV_ITEMS.findIndex((n) => n.id === activeView);
    const itemEl = navItemRefs.current[idx];
    const pillEl = navPillRef.current;
    if (!itemEl || !pillEl) return;
    const ir = itemEl.getBoundingClientRect();
    const pr = pillEl.getBoundingClientRect();
    setIndicator({
      width:     ir.width,
      transform: `translateX(${ir.left - pr.left - 4}px)`,
    });
  }, [activeView]);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-void">

      <WebGLBackground activeView={activeView} />

      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col">

        {/* Top HUD */}
        <header className="absolute top-0 w-full flex justify-center pt-8">
          <div className="glass-panel hud-bar pointer-events-auto">
            <span>▲ SHANGHAI, CN</span>
            <span>{time}</span>
            <span>■ ACTIVE SESSIONS: 3</span>
            <span className="flex items-center gap-[6px]">
              <span className="status-dot" />
              SYS.01 ONLINE
            </span>
          </div>
        </header>

        {/* Views */}
        <main className="grow relative w-full h-full flex items-center justify-center">
          <section className={`view${activeView === "home"     ? " active" : ""}`}><HomeView /></section>
          <section className={`view${activeView === "projects" ? " active" : ""}`}><ProjectsView onWheel={onWheel} /></section>
          <section className={`view${activeView === "about"    ? " active" : ""}`}><AboutView /></section>
        </main>

        {/* Bottom nav */}
        <nav className="absolute bottom-10 w-full flex justify-center pointer-events-auto">
          <div className="nav-pill" ref={navPillRef}>
            <div
              className="nav-indicator"
              style={{ width: indicator.width, transform: indicator.transform }}
            />
            {NAV_ITEMS.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => { navItemRefs.current[i] = el; }}
                className={`nav-item${activeView === item.id ? " active" : ""}`}
                onClick={() => setActiveView(item.id)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </nav>

      </div>
    </div>
  );
}
