export interface Project {
  num:   string;
  env:   string;
  date:  string;
  title: string;
  tagline: string;
  overview: string;
  highlights: string[];
  stack: string[];
  image?: string; // path relative to /public, e.g. "/images/quantum-dash.png"
}

export const PROJECTS: Project[] = [
  {
    num:   "01",
    env:   "SAAS_PLATFORM",
    date:  "2026.03-2026.05",
    title: "QuarryLink",
    tagline: "Customer-facing quarry operations SaaS built during a 12-week internship.",
    overview:
      "Built and maintained production-facing SaaS workflows for Socoro Digital Group's QuarryLink platform as a Software Engineer Intern in Sydney. The work focused on responsive frontend delivery, backend API integration, operational workflow improvements, and stronger release confidence through end-to-end test automation.",
    highlights: [
      "Delivered 60+ Jira tickets across feature development, workflow enhancements, UI improvements, and defect resolution in Agile sprint cycles.",
      "Built and maintained Playwright end-to-end coverage for authentication, search, filtering, pagination, and CRUD workflows.",
      "Integrated React and TypeScript frontend features with Java Spring Boot REST APIs, supporting reporting, data management, and operational workflow automation across desktop and mobile experiences.",
    ],
    stack: ["NEXT.JS", "REACT", "TYPESCRIPT", "PLAYWRIGHT", "SPRING BOOT", "AWS"],
  },
  {
    num:   "02",
    env:   "STAGING",
    date:  "2024.08",
    title: "Neural Net Viz",
    tagline: "Interactive model graph explorer for debugging training flows.",
    overview:
      "A visual tool for inspecting neural network architecture, activations, and training behavior. It was shaped for researchers who need to understand model structure without digging through raw tensors and logs.",
    highlights: [
      "Mapped network layers and dependencies into a navigable visual graph.",
      "Added activation overlays to compare input behavior across checkpoints.",
      "Created focused inspection panels for weights, metrics, and anomalies.",
    ],
    stack: ["D3.JS", "WEBGL"],
    image: "/images/neural-net-viz.png",
  },
  {
    num:   "03",
    env:   "INTERNAL",
    date:  "2024.05",
    title: "Court Tracker",
    tagline: "Operational case monitoring for legal workflow teams.",
    overview:
      "An internal platform used to follow case movement, deadlines, and filing status across multiple channels. The main priority was clear status visibility for fast-moving legal operations.",
    highlights: [
      "Centralized case timelines, filing states, and assignment ownership.",
      "Introduced deadline surfacing for hearings, filings, and escalations.",
      "Streamlined cross-team handoff with searchable matter-level history.",
    ],
    stack: ["NODE", "POSTGRES"],
    image: "/images/court-tracker.png",
  },
  {
    num:   "04",
    env:   "ARCHIVE",
    date:  "2023.11",
    title: "Asset Pipeline",
    tagline: "Automation layer for media processing and cloud delivery.",
    overview:
      "A backend-heavy workflow that standardizes asset ingestion, transformation, and deployment. It improved consistency across environments while cutting manual processing time for repeated jobs.",
    highlights: [
      "Automated ingest, validation, transformation, and publishing steps.",
      "Added environment-aware deployment rules for shared cloud storage.",
      "Improved observability around failed jobs and retry behavior.",
    ],
    stack: ["PYTHON", "AWS"],
    image: "/images/asset-pipeline.png",
  },
];
