export interface Project {
  num:   string;
  env:   string;
  date:  string;
  title: string;
  tagline: string;
  highlights: string[];
  stack: string[];
  link?: string;
  cardImage?: string; // path relative to /public
  detailImage?: string; // path relative to /public
}

export const PROJECTS: Project[] = [
  {
    num:   "01",
    env:   "SAAS_PLATFORM",
    date:  "2026.03-2026.05",
    title: "QuarryLink",
    tagline: "Customer-facing quarry operations SaaS built during a 12-week internship.",
    highlights: [
      "Delivered 60+ Jira tickets across feature development, workflow enhancements, UI improvements, and defect resolution in Agile sprint cycles.",
      "Built and maintained Playwright end-to-end coverage for authentication, search, filtering, pagination, and CRUD workflows.",
      "Integrated React and TypeScript frontend features with Java Spring Boot REST APIs, supporting reporting, data management, and operational workflow automation across desktop and mobile experiences.",
    ],
    stack: ["NEXT.JS", "REACT", "TYPESCRIPT", "PLAYWRIGHT", "SPRING BOOT", "AWS"],
    link: "https://www.quarrylink.com.au/",
    detailImage: "/images/quarrylink-detail.png",
  },
  {
    num:   "02",
    env:   "STAGING",
    date:  "2024.08",
    title: "Neural Net Viz",
    tagline: "Interactive model graph explorer for debugging training flows.",
    highlights: [
      "Mapped network layers and dependencies into a navigable visual graph.",
      "Added activation overlays to compare input behavior across checkpoints.",
      "Created focused inspection panels for weights, metrics, and anomalies.",
    ],
    stack: ["D3.JS", "WEBGL"],
    cardImage: "/images/neural-net-viz.png",
    detailImage: "/images/neural-net-viz.png",
  },
  {
    num:   "03",
    env:   "INTERNAL",
    date:  "2024.05",
    title: "Court Tracker",
    tagline: "Operational case monitoring for legal workflow teams.",
    highlights: [
      "Centralized case timelines, filing states, and assignment ownership.",
      "Introduced deadline surfacing for hearings, filings, and escalations.",
      "Streamlined cross-team handoff with searchable matter-level history.",
    ],
    stack: ["NODE", "POSTGRES"],
    cardImage: "/images/court-tracker.png",
    detailImage: "/images/court-tracker.png",
  },
  {
    num:   "04",
    env:   "ARCHIVE",
    date:  "2023.11",
    title: "Asset Pipeline",
    tagline: "Automation layer for media processing and cloud delivery.",
    highlights: [
      "Automated ingest, validation, transformation, and publishing steps.",
      "Added environment-aware deployment rules for shared cloud storage.",
      "Improved observability around failed jobs and retry behavior.",
    ],
    stack: ["PYTHON", "AWS"],
    cardImage: "/images/asset-pipeline.png",
    detailImage: "/images/asset-pipeline.png",
  },
];
