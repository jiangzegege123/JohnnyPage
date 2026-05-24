// Engine — landing view with floating skill labels and hero title

import FloatingLabels from "./FloatingLabels";

export default function HomeView() {
  return (
    <>
      <FloatingLabels />

      {/* Hero title */}
      <div className="absolute bottom-[100px] w-full flex flex-col items-center gap-3 text-center">
        <h1 className="text-[32px] font-black tracking-[-0.04em] uppercase text-white max-md:text-[24px]">
          Johnny Zhou
        </h1>
        <p className="text-[11px] font-medium text-muted tracking-[0.1em] uppercase leading-relaxed">
          Full-Stack Engineer &mdash; From server to screen
          {/* Separator + tennis line: inline on desktop, new line on mobile */}
          <span className="max-md:hidden">
            &nbsp;<span className="text-white/30">/</span>&nbsp;Also that guy on the court
          </span>
          <span className="md:hidden block text-[10px] mt-0.5 text-muted/70">
            Also that guy on the court
          </span>
        </p>
      </div>
    </>
  );
}
