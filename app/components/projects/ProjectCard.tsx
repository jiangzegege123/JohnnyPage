import Image from "next/image";
import { type Project } from "../../data/projects";

interface Props {
  project: Project;
}

export default function ProjectCard({ project: p }: Props) {
  return (
    <div className="glass-panel project-card">
      {/* Ghost number watermark */}
      <div className="absolute -top-5 -right-5 text-[120px] font-black text-white/[0.02] leading-none pointer-events-none select-none">
        {p.num}
      </div>

      {/* Cover image */}
      {p.image && (
        <div className="absolute inset-0 rounded-[12px] overflow-hidden pointer-events-none">
          <Image
            src={p.image}
            alt={p.title}
            fill
            className="object-cover opacity-20"
          />
        </div>
      )}

      {/* Env / date */}
      <div className="flex justify-between text-[10px] font-medium text-muted tracking-[0.05em]">
        <span>{p.env}</span>
        <span>{p.date}</span>
      </div>

      {/* Title + stack */}
      <div>
        <h3 className="text-xl font-extrabold tracking-[-0.02em] mb-2 text-white">
          {p.title}
        </h3>
        <div className="text-[10px] text-muted flex gap-3">
          {p.stack.map((s) => (
            <span key={s} className="square-bullet">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
