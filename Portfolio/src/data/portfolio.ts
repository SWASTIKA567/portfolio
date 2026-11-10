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
    email: "swastikasingh1055@gmail.com",
    phone: "+91 9453271859",
  },
  languages: ["Hindi — mother tongue", "English — fluent"],
  tools: ["Flutter", "Firebase", "Figma", "VS Code"],
};

export const PROJECTS: Project[] = [
  {
    name: "Circle",
    desc: "Full-stack campus utility & student ecosystem with live ERP attendance and Cloudinary notes.",
    tech: "Flutter · Node.js · MongoDB · ERP API",
    highlight: "Campus Student Platform",
    color: "#7C3AED",
    screenshots: [
      "/screenshots/circle/circle-attendance.png",
      "/screenshots/circle/circle-home.png",
      "/screenshots/circle/circle-notes.png",
    ] as string[],
  },

  {
    name: "Kechi",
    desc: "Custom Print-on-Demand Studio & E-Commerce platform with Shadowfax logistics and Razorpay.",
    tech: "Flutter · Node.js · MongoDB · Razorpay",
    highlight: "Full-Stack E-Commerce Studio",
    color: "#9E1B32",
    screenshots: [
      "/screenshots/kechi/kechi-home.png",
      "/screenshots/kechi/kechi-detail.png",
      "/screenshots/kechi/kechi-cart.png",
      "/screenshots/kechi/kechi-wishlist.png",
    ] as string[],
  },
  {
    name: "GraphGuard",
    desc: "GitHub repo vulnerability scanner with FCM push notifications.",
    tech: "Flutter · TigerGraph · GetX",
    highlight: "Top 5 — Devcation Delhi 2026",
    color: "#1a1a2e",
    screenshots: ["/screenshots/graph-1.jpeg", "/screenshots/graph-2.jpeg", "/screenshots/graph-3.jpeg"] as string[],
  },
  {
    name: "GameZone",
    desc: "A fun gaming companion app.",
    tech: "Flutter · Firebase",
    highlight: "Coming soon",
    color: "#00796B",
    screenshots: [ "/screenshots/gamezone-1.jpeg", "/screenshots/gamezone-2.jpeg" , "/screenshots/gamezone-3.jpeg", "/screenshots/gamezone-4.jpeg" , "/screenshots/gmaezone-5.jpeg"] as string[],
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
  email: "swastikasingh1055@gmail.com",
  linkedin: "linkedin.com/in/swastika",
  github: "github.com/swastika567",
  closing:
    "Passionate about creating intuitive and impactful mobile applications that solve real-world problems.",
};
