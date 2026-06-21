export interface ProjectHighlight {
  emphasis: string;
  text: string;
}

export interface Project {
  num:   string;
  env:   string;
  date:  string;
  title: string;
  tagline: string;
  highlights: ProjectHighlight[];
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
      {
        emphasis: "Customer-facing SaaS feature delivery:",
        text:
          "Developed and maintained customer-facing SaaS platform features using React, TypeScript and RESTful APIs, delivering responsive and scalable user experiences across multiple business workflows.",
      },
      {
        emphasis: "60+ Jira tickets delivered:",
        text:
          "Delivered 60+ Jira tickets covering new feature development, workflow enhancements, UI improvements, and defect resolution within Agile sprint cycles.",
      },
      {
        emphasis: "Playwright E2E coverage:",
        text:
          "Developed and maintained Playwright end-to-end test suites covering authentication, search, filtering, pagination, and CRUD workflows, improving regression testing coverage and release confidence.",
      },
      {
        emphasis: "Workflow feature enhancement:",
        text:
          "Implemented and enhanced user-facing functionality including search, filtering, reporting, data management, and operational workflow automation features.",
      },
      {
        emphasis: "REST API integration:",
        text:
          "Integrated frontend applications with backend REST APIs, ensuring reliable data exchange and responsive user experiences across desktop and mobile platforms.",
      },
      {
        emphasis: "50+ defects identified and validated:",
        text:
          "Identified, reproduced, and documented 50+ frontend and integration defects through manual and automated testing, creating Jira tickets and collaborating with frontend and backend developers to validate fixes across multiple releases.",
      },
      {
        emphasis: "60+ pull requests submitted and reviewed:",
        text:
          "Submitted and reviewed 60+ GitHub pull requests, participating in peer reviews and maintaining code quality standards throughout the development lifecycle.",
      },
      {
        emphasis: "Agile, release, and production support:",
        text:
          "Worked within Agile development processes using Jira and GitHub, contributing to sprint planning, release validation, CI/CD activities, and production support.",
      },
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
      {
        emphasis: "Network graph mapping:",
        text: "Mapped network layers and dependencies into a navigable visual graph.",
      },
      {
        emphasis: "Activation overlays:",
        text: "Added activation overlays to compare input behavior across checkpoints.",
      },
      {
        emphasis: "Focused model inspection:",
        text: "Created focused inspection panels for weights, metrics, and anomalies.",
      },
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
      {
        emphasis: "Centralized case timelines:",
        text: "Centralized case timelines, filing states, and assignment ownership.",
      },
      {
        emphasis: "Deadline surfacing:",
        text: "Introduced deadline surfacing for hearings, filings, and escalations.",
      },
      {
        emphasis: "Cross-team handoff:",
        text: "Streamlined cross-team handoff with searchable matter-level history.",
      },
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
      {
        emphasis: "Automated processing flow:",
        text: "Automated ingest, validation, transformation, and publishing steps.",
      },
      {
        emphasis: "Environment-aware deployment:",
        text: "Added environment-aware deployment rules for shared cloud storage.",
      },
      {
        emphasis: "Job observability:",
        text: "Improved observability around failed jobs and retry behavior.",
      },
    ],
    stack: ["PYTHON", "AWS"],
    cardImage: "/images/asset-pipeline.png",
    detailImage: "/images/asset-pipeline.png",
  },
];
