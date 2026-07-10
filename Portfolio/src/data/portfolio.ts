export interface Project {
  name: string;
  desc: string;
  tech: string;
  highlight: string;
  color: string;
  screenshots: string[];
}

export const ABOUT = {
  hello: "Hello",
  intro:
    "I'm Swastika, a Flutter developer who enjoys turning ideas into apps that actually work well and feel good to use. I build primarily with Flutter, Dart, and Firebase, and I care as much about clean architecture and state management as I do about the small UI details most people overlook. Alongside development, I sharpen my problem-solving through competitive programming, which keeps my fundamentals sharp beyond just app-building. I'm good at creating new designs and love exploring different design directions.",
  experience: [],
  education: [
    "B.Tech in Information Technology",
    "Dr. APJ Abdul Kalam Technical University | 2024 - Now",
  ],
  contact: {
    email: "swastika.singh@example.com",
    phone: "+91 98765 43210",
  },
  languages: ["Hindi — mother tongue", "English — fluent"],
  tools: ["Flutter", "Firebase", "Figma", "VS Code"],
};

export const PROJECTS: Project[] = [
  {
    name: "Postly",
    desc: "Poster e-commerce app with real-time cart and Firebase backend.",
    tech: "Flutter · Firebase · GetX",
    highlight: "Built during internship",
    color: "#111",
    screenshots: ["/screenshots/postly-1.png", "/screenshots/postly-2.png"] as string[],
  },
  {
    name: "GraphGuard",
    desc: "GitHub repo vulnerability scanner with FCM push notifications.",
    tech: "Flutter · TigerGraph · GetX",
    highlight: "Top 5 — Devcation Delhi 2026",
    color: "#1a1a2e",
    screenshots: [] as string[],
  },
  {
    name: "GameZone",
    desc: "A fun gaming companion app.",
    tech: "Flutter · Firebase",
    highlight: "Coming soon",
    color: "#00796B",
    screenshots: [] as string[],
  },
];

export const SKILLS = {
  Languages: ["Dart", "Java", "Kotlin", "JavaScript"],
  Frameworks: ["Flutter", "React Native", "Android SDK"],
  Backend: ["Firebase", "Node.js", "REST APIs"],
  Tools: ["Git", "GitHub", "Figma", "VS Code", "Android Studio"],
};

export const PROCESS = [
  {
    name: "Idea",
    desc: "Brainstorming and research. Defining project scope, user stories, and technical requirements.",
  },
  {
    name: "UI Design",
    desc: "Crafting wireframes and high-fidelity mockups in Figma, focusing on intuitive UX/UI flows.",
  },
  {
    name: "Development",
    desc: "Writing clean, modular code with solid state management and API integrations.",
  },
  {
    name: "Testing",
    desc: "Rigorous testing of features, debugging edge cases, and ensuring smooth performance.",
  },
  {
    name: "Deployment",
    desc: "Launching the application to app stores and configuring analytics and monitoring.",
  },
];

export const ACHIEVEMENTS = [
  { label: "Projects Completed", value: "12+" },
  { label: "Hackathons", value: "5" },
  { label: "Certifications", value: "8" },
  { label: "Open-Source PRs", value: "20+" },
  { label: "Internships", value: "2" },
];

export const CONTACT = {
  email: "swastika.singh@example.com",
  linkedin: "linkedin.com/in/swastika-singh",
  github: "github.com/swastika-singh",
  closing:
    "Passionate about creating intuitive and impactful mobile applications that solve real-world problems.",
};
