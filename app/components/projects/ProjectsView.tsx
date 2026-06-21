// Output — horizontally scrollable project cards with detail modal

import Image from "next/image";
import { useEffect, useState, useEffectEvent } from "react";
import { PROJECTS } from "../../data/projects";
import { type Project } from "../../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsView() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const handleEscape = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedProject]);

  return (
    <div className="relative h-full w-full">
      <div className="absolute bottom-[15%] w-full px-[5vw] flex flex-col gap-5">
        <div className="projects-header">LATEST PROJECTS</div>

        <div className="carousel-track" onWheel={onWheel}>
          {PROJECTS.map((p) => (
            <ProjectCard
              key={p.num}
              project={p}
              onOpen={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="glass-panel project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={closeModal}
              aria-label="Close project details"
            >
              CLOSE
            </button>

            <div className="project-modal-media">
              {selectedProject.image && (
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover opacity-70"
                  sizes="(max-width: 900px) 100vw, 42vw"
                />
              )}
              <div className="project-modal-media-overlay" />
            </div>

            <div className="project-modal-content">
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.08em] text-muted">
                <span>{selectedProject.env}</span>
                <span className="h-1 w-1 rounded-full bg-white/25" />
                <span>{selectedProject.date}</span>
              </div>

              <div className="space-y-3">
                <h2
                  id="project-detail-title"
                  className="text-3xl font-black tracking-[-0.04em] text-white max-md:text-2xl"
                >
                  {selectedProject.title}
                </h2>
                <p className="max-w-[48ch] text-base leading-relaxed text-white/78 max-md:text-sm">
                  {selectedProject.tagline}
                </p>
              </div>

              <p className="max-w-[58ch] text-sm leading-7 text-white/82 max-md:leading-6">
                {selectedProject.overview}
              </p>

              <div className="project-modal-meta">
                <div>
                  <div className="project-modal-label">STACK</div>
                  <div className="project-modal-tags">
                    {selectedProject.stack.map((item) => (
                      <span key={item} className="project-modal-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="project-modal-label">DETAILS</div>
                  <div className="project-modal-list">
                    {selectedProject.highlights.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
