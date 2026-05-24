export interface Project {
  num:   string;
  env:   string;
  date:  string;
  title: string;
  stack: string[];
  image?: string; // path relative to /public, e.g. "/images/quantum-dash.png"
}

export const PROJECTS: Project[] = [
  {
    num:   "01",
    env:   "PROD_ENV",
    date:  "2024.10",
    title: "Quantum Dash",
    stack: ["REACT", "THREE.JS"],
    image: "/images/quantum-dash.png",
  },
  {
    num:   "02",
    env:   "STAGING",
    date:  "2024.08",
    title: "Neural Net Viz",
    stack: ["D3.JS", "WEBGL"],
    image: "/images/neural-net-viz.png",
  },
  {
    num:   "03",
    env:   "INTERNAL",
    date:  "2024.05",
    title: "Court Tracker",
    stack: ["NODE", "POSTGRES"],
    image: "/images/court-tracker.png",
  },
  {
    num:   "04",
    env:   "ARCHIVE",
    date:  "2023.11",
    title: "Asset Pipeline",
    stack: ["PYTHON", "AWS"],
    image: "/images/asset-pipeline.png",
  },
];
