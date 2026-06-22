export interface ProjectHighlight {
  emphasis: string;
  text: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  num:   string;
  env:   string;
  date:  string;
  title: string;
  tagline: string;
  highlights: ProjectHighlight[];
  stack: string[];
  links?: ProjectLink[];
  mediaLink?: string;
  cardImage?: string; // path relative to /public
  detailImage?: string; // path relative to /public
  detailImageMobile?: string; // path relative to /public
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
    links: [
      { label: "Company Site", url: "https://www.quarrylink.com.au/" },
    ],
    mediaLink: "https://www.quarrylink.com.au/",
    cardImage: "/images/quarrylink-card.png",
    detailImage: "/images/quarrylink-detail-portrait.png",
    detailImageMobile: "/images/quarrylink-detail-landscape.png",
  },
  {
    num:   "02",
    env:   "FULL_STACK_PLATFORM",
    date:  "2026.04-PRESENT",
    title: "PetBoard",
    tagline: "Full-stack pet boarding management platform for bookings, pets, invoices, and operations.",
    highlights: [
      {
        emphasis: "Operational workflow platform:",
        text: "Built a pet boarding management system covering customers, pet profiles, bookings, check-in and check-out status, invoices, and dashboard-level operational metrics.",
      },
      {
        emphasis: "Modern typed frontend stack:",
        text: "Implemented the frontend with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and a component stack based on shadcn/ui, Radix UI, TanStack Query, TanStack Table, React Hook Form, Zod, and Zustand.",
      },
      {
        emphasis: "Spring Boot service architecture:",
        text: "Backed the platform with Java 21, Spring Boot, Spring Data JPA, PostgreSQL, Liquibase, and OpenAPI-driven backend APIs for business workflows and data management.",
      },
      {
        emphasis: "Cloud deployment foundation:",
        text: "Containerized the system with Docker and Docker Compose, then provisioned AWS infrastructure with Terraform targeting ECS Fargate, ALB, RDS PostgreSQL, Secrets Manager, CloudWatch Logs, and GitHub OIDC.",
      },
    ],
    stack: ["NEXT.JS", "REACT", "TYPESCRIPT", "SPRING BOOT", "POSTGRESQL", "AWS"],
    links: [
      { label: "Frontend Repo", url: "https://github.com/jiangzegege123/petboard-next" },
      { label: "Backend Repo", url: "https://github.com/jiangzegege123/petboard-service" },
    ],
    cardImage: "/images/petboard-card.png",
    detailImage: "/images/petboard-detail-portrait.png",
    detailImageMobile: "/images/petboard-detail-landscape.png",
  },
  {
    num:   "03",
    env:   "COMMERCIAL_PLATFORM",
    date:  "2025.11-2026.02",
    title: "Zendulge",
    tagline: "Full-stack local services, deals, bookings, and payment platform built across separate React and Express applications.",
    highlights: [
      {
        emphasis: "Commercial full-stack platform:",
        text: "Contributed three months of development to an unreleased commercial local-services platform supporting customer deal discovery, bookings, payments, merchant operations, and superadmin workflows.",
      },
      {
        emphasis: "Frontend feature delivery:",
        text: "Developed and maintained React 19, TypeScript, Vite, Tailwind CSS 4, Radix UI, React Hook Form, Zod, Axios, and React Router 7 functionality across customer, merchant, onboarding, and admin user flows.",
      },
      {
        emphasis: "Backend API integration:",
        text: "Implemented and integrated Node.js, Express, TypeScript, MongoDB, and Mongoose REST APIs covering authentication, user management, business operations, deals, services, appointments, and platform administration.",
      },
      {
        emphasis: "Payments, storage, and email:",
        text: "Contributed to Stripe checkout and transaction workflows, AWS S3 file upload support, AWS SES automated email delivery, and related backend service-layer integration work.",
      },
      {
        emphasis: "Multi-role product workflows:",
        text: "Worked across Customer, Business Owner, Manager, Employee, and Superadmin roles, including merchant onboarding, business review, service and deal management, appointments, customers, categories, platform revenue, backups, and feature flags.",
      },
      {
        emphasis: "Engineering quality and delivery:",
        text: "Built reusable UI components, validation logic, API service layers, and data models while participating in debugging, testing, code reviews, Agile sprint activities, GitHub Actions CI/CD work, and Docker-based development workflows.",
      },
    ],
    stack: ["REACT", "TYPESCRIPT", "NODE.JS", "EXPRESS", "MONGODB", "STRIPE", "AWS", "VITE"],
    cardImage: "/images/zendulge-card.png",
    detailImage: "/images/zendulge-detail-portrait.png",
    detailImageMobile: "/images/zendulge-detail-landscape.png",
  },
  {
    num:   "04",
    env:   "PERSONAL_PORTFOLIO",
    date:  "2026.02-PRESENT",
    title: "JohnnyPage",
    tagline: "Interactive developer portfolio built with modern Next.js, motion, and 3D scene transitions.",
    highlights: [
      {
        emphasis: "Single-page portfolio experience:",
        text: "Built a portfolio site with distinct Home, Projects, and About views, using animated transitions and a custom visual system instead of a template-style landing page.",
      },
      {
        emphasis: "3D and motion-driven interface:",
        text: "Integrated a dynamic Three.js background with view-based camera and composition changes to give each section a more immersive identity.",
      },
      {
        emphasis: "Interactive project showcase:",
        text: "Implemented clickable project cards, responsive detail modals, adaptive image layouts, external links, and richer project storytelling for portfolio case studies.",
      },
      {
        emphasis: "Modern frontend foundation:",
        text: "Built the app with Next.js 16, React 19, TypeScript, Tailwind CSS 4, Three.js, and modular client components for navigation, animated labels, and view-specific UI blocks.",
      },
    ],
    stack: ["NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND", "THREE.JS"],
    links: [
      { label: "GitHub Repo", url: "https://github.com/jiangzegege123/JohnnyPage" },
    ],
    cardImage: "/images/johnnypage-detail-landscape.png",
    detailImage: "/images/johnnypage-detail-portrait.png",
    detailImageMobile: "/images/johnnypage-detail-landscape.png",
  },
];
