import Image from "next/image";
import { type Project } from "../../data/projects";

interface Props {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project: p, onOpen }: Props) {
  const taglineLines = p.tagline.split("\n");

  return (
    <button
      type="button"
      className="glass-panel project-card text-left"
      onClick={() => onOpen(p)}
      aria-label={`Open details for ${p.title}`}
    >
      {/* Ghost number watermark */}
      <div className="absolute -top-5 -right-5 text-[120px] font-black text-white/[0.02] leading-none pointer-events-none select-none">
        {p.num}
      </div>

      {/* Cover image */}
      {p.cardImage && (
        <div className="absolute inset-0 rounded-[12px] overflow-hidden pointer-events-none">
          <Image
            src={p.cardImage}
            alt={p.title}
            fill
            className="project-card-image opacity-20"
          />
        </div>
      )}

      {/* Env / date */}
      <div className="project-card-header flex justify-between text-[10px] font-medium text-muted tracking-[0.05em]">
        <span>{p.env}</span>
        <span>{p.date}</span>
      </div>

      {/* Title + stack */}
      <div className="project-card-body">
        <h3 className="text-xl font-extrabold tracking-[-0.02em] mb-2 text-white">
          {p.title}
        </h3>
        <p className="project-card-tagline mb-3 max-w-[24ch] text-sm leading-relaxed text-white/75">
          {taglineLines.map((line, index) => (
            <span key={`${p.title}-tagline-${line}`}>
              {line}
              {index < taglineLines.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>

      <div className="project-card-stack text-[10px] text-muted">
        {p.stack.slice(0, 6).map((s) => (
          <span key={s} className="square-bullet">{s}</span>
        ))}
      </div>
    </button>
  );
}
