// Identity — about panels with photo headers and contact bar

import { ABOUT_SECTIONS } from "../../data/about";
import AboutCard from "./AboutCard";
import ContactBar from "./ContactBar";

export default function AboutView() {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-5 w-4/5 max-w-[900px]">

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        {ABOUT_SECTIONS.map((s) => (
          <AboutCard key={s.tag} section={s} />
        ))}
      </div>

      {/* Contact */}
      <ContactBar />

    </div>
  );
}
