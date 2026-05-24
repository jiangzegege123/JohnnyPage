"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import AboutView from "./components/AboutView";
import HomeView from "./components/HomeView";
import HudBar from "./components/HudBar";
import Navbar from "./components/Navbar";
import ProjectsView from "./components/ProjectsView";

const WebGLBackground = dynamic(
  () => import("./components/WebGLBackground"),
  { ssr: false },
);

type View = "home" | "projects" | "about";

const NAV_ITEMS: { id: View; label: string }[] = [
  { id: "home",     label: "Dashboard" },
  { id: "projects", label: "Projects"  },
  { id: "about",    label: "About Me"  },
];

export default function PortfolioPage() {
  const [activeView, setActiveView] = useState<View>("home");

  return (
    <div className="fixed inset-0 overflow-hidden bg-void">

      <WebGLBackground activeView={activeView} />

      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col">

        <HudBar />

        {/* Views */}
        <main className="grow relative w-full h-full flex items-center justify-center">
          <section className={`view${activeView === "home"     ? " active" : ""}`}><HomeView /></section>
          <section className={`view${activeView === "projects" ? " active" : ""}`}><ProjectsView /></section>
          <section className={`view${activeView === "about"    ? " active" : ""}`}><AboutView /></section>
        </main>

        {/* Bottom nav — indicator width auto-adapts to label length */}
        <Navbar
          items={NAV_ITEMS}
          activeView={activeView}
          onViewChange={setActiveView}
        />

      </div>
    </div>
  );
}
