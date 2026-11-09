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
    heroSummary:
      "A cloud-based biodiversity intelligence platform designed to help researchers analyze environmental DNA (eDNA) data and monitor biodiversity over time—connecting field sampling, laboratory sequencing, taxonomic classification, and longitudinal collaboration.",
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
    id: "graphguard",
    codeNumber: "02",
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
  {
    id: "postly",
    codeNumber: "03",
    categoryTag: "E-COMMERCE // MOBILE ART & FRAMING STUDIO",
    name: "Postly",
    tagline: "Custom Poster E-Commerce & Framing Mobile Studio",
    badge: "Internship Project",
    role: "Mobile App Developer",
    team: "2 Members",
    domain: ["E-Commerce", "Mobile Development", "UI/UX", "Firebase"],
    tagChips: [
      "Interactive Framing",
      "GetX State Management",
      "Firestore Realtime",
      "Offline-First Cart",
      "Flutter & Firebase",
    ],
    theme: {
      primary: "#BE185D",
      primaryDark: "#831843",
      accent: "#DB2777",
      cardBg: "#FFFFFF",
      lightBg: "#FFF5F8",
      textDark: "#371124",
      badgeBg: "#FCE7F3",
      badgeText: "#9D174D",
      border: "#FBCFE8",
    },
    mockupCover: "/screenshots/postly-1.png",
    heroSummary:
      "A visually rich mobile e-commerce platform offering customized wall art, live wall previewing, and seamless checkout.",
    oneLiner:
      "Postly delivers a fluid art-shopping experience with interactive poster framing and instant cart synchronization.",
    problem: {
      title: "Flat Shopping Experience for Visual Decor",
      points: [
        "Customers struggle to imagine frame sizes and textures on real walls.",
        "Clunky mobile carts lead to high drop-off rates.",
        "Inventory changes require complex manual synchronization.",
      ],
      summary:
        "Art decor requires visual confidence before purchase.",
    },
    solution: {
      title: "Interactive Framing Studio & Fluid Cart",
      points: [
        "Real-time frame selector with shadow and border preview.",
        "Optimistic UI state management powered by GetX for zero checkout latency.",
        "Firestore real-time inventory and order lifecycle tracking.",
      ],
      summary:
        "A playful, high-performance shopping app built with Flutter.",
    },
    screenshots: [
      {
        url: "/screenshots/postly-1.png",
        title: "Catalog & Home Experience",
        caption: "Curated poster discovery with category filtering and trending collections.",
      },
      {
        url: "/screenshots/postly-2.png",
        title: "Product Detail & Frame Customizer",
        caption: "Interactive size selection, matte finish toggles, and live frame preview.",
      },
      {
        url: "/screenshots/postly-3.jpeg",
        title: "Cart & Instant Checkout",
        caption: "Smooth swipe-to-delete cart items with live pricing calculations.",
      },
    ],
    workflow: [
      { step: "01", title: "Browse Artwork", desc: "Discover curated art prints categorized by aesthetic." },
      { step: "02", title: "Customize Frame", desc: "Choose sizes, border bevels, and frame materials." },
      { step: "03", title: "Instant Cart Sync", desc: "Real-time cart updates with persistent offline storage." },
      { step: "04", title: "Order Tracking", desc: "Track fulfillment stages from printing to door delivery." },
    ],
    architecture: {
      layers: [
        { name: "Flutter Front-End", desc: "Reactive UI with GetX state management." },
        { name: "Firebase Auth & Firestore", desc: "Real-time user data and product catalog." },
        { name: "Cloud Functions", desc: "Payment verification and automated order receipt emails." },
      ],
      summary: "Serverless backend architecture backed by Google Cloud Firebase.",
    },
    aiMlLayer: {
      title: "Recommendation Engine",
      capabilities: [
        { name: "Color Palette Matching", desc: "Suggests posters matching user-uploaded room photos." },
        { name: "Trending Taste Graph", desc: "Personalized home feed based on view and save history." },
      ],
    },
    keyFeatures: [
      { title: "Live Frame Customizer", desc: "Dynamically render frame wood, metal, and matting finishes." },
      { title: "GetX State Management", desc: "High-speed reactive architecture with minimal boilerplate." },
      { title: "Offline-First Cart", desc: "Full local cache synchronization with Firestore." },
    ],
    skillsDemonstrated: [
      "Flutter UI/UX Design",
      "GetX Architecture",
      "Firebase Firestore & Auth",
      "E-Commerce Payment Flow",
      "Responsive Layouts",
    ],
  },
];
