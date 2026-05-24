export interface Skill {
  label: string;
  sub: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  // Controls the individual float animation rhythm
  animDuration: number; // seconds
  animDelay: number;    // seconds
  hideOnMobile?: boolean;
}

export const SKILLS: Skill[] = [
  {
    label: "TYPESCRIPT",
    sub: "LANGUAGE",
    position: { top: "13%", left: "16%" },
    animDuration: 9,
    animDelay: 0,
  },
  {
    label: "REACT.NEXT",
    sub: "FRONTEND",
    position: { top: "44%", left: "4%" },
    animDuration: 11,
    animDelay: 1.5,
  },
  {
    label: "PLAYWRIGHT",
    sub: "E2E TESTING",
    position: { top: "27%", left: "9%" },
    animDuration: 8,
    animDelay: 3,
    hideOnMobile: true,
  },
  {
    label: "JEST.TDD",
    sub: "UNIT TESTING",
    position: { bottom: "19%", left: "13%" },
    animDuration: 13,
    animDelay: 0.8,
    hideOnMobile: true,
  },
  {
    label: "REDUX",
    sub: "STATE MGMT",
    position: { bottom: "36%", left: "23%" },
    animDuration: 10,
    animDelay: 4.2,
    hideOnMobile: true,
  },
  {
    label: "NODE.EXPRESS",
    sub: "BACKEND",
    position: { top: "16%", right: "7%" },
    animDuration: 12,
    animDelay: 2.1,
  },
  {
    label: "NESTJS",
    sub: "FRAMEWORK",
    position: { top: "41%", right: "4%" },
    animDuration: 8.5,
    animDelay: 5,
  },
  {
    label: "POSTGRESQL",
    sub: "DATABASE",
    position: { top: "57%", right: "19%" },
    animDuration: 14,
    animDelay: 1,
    hideOnMobile: true,
  },
  {
    label: "DOCKER.CI",
    sub: "DEVOPS",
    position: { bottom: "22%", right: "8%" },
    animDuration: 9.5,
    animDelay: 3.5,
    hideOnMobile: true,
  },
  {
    label: "AWS.CLOUD",
    sub: "INFRASTRUCTURE",
    position: { bottom: "60%", right: "12%" },
    animDuration: 11.5,
    animDelay: 0.3,
    hideOnMobile: true,
  },
];
