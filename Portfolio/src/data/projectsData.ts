export interface ProjectScreenshot {
  url: string;
  title: string;
  caption: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  desc: string;
}

export interface ProjectShowcaseData {
  id: string;
  codeNumber: string;
  categoryTag: string;
  name: string;
  tagline: string;
  badge: string;
  role: string;
  team: string;
  domain: string[];
  tagChips: string[];
  theme: {
    primary: string;
    primaryDark: string;
    accent: string;
    cardBg: string;
    lightBg: string;
    textDark: string;
    badgeBg: string;
    badgeText: string;
    border: string;
  };
  heroSummary: string;
  oneLiner: string;
  problem: {
    title: string;
    points: string[];
    summary: string;
  };
  solution: {
    title: string;
    points: string[];
    summary: string;
  };
  screenshots: ProjectScreenshot[];
  workflow: WorkflowStep[];
  architecture: {
    layers: { name: string; desc: string; icon?: string }[];
    summary: string;
  };
  aiMlLayer: {
    title: string;
    capabilities: { name: string; desc: string }[];
  };
  keyFeatures: { title: string; desc: string }[];
  skillsDemonstrated: string[];
  mockupCover: string;
  logo?: string;
}

export const SHOWCASE_PROJECTS: ProjectShowcaseData[] = [
  {
    id: "biotrace",
    codeNumber: "01",
    categoryTag: "AI // BIODIVERSITY & eDNA MONITORING",
    name: "BioTrace",
    tagline: "AI-Powered eDNA Biodiversity Monitoring & Research Collaboration Platform",
    badge: "Build with Bharat — Hackathon Project",
    role: "Mobile App Development · Backend & Pipeline Integration",
    team: "4 Members",
    domain: [
      "Environmental Tech",
      "Biodiversity",
      "Bioinformatics",
      "AI/ML",
      "Mobile Development",
    ],
    tagChips: [
      "eDNA Sequencing",
      "Taxonomic Classification",
      "Geospatial Mapping",
      "Longitudinal Monitoring",
      "Flutter & REST APIs",
    ],
    theme: {
      primary: "#236B31",
      primaryDark: "#154720",
      accent: "#2E7D32",
      cardBg: "#FFFFFF",
      lightBg: "#F4FAF6",
      textDark: "#0E2914",
      badgeBg: "#E8F5E9",
      badgeText: "#1B5E20",
      border: "#E2EFE5",
    },
    mockupCover: "/screenshots/biotrace/biotrace-results.png",
    logo: "/screenshots/biotrace/biotrace-logo.png",
    heroSummary:
      "AI-powered eDNA biodiversity monitoring platform connecting field sampling, laboratory sequencing, taxonomic classification, and longitudinal collaboration.",
    oneLiner:
      "BioTrace is an AI-powered eDNA biodiversity monitoring platform that enables researchers to upload environmental DNA datasets, obtain taxonomic insights, visualize biodiversity, track ecological changes over time, and collaborate on location-based research projects.",
    problem: {
      title: "Fragmented Biodiversity Surveys & Data Silos",
      points: [
        "Traditional biodiversity surveys are time-consuming, expensive, and difficult to scale.",
        "DNA sequencing data is manually processed with separate tools and disjointed scripts.",
        "Biodiversity studies at the same geographical ecosystem remain isolated across organizations.",
        "Lack of longitudinal tracking to compare species composition across different sampling periods.",
      ],
      summary:
        "Researchers needed a unified platform bridging physical field collection, sequencing pipelines, and longitudinal collaboration.",
    },
    solution: {
      title: "End-to-End Digital Intelligence Pipeline",
      points: [
        "Create biodiversity projects with GPS coordinates, ecosystem type, and sampling metadata.",
        "Upload processed datasets (CSV/TSV and FASTA batches) with format validation.",
        "Automated backend pipeline handling quality control, denoising, and taxonomic assignment.",
        "AI/ML layer providing trend analysis, anomaly detection, and decision-support ecological insights.",
      ],
      summary:
        "Connects Sample → Sequencing Data → Taxonomic Analysis → Biodiversity Insights → Historical Monitoring → Collaboration.",
    },
    screenshots: [
      {
        url: "/screenshots/biotrace/biotrace-results.png",
        title: "eDNA Species Portal & Analysis Output",
        caption:
          "Hierarchical species classification showing single sequence match, confidence scoring, taxonomy details (Order: Anura, Family: Pyxicephalidae), and researcher workspace session recovery.",
      },
      {
        url: "/screenshots/biotrace/biotrace-input.png",
        title: "Researcher Input & Dataset Upload Screen",
        caption:
          "Multi-mode dataset intake supporting Single DNA sequence input, FASTA batch files, and CSV ground-truth benchmark uploads with real-time format validation.",
      },
      {
        url: "/screenshots/biotrace/biotrace-project-detail.png",
        title: "Global Amphibian eDNA Biodiversity Survey",
        caption:
          "Collaborative field study view featuring GPS-tagged sample regions, attached FASTA/protocol research documents, and contributor access management.",
      },
      {
        url: "/screenshots/biotrace/biotrace-community.png",
        title: "Open Projects & Collaboration Hub",
        caption:
          "Community discovery feed allowing researchers worldwide to search public initiatives, share sequencing datasets, and contribute to shared geographic ecosystems.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Create Biodiversity Project",
        desc: "Define sampling coordinates, ecosystem biome, sample type, permissions, and research goals.",
      },
      {
        step: "02",
        title: "Upload eDNA Data",
        desc: "Upload processed CSV/TSV datasets or raw FASTA batches directly via mobile/web.",
      },
      {
        step: "03",
        title: "Bioinformatics Pipeline",
        desc: "Quality filtering, denoising, and sequence classification via Kraken 2 / QIIME 2 / DADA2.",
      },
      {
        step: "04",
        title: "Taxonomic Identification",
        desc: "Hierarchical classification (Kingdom → Phylum → Class → Order → Family → Genus → Species).",
      },
      {
        step: "05",
        title: "Biodiversity Analysis",
        desc: "Species richness, Shannon/Simpson indices, invasive detection, and threatened species alerts.",
      },
      {
        step: "06",
        title: "Longitudinal Monitoring",
        desc: "Historical sampling comparisons over months/years to detect ecological shifts and loss.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Mobile App (Flutter)",
          desc: "Lightweight, responsive researcher interface for dataset submission, live tracking, and rich visual dashboards.",
        },
        {
          name: "Backend REST API",
          desc: "Handles authentication, project management, dataset queues, and permissions.",
        },
        {
          name: "Bioinformatics Pipeline",
          desc: "Cloud cluster performing quality control, denoising, alignment, and taxonomic database matching.",
        },
        {
          name: "AI / ML Intelligence Layer",
          desc: "Ecological trend detection, anomaly alerts, risk indices, and natural-language insight generation.",
        },
        {
          name: "Database & Storage",
          desc: "Relational project schemas, geospatial coordinates, FASTA file stores, and time-series historical surveys.",
        },
      ],
      summary:
        "Offloads computationally heavy bioinformatics to cloud workers while delivering immediate feedback to the mobile app.",
    },
    aiMlLayer: {
      title: "Decision-Support Intelligence",
      capabilities: [
        {
          name: "Biodiversity Trend Analysis",
          desc: "Evaluates multi-year sampling points to distinguish natural seasonal variance from severe declines.",
        },
        {
          name: "Anomaly Detection",
          desc: "Flags unexpected sudden disappearances of indicator species or uncharacteristic sequence distributions.",
        },
        {
          name: "Ecosystem Risk Assessment",
          desc: "Synthesizes invasive species introductions and threatened species vulnerability into a clear ecological health score.",
        },
        {
          name: "Automated Research Summaries",
          desc: "Generates concise, human-readable observation reports for quick dissemination to field teams.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Research Project Management",
        desc: "Create and manage GPS-associated monitoring campaigns with granular access control.",
      },
      {
        title: "Multi-Format Data Ingestion",
        desc: "Direct support for CSV/TSV tabular data and FASTA sequence files.",
      },
      {
        title: "Hierarchical Taxonomy Explorer",
        desc: "Interactive exploration from Kingdom down to exact species with confidence scoring.",
      },
      {
        title: "Geospatial Ecosystem Mapping",
        desc: "Link observations directly to river basins, forest preserves, and conservation reserves.",
      },
      {
        title: "Comparative Longitudinal Analytics",
        desc: "Side-by-side timeline analysis highlighting new detections and disappearing taxa.",
      },
      {
        title: "Open Science Collaboration",
        desc: "Federated project sharing allowing multi-institution surveys on identical water bodies.",
      },
    ],
    skillsDemonstrated: [
      "Mobile App Development",
      "API Integration & REST Architecture",
      "Scientific Data Visualization",
      "Bioinformatics Pipeline Integration",
      "Geospatial & GPS Mapping",
      "Machine Learning Integration",
      "Environmental Tech UI/UX",
      "Cloud Workflow Orchestration",
    ],
  },
  {
    id: "circle",
    codeNumber: "02",
    categoryTag: "CAMPUS UTILITY // STUDENT ECOSYSTEM",
    name: "Circle",
    tagline: "Full-Stack Campus Utility & Student Ecosystem Mobile Application",
    badge: "College Campus Utility Platform",
    role: "Full-Stack Mobile Developer · Campus ERP Integration",
    team: "Swastika Singh (Lead Developer)",
    domain: [
      "Campus Tech",
      "Education",
      "Mobile Development",
      "ERP Integration",
      "AI & Chatbots",
    ],
    tagChips: [
      "Flutter & GetX",
      "Node.js & Express",
      "Live ERP Attendance",
      "75% Bunk Calculator",
      "Cloudinary Notes",
      "AI Campus Bot",
    ],
    theme: {
      primary: "#7C3AED",
      primaryDark: "#4C1D95",
      accent: "#A78BFA",
      cardBg: "#FFFFFF",
      lightBg: "#F5F3FF",
      textDark: "#1E1035",
      badgeBg: "#EDE9FE",
      badgeText: "#6D28D9",
      border: "#DDD6FE",
    },
    mockupCover: "/screenshots/circle/circle-attendance.png",
    logo: "/screenshots/circle/circle-logo.png",
    heroSummary:
      "A unified student ecosystem featuring live AKGEC ERP attendance synchronization, a 75% attendance margin/bunk calculator, Cloudinary semester notes repository, and an AI campus assistant.",
    oneLiner:
      "Circle streamlines college life by combining real-time ERP attendance negotiation, academic lecture notes, society discovery, and an AI campus chatbot into one cohesive Flutter app.",
    problem: {
      title: "Fragmented Campus Portals & Academic Friction",
      points: [
        "Students juggle outdated, slow college ERP portals to check attendance percentages.",
        "Academic lecture notes and previous years' question papers (PYQs) remain scattered across Google Drive links and WhatsApp groups.",
        "Society recruitment announcements and campus event deadlines get lost without a centralized notice board.",
        "Campus-specific inquiries lack an automated real-time query resolution system.",
      ],
      summary:
        "Disjointed college systems force students to constantly switch across slow web portals and fragmented chat channels.",
    },
    solution: {
      title: "Unified Mobile Student Utility & Community Hub",
      points: [
        "Automated AKGEC ERP API handshake computing live subject-wise attendance and safe-bunk margin calculations.",
        "Cloudinary-backed semester academic repository organizing lecture notes and PYQs by branch and semester.",
        "Interactive campus society directory, event notice feeds, and an AI-powered conversational campus assistant (Circle Bot).",
      ],
      summary:
        "Circle centralizes student academics, campus events, and administrative tracking into a responsive Flutter application backed by Node.js and MongoDB.",
    },
    screenshots: [
      {
        url: "/screenshots/circle/circle-attendance.png",
        title: "Live ERP Attendance & Margin Tracker",
        caption: "Direct AKGEC ERP synchronization with 75% threshold and safe-bunk calculator.",
      },
      {
        url: "/screenshots/circle/circle-home.png",
        title: "Campus Hub & Events Feed",
        caption: "Personalized student greeting, upcoming hackathons, and society event discovery.",
      },
      {
        url: "/screenshots/circle/circle-notes.png",
        title: "Semester Notes & PYQ Repository",
        caption: "Curated academic syllabus units, reference PDFs, and Cloudinary document retrieval.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "ERP Token Negotiation",
        desc: "Reverse-engineered AKGEC ERP handshake securely authenticating student sessions with AES encryption.",
      },
      {
        step: "02",
        title: "Live Attendance & Margin Calc",
        desc: "Computes subject-wise percentage and tells students exactly how many classes they can safely skip.",
      },
      {
        step: "03",
        title: "Semester Notes Repository",
        desc: "Fast Cloudinary CDN retrieval of lecture notes, study PDFs, and previous years' question papers.",
      },
      {
        step: "04",
        title: "Campus Societies & Events",
        desc: "Live notice boards for technical clubs, cultural events, hackathons, and recruitment registrations.",
      },
      {
        step: "05",
        title: "AI Campus Assistant (Circle Bot)",
        desc: "Contextual ML chatbot answering department FAQs, syllabus queries, and procedural college rules.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Mobile Client (Flutter & GetX)",
          desc: "Reactive state management, adaptive Material UI, shared_preferences offline caching, and custom typography.",
        },
        {
          name: "Backend REST API (Node.js & Express)",
          desc: "JWT authentication, bcryptjs password hashing, AES credential encryption, and role-based permissions.",
        },
        {
          name: "Database (MongoDB & Mongoose)",
          desc: "Schemas for Users, Academic Notes, Societies, Events, and role-based access tiers.",
        },
        {
          name: "Cloud Media & ERP Integration",
          desc: "Cloudinary multi-part document streaming via multer; reverse-engineered college ERP token negotiation.",
        },
        {
          name: "AI Query Service",
          desc: "Microservice proxy to an ML question-answering model for campus queries and contextual fact retrieval.",
        },
      ],
      summary:
        "High-performance client-server architecture unifying real-time college ERP token scraping, cloud document delivery, and AI microservices.",
    },
    aiMlLayer: {
      title: "Campus Assistant & Analytics",
      capabilities: [
        {
          name: "Circle Bot (Campus Q&A Engine)",
          desc: "Conversational bot trained on department rules, syllabus breakdowns, and administrative procedures.",
        },
        {
          name: "Predictive Bunk & Margin Calculator",
          desc: "Calculates the exact margin of classes students can miss while staying strictly compliant with university mandates.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Live ERP Attendance & Safe-Bunk Calculator",
        desc: "Direct ERP API sync computing subject-wise records and margin classes above/below 75%.",
      },
      {
        title: "Academic Resource Repository (Notes & PYQs)",
        desc: "Semester, branch, and subject categorized lecture PDFs powered by Cloudinary CDN.",
      },
      {
        title: "Campus Societies & Clubs Directory",
        desc: "Discovery portal for college societies with recruitment schedules and coordinator announcements.",
      },
      {
        title: "College Events & Notice Board",
        desc: "Centralized feed of college fests, technical hackathons, workshops, and registration links.",
      },
      {
        title: "AI-Powered Circle Bot",
        desc: "Conversational assistant for campus questions, department FAQs, and academic procedures.",
      },
      {
        title: "Role-Based Access Control & Admin Suite",
        desc: "Tiered access for Students, Society Coordinators, and Admins to approve uploads and manage pages.",
      },
    ],
    skillsDemonstrated: [
      "Flutter & Dart (GetX Architecture)",
      "Node.js & Express.js REST APIs",
      "MongoDB & Mongoose Schemas",
      "Reverse-Engineered ERP API Handshake",
      "AES Credential Encryption",
      "Cloudinary Document Pipeline",
      "AI Chatbot Microservice Integration",
    ],
  },

  {
    id: "kechi",
    codeNumber: "03",
    categoryTag: "E-COMMERCE // PRINT-ON-DEMAND STUDIO",
    name: "Kechi",
    tagline: "Custom Print-on-Demand Studio & E-Commerce Mobile Platform",
    badge: "Full-Stack E-Commerce Studio",
    role: "Full-Stack Mobile Developer · Pipeline & 3PL Integration",
    team: "Swastika Singh (Solo / Lead Developer)",
    domain: [
      "E-Commerce",
      "Print-on-Demand",
      "Mobile Development",
      "Logistics & Payments",
      "Cloud Infrastructure",
    ],
    tagChips: [
      "Flutter & GetX",
      "Node.js & MongoDB",
      "Shadowfax 3PL Tracking",
      "Razorpay Gateway",
      "Cloudinary CDN",
      "NCR Regional Routing",
    ],
    theme: {
      primary: "#9E1B32",
      primaryDark: "#6B1121",
      accent: "#F24E1E",
      cardBg: "#FFFFFF",
      lightBg: "#FFF7F5",
      textDark: "#2B1117",
      badgeBg: "#FDECE8",
      badgeText: "#9E1B32",
      border: "#FAD8CE",
    },
    mockupCover: "/screenshots/kechi/kechi-home.png",
    logo: "/screenshots/kechi/kechi-logo.jpg",
    heroSummary:
      "Turn your digital posters into gallery-grade prints with reactive format pricing (A5, A4, A3), intelligent NCR regional delivery validation, and real-time Shadowfax courier tracking.",
    oneLiner:
      "Kechi transforms digital memories and curated posters into gallery-grade prints with real-time reactive pricing, NCR regional validation, and 7-stage order lifecycle tracking.",
    problem: {
      title: "Print-on-Demand Friction & Logistics Bottlenecks",
      points: [
        "Traditional custom printing requires desktop upload forms, manual DPI checks, and opaque offline quotation.",
        "Regional delivery boundaries (NCR vs National) cause frequent courier rejections and unexpected freight costs.",
        "Customers fear receiving bent or defective physical prints without an immediate, transparent reprint claim workflow.",
      ],
      summary:
        "Custom print fulfillment has historically suffered from fragmented customer experiences, lack of real-time courier visibility, and high return friction.",
    },
    solution: {
      title: "End-to-End Reactive Mobile POD Ecosystem",
      points: [
        "In-app print studio with automatic image compression, real-time sizing (A5 ₹39, A4 ₹59, A3 ₹99), and instant bulk discount engine.",
        "Intelligent NCR regional validator (ncrHelper) ensuring precise delivery rules and automated Shadowfax AWB generation.",
        "Zero-hassle defect replacement flow with in-app multi-photo proof upload directly to Cloudinary and 100% free reprint guarantee.",
      ],
      summary:
        "Kechi integrates a reactive Flutter front-end with an automated Node.js backend, providing instant checkout, live courier tracking, and an admin print queue.",
    },
    screenshots: [
      {
        url: "/screenshots/kechi/kechi-home.png",
        title: "Catalog Discovery & Poster Studio",
        caption: "Glassmorphic hero banner, custom poster upload CTA, and dynamic emoji category pills.",
      },
      {
        url: "/screenshots/kechi/kechi-detail.png",
        title: "Interactive Size Customizer & Preview",
        caption: "Real-time format selection (A5, A4, A3), dimension specs, and category recommendations.",
      },
      {
        url: "/screenshots/kechi/kechi-cart.png",
        title: "Cart & Regional Delivery Engine",
        caption: "NCR address validator, minimum order requirements, and dynamic free delivery incentive tier.",
      },
      {
        url: "/screenshots/kechi/kechi-wishlist.png",
        title: "Saved Wishlist & Curation Hub",
        caption: "Persistent cloud wishlist synchronized across devices with instant quick-buy triggers.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Upload & Auto-Compress",
        desc: "Pick from camera or gallery; client-side image engine compresses and verifies DPI aspect ratios.",
      },
      {
        step: "02",
        title: "Format & Reactive Pricing",
        desc: "Choose between A5 (₹39), A4 (₹59), and A3 (₹99) formats with live price and bulk discount computation.",
      },
      {
        step: "03",
        title: "NCR Validation & Address",
        desc: "ncrHelper inspects pin code across Delhi, Gurgaon, Noida, Ghaziabad, and NCR regions to apply delivery rules.",
      },
      {
        step: "04",
        title: "Cryptographic Checkout",
        desc: "Pay via Razorpay dynamic key endpoint (/payment/config) supporting UPI/cards, or choose phone-verified COD.",
      },
      {
        step: "05",
        title: "Shadowfax 3PL Automation",
        desc: "Automated Air Waybill (AWB) creation and dispatch into 7-stage live tracking pipeline.",
      },
      {
        step: "06",
        title: "100% Reprint Guarantee",
        desc: "Multi-photo proof claim flow with automated replacement production in case of transit defects.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Mobile App (Flutter & GetX)",
          desc: "Reactive state management, optimistic UI caching, dynamic theme blobs, and pinch-to-zoom inspect.",
        },
        {
          name: "Backend REST API (Node.js & Express)",
          desc: "JWT auth, bcrypt hashing, TTL OTP expiration, payment cryptographic verification, and order state machines.",
        },
        {
          name: "Database (MongoDB)",
          desc: "Product catalogs, customer address book, persistent cart sessions, and automated TTL OTP auto-deletion.",
        },
        {
          name: "Cloud Media & Payments",
          desc: "Cloudinary CDN for ultra-high-resolution print file storage; Razorpay API for authenticated UPI and card payments.",
        },
        {
          name: "Logistics & Communications",
          desc: "Shadowfax 3PL API for automated AWB generation; Firebase FCM push channels; Nodemailer / Brevo HTML transactional emails.",
        },
      ],
      summary:
        "Microservice-ready REST architecture decoupling mobile clients from cloud print pipelines, 3PL couriers, and payment verification.",
    },
    aiMlLayer: {
      title: "Smart E-Commerce & Logistics Engine",
      capabilities: [
        {
          name: "Automated DPI & Aspect Ratio Inspector",
          desc: "Validates uploaded artwork resolution against chosen physical poster size to avoid pixelation.",
        },
        {
          name: "Intelligent Regional NCR Validator (ncrHelper)",
          desc: "Parses district postal codes across 4 states to dynamically enforce delivery thresholds and free shipping.",
        },
        {
          name: "Dynamic Category & Emoji Auto-Mapper",
          desc: "Classifies posters into contextual aesthetics (Anime, Cinema, Music, Sports, Gym) with instant live filtering.",
        },
        {
          name: "Automated Defect Review Workflow",
          desc: "Routes damaged print claim photos directly to admin portal with one-tap replacement dispatch.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Custom Print Studio (Upload Flow)",
        desc: "Upload personal artwork via camera/gallery with lossless client compression and direct Cloudinary CDN upload.",
      },
      {
        title: "Dynamic Paper Format Pricing",
        desc: "A5 (14.8×21 cm @ ₹39), A4 (21×29.7 cm @ ₹59), A3 (29.7×42 cm @ ₹99) with free shipping for 7+ orders.",
      },
      {
        title: "Shadowfax 3PL Live Tracking",
        desc: "Automated AWB generation with 7-stage status updates and direct tracking link integration.",
      },
      {
        title: "Dual Payment Gateway",
        desc: "Razorpay dynamic key integration supporting UPI/Cards alongside verified Cash on Delivery.",
      },
      {
        title: "In-App Admin Management Portal",
        desc: "AdminPostersView to publish posters, manage pricing, view incoming print orders, and approve reprint claims.",
      },
      {
        title: "Multi-Channel Communications",
        desc: "Custom Android notification channel (kechi_order_updates) and responsive HTML transactional emails.",
      },
    ],
    skillsDemonstrated: [
      "Flutter & Dart (GetX Architecture)",
      "Node.js & Express.js REST APIs",
      "MongoDB & Mongoose Schemas",
      "Razorpay Payment Gateway Integration",
      "Shadowfax 3PL Logistics API & AWB Generation",
      "Cloudinary High-Res Media CDN",
      "Firebase Auth & Custom FCM Push Channels",
      "E-Commerce Order State Machines",
    ],
  },
  {
    id: "graphguard",
    codeNumber: "04",
    categoryTag: "CYBERSECURITY // GRAPH THREAT MAPPING",
    name: "GraphGuard",
    tagline: "GitHub Repo Vulnerability Scanner & Security Graph",
    badge: "Top 5 — Devcation Delhi 2026",
    role: "Full Stack Mobile & Graph Architecture",
    team: "3 Members",
    domain: ["Cybersecurity", "Graph Databases", "Cloud Infrastructure", "Flutter"],
    tagChips: [
      "TigerGraph GSQL",
      "Transitive Vulnerabilities",
      "FCM Push Alerts",
      "Automated PR Fixes",
      "Flutter & Dart",
    ],
    theme: {
      primary: "#4338CA",
      primaryDark: "#1E1B4B",
      accent: "#4F46E5",
      cardBg: "#FFFFFF",
      lightBg: "#F5F7FF",
      textDark: "#1E1B4B",
      badgeBg: "#EEF2FF",
      badgeText: "#3730A3",
      border: "#E0E7FF",
    },
    mockupCover: "/screenshots/graph-1.jpeg",
    heroSummary:
      "A deep dependency-graph analyzer that maps GitHub repo attack surfaces and surfaces critical transitive vulnerabilities in real-time.",
    oneLiner:
      "GraphGuard leverages TigerGraph and Flutter to visualize vulnerability propagation trees and notify developers with push alerts.",
    problem: {
      title: "Hidden Transitive Vulnerabilities",
      points: [
        "Deep dependency trees mask malicious packages and zero-days.",
        "Static CLI scans fail to show vulnerability propagation paths.",
        "Developers lack immediate mobile notifications for critical CVE alerts.",
      ],
      summary:
        "Modern applications pull thousands of packages where one vulnerable child dependency compromises the entire repository.",
    },
    solution: {
      title: "Real-Time Graph-Based Threat Mapping",
      points: [
        "Visualizes dependency trees via TigerGraph graph queries.",
        "FCM push notifications the moment a newly disclosed CVE affects a tracked repository.",
        "Automated PR generation with patched dependency recommendations.",
      ],
      summary:
        "Converts flat CVE tables into intuitive graph relationships.",
    },
    screenshots: [
      {
        url: "/screenshots/graph-1.jpeg",
        title: "Vulnerability Scan Dashboard",
        caption: "Real-time threat level breakdown and package risk hierarchy.",
      },
      {
        url: "/screenshots/graph-2.jpeg",
        title: "Graph Dependency Inspector",
        caption: "Deep traversal of nested dependencies and blast radius visualization.",
      },
      {
        url: "/screenshots/graph-3.jpeg",
        title: "Alerts & Remediation Details",
        caption: "Instant CVE description, affected versions, and one-click patch review.",
      },
    ],
    workflow: [
      { step: "01", title: "Repo Authorization", desc: "Connect GitHub repositories with webhook listeners." },
      { step: "02", title: "Dependency Extraction", desc: "Parse package manifests and build transitive dependency trees." },
      { step: "03", title: "Graph Querying", desc: "Execute TigerGraph GSQL queries against NIST CVE datasets." },
      { step: "04", title: "Alert & Remediate", desc: "Push mobile notification with patch version suggestion." },
    ],
    architecture: {
      layers: [
        { name: "Flutter Client", desc: "Interactive graph exploration and alert manager." },
        { name: "Backend API", desc: "Webhooks listener and dependency extractor." },
        { name: "TigerGraph DB", desc: "High-performance graph query engine for CVE paths." },
        { name: "FCM Push Service", desc: "Real-time mobile delivery of high-severity CVEs." },
      ],
      summary: "Scalable graph analytics combined with cross-platform mobile interface.",
    },
    aiMlLayer: {
      title: "Vulnerability Prioritization",
      capabilities: [
        { name: "Exploit Probability Scoring", desc: "Predicts active exploit probability using open threat intelligence." },
        { name: "Blast Radius Calculation", desc: "Quantifies downstream impact if a single library is compromised." },
      ],
    },
    keyFeatures: [
      { title: "TigerGraph Query Engine", desc: "Sub-second traversal of multi-layer dependency graphs." },
      { title: "Push Notification Alerts", desc: "Instant Firebase notifications for critical CVE disclosures." },
      { title: "Automated Fix PRs", desc: "Direct GitHub API integration for one-tap remediation." },
    ],
    skillsDemonstrated: [
      "Flutter & Dart",
      "TigerGraph & GSQL",
      "Firebase Cloud Messaging",
      "GitHub REST & GraphQL API",
      "Cybersecurity CVE Modeling",
    ],
  },
];
