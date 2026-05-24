// Output — horizontally scrollable project cards

import { PROJECTS } from "../../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsView() {
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  };

  return (
    <div className="absolute bottom-[15%] w-full px-[5vw] flex flex-col gap-5">
      <div className="projects-header">LATEST PROJECTS</div>

      <div className="carousel-track" onWheel={onWheel}>
        {PROJECTS.map((p) => (
          <ProjectCard key={p.num} project={p} />
        ))}
      </div>
    </div>
  );
}
