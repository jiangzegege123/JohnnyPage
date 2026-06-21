export interface StatItem {
  label: string;
  value: string;
}

export interface AboutSection {
  tag:   string;
  body:  string;
  stats: StatItem[];
  image?: string;
}

export interface ContactLink {
  platform: string;
  href:     string;
  icon:     "github" | "linkedin" | "instagram" | "email";
}

export const ABOUT_SECTIONS: AboutSection[] = [
  {
    tag:  "Origin / Foundation",
    body: "Born and raised in the density of Shanghai. The city's relentless pace and architectural scale deeply informed my approach to building structural, highly-optimized software systems.",
    stats: [
      { label: "COORD",  value: "31.2304° N, 121.4737° E" },
      { label: "LOCALE", value: "PVG → GLOBAL" },
    ],
    image: "/images/aboutme1.png",
  },
  {
    tag:  "Discipline / Court",
    body: "Competitive tennis shapes my engineering philosophy. It requires mechanics, repetition, rapid geometry calculation, and intense singular focus. Code is the same discipline, applied digitally.",
    stats: [
      { label: "FIRST SERVE", value: "118 MPH" },
      { label: "STYLE",       value: "AGGRESSIVE BASELINER" },
    ],
    image: "/images/aboutme2.png",
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  { platform: "GitHub",    href: "https://github.com/jiangzegege123",       icon: "github"    },
  { platform: "LinkedIn",  href: "https://www.linkedin.com/in/johnnyzhou0416/", icon: "linkedin"  },
  { platform: "Instagram", href: "https://www.instagram.com/johnny____zhou/", icon: "instagram" },
  { platform: "Email",     href: "mailto:zhoujiangze417@gmail.com",        icon: "email"     },
];
