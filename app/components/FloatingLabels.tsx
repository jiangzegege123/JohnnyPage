import { SKILLS } from "../data/skills";

export default function FloatingLabels() {
  return (
    <>
      {SKILLS.map((skill) => (
        <div
          key={skill.label}
          className={[
            "absolute glass-panel group",
            "flex flex-col gap-[3px] px-3 py-2",
            // Hover: brighten border + subtle bg glow
            "border border-white/[0.06]",
            "hover:border-white/30 hover:bg-white/[0.08]",
            "hover:shadow-[0_0_24px_rgba(255,255,255,0.07)]",
            "transition-colors duration-300 cursor-default",
            skill.hideOnMobile ? "max-md:hidden" : "",
          ].join(" ")}
          style={{
            ...skill.position,
            animation: `float ${skill.animDuration}s ease-in-out ${skill.animDelay}s infinite`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "running";
          }}
        >
          {/* Label row */}
          <div className="flex items-center gap-[6px]">
            <span className="w-[5px] h-[5px] rounded-full bg-white/25 group-hover:bg-accent flex-shrink-0 transition-colors duration-300" />
            <span className="text-[10px] font-bold tracking-[0.07em] text-white/75 group-hover:text-white uppercase whitespace-nowrap transition-colors duration-300">
              {skill.label}
            </span>
          </div>
          {/* Sub-category */}
          <span className="text-[8px] font-medium tracking-[0.08em] text-muted group-hover:text-white/50 uppercase pl-[11px] transition-colors duration-300">
            {skill.sub}
          </span>
        </div>
      ))}
    </>
  );
}
