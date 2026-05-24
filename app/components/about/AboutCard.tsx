import Image from "next/image";
import { type AboutSection } from "../../data/about";

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-2 mt-2 text-[11px] uppercase tracking-[0.05em]">
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

export default function AboutCard({ section: s }: { section: AboutSection }) {
  return (
    <div className="glass-panel flex flex-col overflow-hidden">
      {/* Photo strip */}
      {s.image && (
        <div className="relative h-32 w-full flex-shrink-0">
          <Image
            src={s.image}
            alt={s.tag}
            fill
            className="object-cover"
          />
          {/* Gradient fade into card body */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(25,25,28,0.95)]" />
        </div>
      )}

      {/* Card body */}
      <div className="flex flex-col gap-4 p-8 pt-5">
        <h2 className="text-xs text-accent font-semibold tracking-[0.1em] uppercase">
          {s.tag}
        </h2>
        <p className="text-sm leading-relaxed text-[#d0d0d0]">
          {s.body}
        </p>
        {s.stats.map((st) => (
          <StatRow key={st.label} label={st.label} value={st.value} />
        ))}
      </div>
    </div>
  );
}
