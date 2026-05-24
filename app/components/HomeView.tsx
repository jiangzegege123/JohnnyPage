// Engine — landing view with floating skill labels and hero title

export default function HomeView() {
  return (
    <>
      {/* Floating skill labels */}
      <div className="floating-label glass-panel top-[30%] left-[20%]">
        <span className="square-bullet" />FRONTEND.REACT
      </div>
      <div className="floating-label glass-panel top-[45%] right-[18%]">
        <span className="square-bullet" />SYSTEM.ARCH
      </div>
      <div className="floating-label glass-panel bottom-[35%] left-[25%] max-md:hidden">
        <span className="square-bullet" />WEBGL.RENDER
      </div>
      <div className="floating-label glass-panel bottom-[25%] right-[25%] max-md:hidden">
        <span className="square-bullet" />DATA.PIPELINE
      </div>

      {/* Hero title */}
      <div className="absolute bottom-[120px] w-full flex flex-col items-center gap-3 text-center">
        <h1 className="text-[32px] font-black tracking-[-0.04em] uppercase text-white max-md:text-[24px]">
          Engineering Dynamics
        </h1>
        <p className="text-[11px] font-medium text-muted tracking-[0.1em] uppercase">
          Architecting high-performance digital systems
        </p>
      </div>
    </>
  );
}
