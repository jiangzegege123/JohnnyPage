// Identity — about panels with photo headers and contact bar

import { ABOUT_SECTIONS } from "../../data/about";
import AboutCard from "./AboutCard";
import ContactBar from "./ContactBar";

export default function AboutView() {
  // Desktop: parent .view is flex + align-center, no absolute positioning needed.
  // Mobile:  content may exceed viewport height — scrollable via overflow-y-auto.
  return (
    <div className="flex flex-col gap-5 w-4/5 max-w-[900px] max-md:w-[92%] max-md:overflow-y-auto max-md:max-h-[calc(100svh-190px)] max-md:py-3">

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 max-md:gap-3">
        {ABOUT_SECTIONS.map((s) => (
          <AboutCard key={s.tag} section={s} />
        ))}
      </div>

      {/* Contact */}
      <ContactBar />

    </div>
  );
}
