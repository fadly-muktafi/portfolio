/**
 * Content source of truth (CMS-ready).
 * Rewritten from CV.md per PRD §9: outcome-oriented, NDA-safe.
 * Hard rules: no em-dashes, max one "·" per line, UI strings only.
 */

export interface ExperienceItem {
  id: string;
  year: string;
  company: string;
  role: string;
  period: string;
  location: string;
  context: string;
  contributions: string[];
  impact: string;
  stack: string[];
}

export interface LeadershipItem {
  org: string;
  role: string;
  period: string;
  line: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface AccentPreset {
  name: string;
  hue: number;
}

export const site = {
  name: "Fadly Muktafi",
  fullName: "Ahmad Fadly Muktafi",
  role: "Software Engineer",
  location: "Jakarta, Indonesia",
  email: "fadlymuktafi@gmail.com",
  cvPath: "/cv.pdf",
  // TODO(owner): supply real URLs before launch (PRD §9)
  socials: [
    { label: "GitHub", href: "" },
    { label: "LinkedIn", href: "" },
  ],
} as const;

export const nav = {
  links: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  cvLabel: "Download CV",
} as const;

export const hero = {
  // Role + live availability status in one eyebrow (UX-Blueprint §4.2)
  eyebrowRole: "SOFTWARE ENGINEER",
  eyebrowStatus: "OPEN TO WORK",
  line1: "FADLY",
  line2: "MUKTAFI.",
  lead: "Fullstack developer building reliable web products, from database to interface.",
  primaryCta: { label: "View experience", href: "#experience" },
  secondaryCta: { label: "Download CV", href: site.cvPath },
} as const;

export const about = {
  numeral: "02",
  title: "I like hard problems and honest questions.",
  photo: {
    src: "/photo.jpg", // TODO(owner): hi-res photo asset, see PRD §9
    alt: "Portrait of Ahmad Fadly Muktafi",
  },
  bio: [
    "I'm a fullstack developer from Jakarta who enjoys technical problems and is not afraid to ask when something is unclear.",
    "In the past year I shipped production code at two companies: an enterprise HR system on a Java stack, and a foundation's website rebuilt to be faster and friendlier.",
    "Outside of code I lead teams, from my school's ICT division to a basketball squad.",
  ],
  facts: ["JAKARTA, ID", "SMKN 64 / RPL", "CLASS OF 2026", "2 INTERNSHIPS"],
  principles: [
    {
      n: "01",
      title: "Dig into the problem",
      body: "Understand first, code second. The right fix starts with the right question.",
    },
    {
      n: "02",
      title: "Ask when it's unclear",
      body: "A five-minute question beats a day of rework.",
    },
    {
      n: "03",
      title: "Learn fast, ship anyway",
      body: "New stack, short deadline. Done it twice, will do it again.",
    },
  ],
} as const;

export const experience: {
  eyebrow: string;
  numeral: string;
  title: string;
  items: ExperienceItem[];
  leadership: LeadershipItem[];
} = {
  eyebrow: "EXPERIENCE",
  numeral: "03",
  title: "What I've shipped and learned",
  items: [
    {
      id: "sdd",
      year: "2026",
      company: "PT Swadharma Duta Data",
      role: "Fullstack Developer Intern",
      period: "Jan-Jun 2026",
      location: "Jakarta",
      context:
        "An internal HR management system used daily by company staff, built on an enterprise Java stack.",
      contributions: [
        "Built features end to end: ZUL interfaces, Java + ZK backend logic, and SQL Server data access through Hibernate.",
        "Converted Figma designs into working views for the HR product.",
        "Kept the system healthy: investigating bugs, fixing regressions, reporting progress to my supervisor.",
      ],
      impact: "My code shipped to a live enterprise system, not a sandbox.",
      stack: [
        "ZUL",
        "Java",
        "ZK Framework",
        "JavaScript",
        "SQL Server",
        "Hibernate",
        "CSS",
      ],
    },
    {
      id: "ydp",
      year: "2025",
      company: "Djalaludin Pane Foundation",
      role: "Fullstack Developer Intern",
      period: "Jan-Jun 2025",
      location: "Jakarta",
      context:
        "The foundation's website, the main public door to its programs and audience.",
      contributions: [
        "Redesigned the site to look modern and make content easier to find.",
        "Turned team discussions about flows and UI directly into working pages.",
        "Wrote simple technical documentation so future updates need less guesswork.",
      ],
      impact:
        "Left behind a friendlier site and docs the next developer can pick up.",
      stack: ["PHP", "JavaScript", "CSS", "Git"],
    },
  ],
  leadership: [
    {
      org: "OSIS SMKN 64 Jakarta",
      role: "Head of ICT Division",
      period: "2024-2025",
      line: "Led the school's digital infrastructure and coordinated technology across student activities.",
    },
    {
      org: "Basketball Extracurricular",
      role: "Head of Activity",
      period: "2024-2025",
      line: "Ran training schedules, coordinated the team, kept discipline on and off the court.",
    },
  ],
};

export const skills: {
  numeral: string;
  title: string;
  playground: {
    label: string;
    hint: string;
    reset: string;
    liveValue: string;
    presets: AccentPreset[];
  };
  groups: SkillGroup[];
  softLabel: string;
  soft: string[];
} = {
  numeral: "04",
  title: "Tools I reach for",
  playground: {
    label: "MAKE THIS SITE YOURS",
    hint: "Drag to change the accent. It sticks.",
    reset: "Reset",
    liveValue: "HUE",
    presets: [
      { name: "Mint", hue: 140 },
      { name: "Lime", hue: 110 },
      { name: "Cobalt", hue: 250 },
      { name: "Tangerine", hue: 55 },
      { name: "Magenta", hue: 330 },
    ],
  },
  groups: [
    {
      label: "LANGUAGES",
      items: [
        "JavaScript",
        "TypeScript",
        "Java",
        "PHP",
        "Python",
        "Kotlin",
        "Dart",
        "C#",
        "C++",
        "SQL",
      ],
    },
    { label: "FRONTEND", items: ["HTML", "CSS", "ZUL", "Responsive UI"] },
    { label: "BACKEND", items: ["ZK Framework", "Hibernate"] },
    {
      label: "DATABASE & STORAGE",
      items: ["SQL Server", "MySQL", "PostgreSQL"],
    },
    {
      label: "TOOLS",
      items: [
        "Git",
        "GitHub",
        "Docker",
        "Postman",
        "VS Code",
        "Eclipse",
        "Android Studio",
        "SSMS",
        "pgAdmin",
        "phpMyAdmin",
      ],
    },
  ],
  softLabel: "ALSO HUMAN",
  soft: [
    "Communication",
    "Problem-solving",
    "Analysis",
    "Continuous learning",
    "Teamwork",
    "Collaboration",
    "Time management",
    "Adaptability",
  ],
};

export const contact = {
  numeral: "05",
  title: "Let's build something.",
  form: {
    fields: {
      name: "Name",
      email: "Email",
      subject: "Subject (optional)",
      message: "Message",
    },
    submit: "Send message",
    submitting: "Sending",
    successLabel: "Sent",
    errors: {
      required: "Required field",
      email: "That email doesn't look right",
    },
    toast: {
      success: "Message sent. I'll reply within 24 hours.",
      error: "Couldn't send. Try again or email me directly.",
    },
  },
  direct: {
    heading: "Prefer email?",
    copyLabel: "Copy",
    copiedLabel: "Copied.",
    toastCopied: "Email copied to clipboard",
    note: "I usually reply within 24 hours.",
  },
} as const;

export const footer = {
  marquee: ["SOFTWARE ENGINEER", "FULLSTACK", "JAKARTA", "2026"],
  colophon: "Designed & built by Ahmad Fadly Muktafi",
  copyright: "© 2026",
  backToTop: "BACK TO TOP",
} as const;

export const a11y = {
  skipToContent: "Skip to content",
  menu: "Open menu",
  menuClose: "Close menu",
} as const;
