// Output — horizontally scrollable project cards

const PROJECTS = [
  { num: "01", env: "PROD_ENV", date: "2024.10", title: "Quantum Dash",   stack: ["REACT",  "THREE.JS"] },
  { num: "02", env: "STAGING",  date: "2024.08", title: "Neural Net Viz", stack: ["D3.JS",  "WEBGL"]    },
  { num: "03", env: "INTERNAL", date: "2024.05", title: "Court Tracker",  stack: ["NODE",   "POSTGRES"] },
  { num: "04", env: "ARCHIVE",  date: "2023.11", title: "Asset Pipeline", stack: ["PYTHON", "AWS"]      },
];

interface Props {
  onWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
}

export default function ProjectsView({ onWheel }: Props) {
  return (
    <div className="absolute bottom-[15%] w-full px-[5vw] flex flex-col gap-5">
      <div className="projects-header">LATEST DEPLOYMENTS</div>

      <div className="carousel-track" onWheel={onWheel}>
        {PROJECTS.map((p) => (
          <div key={p.num} className="glass-panel project-card">
            {/* Ghost number watermark */}
            <div className="absolute -top-5 -right-5 text-[120px] font-black text-white/[0.02] leading-none pointer-events-none">
              {p.num}
            </div>

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
        ))}
      </div>
    </div>
  );
}
