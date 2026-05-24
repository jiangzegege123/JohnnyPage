// Identity — two-column about panel with origin and discipline stats

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-2 mt-2 text-[11px] uppercase tracking-[0.05em]">
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

export default function AboutView() {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 grid grid-cols-2 gap-6 w-4/5 max-w-[900px] max-md:grid-cols-1">

      {/* Origin */}
      <div className="glass-panel p-8 flex flex-col gap-4">
        <h2 className="text-xs text-accent font-semibold tracking-[0.1em] uppercase">
          Origin / Foundation
        </h2>
        <p className="text-sm leading-relaxed text-[#d0d0d0]">
          Born and raised in the density of Shanghai. The city&apos;s relentless
          pace and architectural scale deeply informed my approach to building
          structural, highly-optimized software systems.
        </p>
        <StatRow label="COORD"  value="31.2304° N, 121.4737° E" />
        <StatRow label="LOCALE" value="PVG → GLOBAL" />
      </div>

      {/* Discipline */}
      <div className="glass-panel p-8 flex flex-col gap-4">
        <h2 className="text-xs text-accent font-semibold tracking-[0.1em] uppercase">
          Discipline / Court
        </h2>
        <p className="text-sm leading-relaxed text-[#d0d0d0]">
          Competitive tennis shapes my engineering philosophy. It requires
          mechanics, repetition, rapid geometry calculation, and intense
          singular focus. Code is the same discipline, applied digitally.
        </p>
        <StatRow label="FIRST SERVE" value="118 MPH" />
        <StatRow label="STYLE"       value="AGGRESSIVE BASELINER" />
      </div>
    </div>
  );
}
