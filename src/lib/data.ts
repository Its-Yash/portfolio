export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  github: string;
  linkedin: string;
  resumePdf: string;
  idNumber: string;
  dept: string;
  validTill: string;
  cgpa: string;
  rank: string;
  degree: string;
  university: string;
}

export interface NavItem {
  id: string;
  label: string;
  index: string;
}

export interface SkillItem {
  atomicNumber: number;
  symbol: string;
  name: string;
  family: 'AI & ML' | 'Agents & SLM' | 'Frontend' | 'Backend' | 'Database' | 'Cloud & DevOps' | 'Security' | 'Tools';
  logoKey: string;
  description: string;
  usedInProjects: string[];
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  category: string;
  clientOrOrg?: string;
  role: string;
  url?: string;
  description: string;
  features: string[];
  tech: string[];
  isProductionPlatform?: boolean;
  uiMockType: 'marketplace' | 'security-cli' | 'health-ai' | 'ops-dashboard' | 'ecommerce-luxury' | 'b2b-trade' | 'ieee-uav' | 'rag-agent';
}

export interface ExperienceItem {
  id: string;
  period: string;
  year: string;
  role: string;
  company: string;
  location: string;
  url?: string;
  type: 'experience' | 'education';
  highlights: string[];
  metrics?: string;
}

export interface CertificationItem {
  index: string;
  title: string;
  issuer: string;
  category: string;
  detail: string;
  link?: string;
}

export interface AchievementItem {
  index: string;
  numberValue: number;
  numberSuffix?: string;
  numberPrefix?: string;
  label: string;
  caption: string;
  detail: string;
  platformOrOrg: string;
  logoKey: string;
}

export const PROFILE: Profile = {
  name: "Yash Pallav Pathak",
  firstName: "Yash",
  lastName: "Pathak",
  role: "Full Stack Developer | AI/ML Engineer | DevOps Specialist",
  email: "yash.pathak2301@gmail.com",
  phone: "+91 9571209434",
  phoneHref: "tel:+919571209434",
  location: "New Delhi, India",
  resumeSummary: "Results-driven Full Stack Developer, DevOps Specialist, and AI/ML Engineer with 3+ years of professional experience architecting, securing, and deploying enterprise-grade web, cloud, and security systems. Co-founder of SolDevPath, spearheading engineering delivery, technical client consultations, and proprietary product development (including SolScan and SolAmi). Proven track record executing large-scale international enterprise client engagements across the US, UK, Africa, and India—including client deployments for Tedekstra, NeZaaka, and Bangre-Nooma. Deep technical expertise in DevSecOps automation, GDPR/SOC compliance, container orchestration, microservices, and AI/LLM pipelines. Published IEEE researcher in AI and UAV image processing.",
  github: "https://github.com/Its-Yash",
  linkedin: "https://www.linkedin.com/in/yash-pathak-844b55137/",
  resumePdf: "/resume.pdf",
  idNumber: "SDP-YP-2024",
  dept: "Computer Science & Engineering",
  validTill: "2024 / Present",
  cgpa: "9.07 / 10.0",
  rank: "29th Rank Overall",
  degree: "B.Tech in Computer Science & Engineering",
  university: "Guru Gobind Singh Indraprastha University",
};

export const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About", index: "01" },
  { id: "skills", label: "Skills", index: "02" },
  { id: "work", label: "Work", index: "03" },
  { id: "certifications", label: "Certifications", index: "04" },
  { id: "experience", label: "Experience", index: "05" },
  { id: "achievements", label: "Achievements", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
];

export const SKILL_ITEMS: SkillItem[] = [
  // AI & ML
  { atomicNumber: 1, symbol: "Lm", name: "LLMs & GenAI", family: "AI & ML", logoKey: "openai", description: "Large Language Models, prompt architectures, evaluation & system prompts", usedInProjects: ["SolAmi", "RAG Document Assistant", "Quira AI Quest"] },
  { atomicNumber: 2, symbol: "Rg", name: "RAG Systems", family: "AI & ML", logoKey: "rag", description: "Retrieval-Augmented Generation with semantic indexing & hybrid search", usedInProjects: ["Intelligent RAG Assistant", "Genius Labs", "SolDevPath"] },
  { atomicNumber: 3, symbol: "Lc", name: "LangChain", family: "AI & ML", logoKey: "langchain", description: "Chains, prompt templates, structured output parsers & memory", usedInProjects: ["Quira AI Quest", "RAG Document Assistant"] },
  { atomicNumber: 4, symbol: "Lg", name: "LangGraph", family: "AI & ML", logoKey: "langgraph", description: "Stateful cyclical graphs for multi-agent autonomous decision flows", usedInProjects: ["Multi-Agent AI Orchestrator", "Quira AI Quest"] },
  { atomicNumber: 5, symbol: "Hf", name: "Hugging Face", family: "AI & ML", logoKey: "huggingface", description: "Transformers, model hub, inference endpoints, datasets", usedInProjects: ["SolAmi", "Precision Agriculture"] },
  { atomicNumber: 6, symbol: "Py", name: "Python", family: "AI & ML", logoKey: "python", description: "Primary AI/ML, backend microservices & data processing language", usedInProjects: ["Precision Agriculture", "Drone Navigation", "SolScan"] },
  { atomicNumber: 7, symbol: "Tf", name: "TensorFlow", family: "AI & ML", logoKey: "tensorflow", description: "Deep learning neural network architectures & image classification", usedInProjects: ["Precision Agriculture (IEEE)"] },
  { atomicNumber: 8, symbol: "Pt", name: "PyTorch", family: "AI & ML", logoKey: "pytorch", description: "Model development, tensor math, deep neural network training", usedInProjects: ["SolAmi", "Drone Navigation"] },
  { atomicNumber: 9, symbol: "Cv", name: "Computer Vision", family: "AI & ML", logoKey: "opencv", description: "OpenCV, YOLO real-time object tracking & vegetation health indexing", usedInProjects: ["Autonomous Drone Navigation", "Precision Agriculture"] },
  { atomicNumber: 10, symbol: "Sk", name: "Scikit-Learn", family: "AI & ML", logoKey: "scikitlearn", description: "Statistical machine learning, regression, clustering & dimensionality reduction", usedInProjects: ["CryptoAI Bridge", "Precision Agriculture"] },

  // Agents & SLM
  { atomicNumber: 11, symbol: "Ag", name: "Autonomous Agents", family: "Agents & SLM", logoKey: "agent", description: "Goal-driven agent loops with self-reflection, planning & tool use", usedInProjects: ["Agentic Research Tool", "Multi-Agent Orchestrator"] },
  { atomicNumber: 12, symbol: "Cr", name: "CrewAI", family: "Agents & SLM", logoKey: "crewai", description: "Role-playing autonomous multi-agent collaboration frameworks", usedInProjects: ["Multi-Agent AI Workflow Orchestrator"] },
  { atomicNumber: 13, symbol: "Sl", name: "Small Language Models", family: "Agents & SLM", logoKey: "slm", description: "Local low-latency SLMs (Phi, Gemma, LLaMA) fine-tuned with LoRA/QLoRA", usedInProjects: ["SolDevPath", "SolScan"] },
  { atomicNumber: 14, symbol: "Qn", name: "Model Quantization", family: "Agents & SLM", logoKey: "quant", description: "GGUF, AWQ, 4-bit/8-bit precision scaling for edge & on-premise execution", usedInProjects: ["SolDevPath SLM Deployments"] },
  { atomicNumber: 15, symbol: "Ol", name: "Ollama & vLLM", family: "Agents & SLM", logoKey: "ollama", description: "High-throughput model serving & local inference orchestration", usedInProjects: ["SolScan", "SolAmi"] },

  // Frontend
  { atomicNumber: 16, symbol: "Re", name: "React", family: "Frontend", logoKey: "react", description: "Component-driven user interfaces, hooks, state machines & virtual DOM", usedInProjects: ["NeZaaka", "SolAmi", "Trade2Foreign"] },
  { atomicNumber: 17, symbol: "Nx", name: "Next.js", family: "Frontend", logoKey: "nextjs", description: "Server components, App Router, SSR/SSG, edge runtime & API routes", usedInProjects: ["STEM Quest", "Bangre-Nooma", "Personal Portfolio"] },
  { atomicNumber: 18, symbol: "Ts", name: "TypeScript", family: "Frontend", logoKey: "typescript", description: "Strict static typing, generative generics & enterprise contract safety", usedInProjects: ["SolDevPath", "NeZaaka", "Tedekstra"] },
  { atomicNumber: 19, symbol: "Js", name: "JavaScript", family: "Frontend", logoKey: "javascript", description: "Modern ES6+ asynchronous patterns, event loop & DOM APIs", usedInProjects: ["All Web Deployments"] },
  { atomicNumber: 20, symbol: "Tw", name: "Tailwind CSS", family: "Frontend", logoKey: "tailwind", description: "Utility-first design systems, responsive typography & fluid tokens", usedInProjects: ["NeZaaka", "Shivraj Jewellers", "Bangre-Nooma"] },
  { atomicNumber: 21, symbol: "Zu", name: "Zustand & Redux", family: "Frontend", logoKey: "redux", description: "Predictable client-side state stores, slices & persistent sync", usedInProjects: ["STEM Quest CRM", "NeZaaka"] },

  // Backend
  { atomicNumber: 22, symbol: "No", name: "Node.js", family: "Backend", logoKey: "nodejs", description: "High-throughput asynchronous non-blocking event-driven backend microservices", usedInProjects: ["SolDevPath", "STEM Quest", "Genius Labs"] },
  { atomicNumber: 23, symbol: "Ex", name: "Express", family: "Backend", logoKey: "express", description: "Minimalist web framework for routing, middlewares & REST microservices", usedInProjects: ["STEM Quest CRM", "DRDO Media Streaming"] },
  { atomicNumber: 24, symbol: "Jv", name: "Java", family: "Backend", logoKey: "java", description: "Enterprise object-oriented architectures & low-level multithreaded networking", usedInProjects: ["DRDO Screen Recording System"] },
  { atomicNumber: 25, symbol: "Ap", name: "REST APIs", family: "Backend", logoKey: "restapi", description: "Robust contract-first RESTful architecture, OpenAPI, rate limiting", usedInProjects: ["STEM Quest", "NeZaaka", "Tedekstra"] },
  { atomicNumber: 26, symbol: "Gq", name: "GraphQL", family: "Backend", logoKey: "graphql", description: "Schema-driven querying, typed mutations & selective payload fetching", usedInProjects: ["SolDevPath Platform Services"] },
  { atomicNumber: 27, symbol: "Ws", name: "WebSockets", family: "Backend", logoKey: "websocket", description: "Full-duplex real-time bidirectional communication channels", usedInProjects: ["SolAmi Biometrics", "CryptoAI Bridge"] },

  // Database
  { atomicNumber: 28, symbol: "Mg", name: "MongoDB", family: "Database", logoKey: "mongodb", description: "Document NoSQL database, aggregation pipelines & replica indexing", usedInProjects: ["STEM Quest CRM", "Genius Labs"] },
  { atomicNumber: 29, symbol: "Pg", name: "PostgreSQL", family: "Database", logoKey: "postgresql", description: "ACID-compliant relational database, strict constraints & JSONB support", usedInProjects: ["NeZaaka Marketplace", "SolScan"] },
  { atomicNumber: 30, symbol: "My", name: "MySQL", family: "Database", logoKey: "mysql", description: "Relational data modeling, indexing optimization & foreign keys", usedInProjects: ["Raised Digital Job Portals"] },
  { atomicNumber: 31, symbol: "Rd", name: "Redis", family: "Database", logoKey: "redis", description: "In-memory key-value cache, pub/sub broker & session coordination", usedInProjects: ["Multi-Agent Orchestrator", "NeZaaka"] },
  { atomicNumber: 32, symbol: "Pc", name: "Pinecone", family: "Database", logoKey: "pinecone", description: "High-dimensional vector database for sub-second semantic search & RAG", usedInProjects: ["Intelligent RAG Document Assistant"] },
  { atomicNumber: 33, symbol: "Vd", name: "ChromaDB", family: "Database", logoKey: "chroma", description: "Embedded vector database for local AI memory & knowledge graphs", usedInProjects: ["Agentic Research Tool"] },

  // Cloud & DevOps
  { atomicNumber: 34, symbol: "Aw", name: "AWS", family: "Cloud & DevOps", logoKey: "aws", description: "EC2, S3, Lambda serverless, RDS, IAM & SageMaker AI infrastructure", usedInProjects: ["STEM Quest", "Genius Labs", "RAG Assistant"] },
  { atomicNumber: 35, symbol: "Az", name: "Microsoft Azure", family: "Cloud & DevOps", logoKey: "azure", description: "Azure VMs, Blob Storage, Functions, App Services, AKS, Entra ID", usedInProjects: ["SolDevPath Cloud Deployments"] },
  { atomicNumber: 36, symbol: "Dk", name: "Docker", family: "Cloud & DevOps", logoKey: "docker", description: "Containerized reproducible microservices & isolated execution", usedInProjects: ["SolScan", "Tedekstra", "NeZaaka"] },
  { atomicNumber: 37, symbol: "K8", name: "Kubernetes", family: "Cloud & DevOps", logoKey: "kubernetes", description: "Container orchestration, rolling deployments, pods & ingress routing", usedInProjects: ["Tedekstra", "SolDevPath"] },
  { atomicNumber: 38, symbol: "Ga", name: "GitHub Actions", family: "Cloud & DevOps", logoKey: "githubactions", description: "CI/CD automated test pipelines, lint gates & zero-downtime releases", usedInProjects: ["Tedekstra", "STEM Quest", "NeZaaka"] },
  { atomicNumber: 39, symbol: "Tf", name: "Terraform", family: "Cloud & DevOps", logoKey: "terraform", description: "Declarative Infrastructure as Code (IaC) for multi-cloud provisioning", usedInProjects: ["SolDevPath Cloud Architecture"] },
  { atomicNumber: 40, symbol: "Lx", name: "Linux & Nginx", family: "Cloud & DevOps", logoKey: "linux", description: "Kernel tuning, reverse proxying, TLS termination & bash automation", usedInProjects: ["DRDO LAN Server", "Tedekstra"] },

  // Security
  { atomicNumber: 41, symbol: "Ds", name: "DevSecOps", family: "Security", logoKey: "security", description: "Shift-left automated vulnerability prevention & CI authorization gates", usedInProjects: ["SolScan", "Tedekstra UK"] },
  { atomicNumber: 42, symbol: "Gd", name: "GDPR Compliance", family: "Security", logoKey: "gdpr", description: "Privacy audits, PII mapping, data retention & regulatory safeguards", usedInProjects: ["SolScan", "Tedekstra Nori HR"] },
  { atomicNumber: 43, symbol: "Sg", name: "Semgrep SAST", family: "Security", logoKey: "semgrep", description: "Static application security testing rulepacks & secrets detection", usedInProjects: ["SolScan", "Tedekstra total-office"] },
  { atomicNumber: 44, symbol: "Zp", name: "OWASP ZAP", family: "Security", logoKey: "owasp", description: "Dynamic application security testing (DAST), spiders & active scans", usedInProjects: ["SolScan", "Tedekstra Repositories"] },
  { atomicNumber: 45, symbol: "Vp", name: "VAPT & Auditing", family: "Security", logoKey: "vapt", description: "Vulnerability assessment, penetration testing coordination & remediation", usedInProjects: ["Tedekstra Nori HR Audit"] },

  // Tools
  { atomicNumber: 46, symbol: "Gt", name: "Git & GitHub", family: "Tools", logoKey: "github", description: "Distributed version control, branch protection & pull request governance", usedInProjects: ["All Client & Open Source Projects"] },
  { atomicNumber: 47, symbol: "Fb", name: "Firebase", family: "Tools", logoKey: "firebase", description: "Authentication, Firestore real-time DB & Cloud Functions", usedInProjects: ["STEM Quest", "Genius Labs"] },
  { atomicNumber: 48, symbol: "Sb", name: "Supabase", family: "Tools", logoKey: "supabase", description: "PostgreSQL BaaS with row-level security & real-time subscriptions", usedInProjects: ["SolDevPath Client Prototypes"] },
  { atomicNumber: 49, symbol: "Pm", name: "Postman", family: "Tools", logoKey: "postman", description: "Automated API contract testing, mocks & environment variables", usedInProjects: ["NeZaaka", "STEM Quest"] },
  { atomicNumber: 50, symbol: "Fg", name: "Figma", family: "Tools", logoKey: "figma", description: "Component-based UI/UX design, wireframing & design token handoffs", usedInProjects: ["NeZaaka", "Bangre-Nooma", "Trade2Foreign"] },
  { atomicNumber: 51, symbol: "Pw", name: "Playwright", family: "Tools", logoKey: "playwright", description: "Multi-browser end-to-end automated regression testing suites & release gates", usedInProjects: ["Tedekstra Operations", "Quality Engineering"] },
  { atomicNumber: 52, symbol: "Pv", name: "Privado", family: "Security", logoKey: "privado", description: "Static code analysis for GDPR data flows, PII mapping & privacy audits", usedInProjects: ["SolScan CLI", "Tedekstra Nori HR"] },
  { atomicNumber: 53, symbol: "Ov", name: "OSV Scanner", family: "Security", logoKey: "osv", description: "Software composition analysis (SCA) catching supply chain vulnerabilities", usedInProjects: ["SolScan CLI", "Enterprise CI Gates"] },
  { atomicNumber: 54, symbol: "Ot", name: "OWASP Top 10", family: "Security", logoKey: "owasp", description: "Web application vulnerability mitigation & penetration test compliance", usedInProjects: ["SolScan", "Tedekstra Audits"] },
  { atomicNumber: 55, symbol: "St", name: "Streamlit", family: "Tools", logoKey: "streamlit", description: "Rapid data application prototypes, model inspection & analytical dashboards", usedInProjects: ["AI Research Prototypes", "Precision Agriculture"] },
  { atomicNumber: 56, symbol: "Se", name: "SEO Architecture", family: "Tools", logoKey: "seo", description: "Technical structured data markup, core web vitals & search crawlability", usedInProjects: ["Bangre-Nooma", "Trade2Foreign", "Shivraj Jewellers"] },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "nezaaka",
    index: "01",
    title: "NeZaaka Marketplace",
    kicker: "West Africa Real Estate & Escrow Platform",
    category: "Full-Stack & Cloud Architecture",
    clientOrOrg: "NeZaaka (nezaaka.com)",
    role: "Lead Full-Stack & Cloud Solutions Architect",
    url: "https://nezaaka.com/",
    description: "Architected, built, and launched the core digital rental platform for NeZaaka, an authenticated real estate marketplace in Abidjan, Côte d'Ivoire. Engineered multi-stakeholder portals for hosts, field verification agents, and tenants with RBAC, integrated localized West African Mobile Money escrow rails, and optimized for low-bandwidth networks.",
    features: [
      "Localized Mobile Money escrow rails (Wave, Orange Money, MTN MoMo) with deposit locking until key handover",
      "Field verification pipeline: geolocated photos, identity audits & title deeds verification",
      "Low-bandwidth optimization: slashed core web vital payloads by 45% for 3G/4G networks",
      "Offline-first client search cache with localized commune filtering (Cocody, Marcory, Yopougon)",
      "Automated SMS/webhook reconciliation preventing double-spending on mobile network drops",
      "Full French i18n localization, FCFA (XOF) currency handling & WhatsApp Business API integration"
    ],
    tech: ["Next.js", "React", "TypeScript", "PostgreSQL", "Docker", "GitHub Actions", "Tailwind CSS"],
    isProductionPlatform: true,
    uiMockType: "marketplace"
  },
  {
    id: "solscan",
    index: "02",
    title: "SolScan DevSecOps CLI",
    kicker: "Automated Privacy & Security CI Gates",
    category: "DevSecOps & Platform Engineering",
    clientOrOrg: "SolDevPath (soldevpath_cli)",
    role: "Architect & Core Engineer",
    description: "Architected and engineered SolScan, a local-first DevSecOps and privacy-scanning CLI orchestrating Privado (GDPR), Semgrep (SAST), OSV Scanner / npm audit (SCA), and OWASP ZAP (DAST) with consolidated Markdown reporting and organization-aware API key CI gates for enterprise supply chains.",
    features: [
      "Orchestrates 4 security engines: Semgrep SAST, OSV Scanner SCA, OWASP ZAP DAST, Privado GDPR",
      "Organization-aware pre-scan API authorization gates enforcing enterprise token policies",
      "Containerized OWASP ZAP dynamic automation with custom authentication endpoints & spidering",
      "Zero-downtime integration rolled out across Tedekstra core production repositories",
      "Generates unified executive Markdown reports triaging severity levels directly in CI/CD pipelines",
      "Supply chain protection catching vulnerable dependencies before code reaches staging"
    ],
    tech: ["Python", "Docker", "Semgrep", "OWASP ZAP", "GitHub Actions", "Linux", "Bash"],
    isProductionPlatform: true,
    uiMockType: "security-cli"
  },
  {
    id: "solami",
    index: "03",
    title: "SolAmi Digital Health",
    kicker: "3D Virtual AI Therapeutic Tutor",
    category: "Multimodal AI & Healthcare",
    clientOrOrg: "SolDevPath In-House Flagship",
    role: "System Designer & AI Engineer",
    description: "Designed and engineered SolAmi, an AI-powered 3D virtual therapeutic tutor platform featuring real-time biometrics, gaze/focus analytics, voice cloning via ElevenLabs, Rhubarb lip-sync, and HL7 FHIR EHR data synchronization. Packaged technical architecture for an $8M Series A investment deck.",
    features: [
      "Real-time webcam biometric tracking: gaze direction, attention score & focus level metrics",
      "Low-latency voice synthesis powered by ElevenLabs with Rhubarb phoneme lip-synchronization",
      "Healthcare interoperability: HL7 FHIR electronic health record (EHR) data sync",
      "3D expressive avatar rendering reactive to student engagement and comprehension feedback",
      "Secure patient data isolation complying with healthcare privacy standards and HIPAA principles",
      "Comprehensive interactive lesson plans adapting dynamically to user frustration signals"
    ],
    tech: ["Python", "PyTorch", "ElevenLabs", "WebSockets", "HL7 FHIR", "Computer Vision", "React"],
    isProductionPlatform: true,
    uiMockType: "health-ai"
  },
  {
    id: "tedekstra-macrotrack",
    index: "04",
    title: "Tedekstra Enterprise Ops",
    kicker: "DevOps & Quality Engineering Suite",
    category: "Cloud Infrastructure & Testing",
    clientOrOrg: "Tedekstra (tedekstra.com)",
    role: "DevOps Consultant & DevSecOps Lead",
    url: "https://tedekstra.com/",
    description: "Spearheaded the end-to-end operational release lifecycle for Tedekstra's MacroTrack Operations module, architected Playwright automated E2E regression suites, governed production release gates, coordinated external penetration testing for the Nori HR platform, and built developer productivity automations.",
    features: [
      "Governed zero-downtime production rollouts for MacroTrack Operations enterprise module",
      "Multi-browser Playwright E2E regression testing suite with zero-defect release verification",
      "Managed external penetration testing logistics & remediation roadmaps for Nori HR platform",
      "Automated internal timesheet submission services & operational reporting micro-utilities",
      "Enforced organization-aware pre-scan security gates (Tedekstra bearer token validation)",
      "Maintained continuous cloud monitoring, Docker deployments & GitHub Actions workflows"
    ],
    tech: ["Playwright", "Docker", "GitHub Actions", "TypeScript", "Node.js", "Nginx", "Linux"],
    isProductionPlatform: true,
    uiMockType: "ops-dashboard"
  },
  {
    id: "trade2foreign",
    index: "05",
    title: "Trade2Foreign Platform",
    kicker: "Global B2B International Trade Portal",
    category: "Full-Stack Web Architecture",
    clientOrOrg: "Trade2Foreign (trade2foreign.com)",
    role: "Lead Full-Stack Architect",
    url: "https://trade2foreign.com/",
    description: "Designed and engineered the full-stack architecture for Trade2Foreign, a global international import-export and B2B trade marketplace. Built high-performance responsive interfaces, cross-border product cataloging, inquiry negotiation workflows, and international buyer-seller verification pipelines.",
    features: [
      "High-scale international B2B catalog architecture supporting multi-category trade listings",
      "Inquiry routing engine connecting verified overseas suppliers with import buyers",
      "Multi-currency conversion handling and global localization for cross-border commerce",
      "Search engine optimization (SEO) architecture driving high organic discoverability",
      "Responsive, accessible design system tailored for commercial enterprise usability",
      "Secure lead verification workflows to eliminate fraudulent trade solicitations"
    ],
    tech: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "SEO Optimization"],
    isProductionPlatform: true,
    uiMockType: "b2b-trade"
  },
  {
    id: "bangre-nooma",
    index: "06",
    title: "Bangre-Nooma Platform",
    kicker: "International Client Digital Infrastructure",
    category: "Cloud Hosting & Web Engineering",
    clientOrOrg: "Bangre-Nooma (bangre-nooma.com)",
    role: "Full-Stack & Cloud Engineer",
    url: "https://bangre-nooma.com/",
    description: "Delivered the complete full-stack web and cloud platform for international client Bangre-Nooma. Architected responsive frontend architecture, scalable cloud infrastructure, secure API pipelines, and search engine optimization.",
    features: [
      "Engineered end-to-end responsive web application architecture for international audiences",
      "Scalable containerized cloud hosting infrastructure with continuous uptime monitoring",
      "Fast API pipelines and clean REST services handling client inquiries and data",
      "Full search engine optimization (SEO) audit and metadata configuration for search visibility",
      "Secure SSL/TLS hardening, automated backups, and static security compliance checks",
      "Modern component-driven UI system maintaining visual consistency across devices"
    ],
    tech: ["Next.js", "React", "Node.js", "Docker", "Tailwind CSS", "SEO Optimization"],
    isProductionPlatform: true,
    uiMockType: "ops-dashboard"
  },
  {
    id: "shivraj-jewellers",
    index: "07",
    title: "Shivraj Jewellers Luxury Storefront",
    kicker: "High-End Jewelry Digital Showcase",
    category: "Luxury E-Commerce & Frontend",
    clientOrOrg: "Shivraj Jewellers (shivrajjewellers.com)",
    role: "Full-Stack Creative Engineer",
    url: "https://shivrajjewellers.com/",
    description: "Crafted the digital storefront and luxury product catalog for Shivraj Jewellers. Designed elegant, ultra-responsive visual showcases for high-value gold and diamond collections with optimized high-resolution image delivery and smooth interactive discovery.",
    features: [
      "Luxury editorial aesthetic with fine typography, micro-interactions, and gold/monochrome palette",
      "High-performance media pipeline: WebP compression, lazy loading, and responsive art direction",
      "Detailed jewelry catalog with purity specifications, weight details, and direct contact inquiry CTAs",
      "Zero-layout-shift responsive performance optimized for mobile-first luxury shoppers",
      "Direct WhatsApp and call routing enabling immediate concierge sales assistance",
      "Structured data & schema markup for local jewelry store SEO and Google search presence"
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive Design", "SEO"],
    isProductionPlatform: true,
    uiMockType: "ecommerce-luxury"
  },
  {
    id: "ieee-crop-health",
    index: "08",
    title: "Precision Agriculture: AI & UAV",
    kicker: "Published IEEE Research (ICTACS 2024)",
    category: "AI & Computer Vision Research",
    clientOrOrg: "IEEE Xplore Published Research",
    role: "Lead Researcher & Author",
    url: "https://ieeexplore.ieee.org/document/10841199",
    description: "Published peer-reviewed research paper 'Analyzing Crop Health Using AI and UAV Technology' (DOI: 10.1109/ICTACS62700.2024.10841199). Developed deep learning computer vision models to assess plant health, automated chlorophyll and xanthophyll level detection, and nutrient deficiency tracking from UAV aerial imagery.",
    features: [
      "Published in IEEE Xplore: DOI 10.1109/ICTACS62700.2024.10841199 at ICTACS 2024 conference",
      "Computer vision pipeline for automated chlorophyll and xanthophyll index detection from aerial video",
      "Deep learning neural networks identifying nutrient deficiencies and pest outbreak stages",
      "Web application interface processing multispectral UAV footage with automated heatmaps",
      "Slashing crop diagnostic latency for agricultural agronomists and farmers",
      "Validated against extensive ground-truth botanical health datasets"
    ],
    tech: ["Python", "TensorFlow", "OpenCV", "UAV Systems", "Deep Learning", "NumPy"],
    isProductionPlatform: false,
    uiMockType: "ieee-uav"
  },
  {
    id: "rag-assistant",
    index: "09",
    title: "Intelligent RAG Document Assistant",
    kicker: "Sub-Second Enterprise Knowledge Retrieval",
    category: "GenAI & Vector Search",
    clientOrOrg: "GenAI Engineering",
    role: "AI/ML Systems Architect",
    description: "Built enterprise-grade RAG system enabling intelligent document querying with context-aware responses. Implemented vector embeddings and semantic search using Pinecone for sub-second retrieval, conversational memory, and multi-document context handling deployed on AWS.",
    features: [
      "Semantic similarity search and vector embeddings in Pinecone for sub-second query retrieval",
      "Multi-document context synthesis with sliding-window chunking and metadata filtering",
      "Conversational memory preserving dialogue history across multi-turn user sessions",
      "FastAPI asynchronous backend with OpenAI streaming token completion",
      "Deployed on AWS with auto-scaling groups and load balancers for enterprise availability",
      "Strict hallucination mitigation with source document page citation footnotes"
    ],
    tech: ["Python", "FastAPI", "Pinecone", "LangChain", "OpenAI API", "AWS"],
    isProductionPlatform: false,
    uiMockType: "rag-agent"
  }
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: "soldevpath",
    year: "2025 – Present",
    period: "2025 – Present",
    role: "Co-Founder & Technical Delivery Lead",
    company: "SolDevPath",
    location: "New Delhi, India",
    type: "experience",
    highlights: [
      "Co-founded software engineering firm executing enterprise delivery, client discovery, and solution architecture globally across the US, UK, Africa, and India.",
      "Architected SolScan: local-first DevSecOps & privacy-scanning CLI orchestrating Privado, Semgrep, OSV Scanner, and OWASP ZAP with CI authorization gates.",
      "Designed SolAmi: multimodal 3D AI virtual therapeutic tutor platform with gaze/biometric tracking, ElevenLabs voice cloning, and HL7 FHIR EHR synchronization ($8M Series A deck).",
      "Engineered and launched production platforms for global clients including Tedekstra (UK), NeZaaka (West Africa), and Bangre-Nooma."
    ],
    metrics: "3+ Enterprise Global Platforms Launched"
  },
  {
    id: "tedekstra",
    year: "2025 – Present",
    period: "2025 – Present",
    role: "DevOps Consultant & DevSecOps Lead (Client Engagement)",
    company: "Tedekstra (tedekstra.com)",
    location: "Liverpool, UK",
    url: "https://tedekstra.com/",
    type: "experience",
    highlights: [
      "Integrated SolScan CLI pipeline across core repositories enforcing pre-scan API authorization gates (expectedOrg: 'Tedekstra').",
      "Automated Semgrep SAST, OSV Scanner Software Composition Analysis (SCA), and containerized OWASP ZAP DAST inside GitHub Actions.",
      "Spearheaded operational release lifecycle for MacroTrack Operations module with multi-browser Playwright E2E automated test suites.",
      "Coordinated trial external penetration testing logistics for Nori HR platform and engineered internal developer automation tools.",
      "Represented Tedekstra by organizing, hosting, and judging the HACK2UK collegiate hackathon at GMIT College (150+ builders)."
    ],
    metrics: "Zero-Downtime Releases & 150+ Mentored"
  },
  {
    id: "nezaaka",
    year: "2025 – Present",
    period: "2025 – Present",
    role: "Lead Full-Stack & Cloud Solutions Architect (Client Engagement)",
    company: "NeZaaka (nezaaka.com)",
    location: "Abidjan, Côte d'Ivoire / West Africa",
    url: "https://nezaaka.com/",
    type: "experience",
    highlights: [
      "Architected and deployed the core digital rental platform and verified property marketplace for the West African market.",
      "Integrated localized West African Mobile Money escrow processing rails (Wave, Orange Money, MTN MoMo) with automatic payout dispersion.",
      "Slashed core web vital payload sizes by 45% on 3G/4G mobile networks with WebP image compression, CDN caching, and offline-first search.",
      "Provisioned containerized Docker infrastructure on PostgreSQL with GitHub Actions CI/CD and automated database backups.",
      "Delivered full French i18n localization, FCFA (XOF) currency handling, and WhatsApp Business API integration."
    ],
    metrics: "-45% Payload & 3 Mobile Money Rails"
  },
  {
    id: "genius-labs",
    year: "2024 – 2025",
    period: "2024 – 2025",
    role: "Founding Developer",
    company: "Genius Labs",
    location: "New Delhi, India",
    type: "experience",
    highlights: [
      "Built entire technology stack from scratch, architecting scalable microservices using Node.js, TypeScript, and Python.",
      "Implemented AI-powered features using LLMs and RAG systems for intelligent document processing and search.",
      "Designed and deployed cloud infrastructure on AWS with CI/CD pipelines, Docker containers, and automated monitoring.",
      "Developed real-time data pipelines and event-driven architectures using message queues and stream processing."
    ],
    metrics: "Full-Stack Zero-to-One Architecture"
  },
  {
    id: "stem-quest",
    year: "2024 – 2025",
    period: "Jul 2024 – Apr 2025",
    role: "Software Development Engineer I",
    company: "STEM Quest Education Pvt. Ltd",
    location: "Noida, India",
    type: "experience",
    highlights: [
      "Built and maintained web applications using Next.js and MongoDB, reducing page load times by 30%.",
      "Designed and implemented a CRM system for workshop management using Next.js, Node.js, Express, MongoDB, and Docker.",
      "Architected Node.js + TypeScript microservices optimizing backend performance by 40% and REST APIs reducing latency by 20%.",
      "Automated workflows via GitHub Actions, managed AWS EC2 deployments, and integrated Firebase JWT authentication.",
      "Contributed to MIT Scratch educational gamification platform (boosting engagement by 25%) and integrated Easebuzz & Trust Signal payment/SMS gateways."
    ],
    metrics: "-30% Load Time, +40% Backend Perf"
  },
  {
    id: "education-degree",
    year: "2020 – 2024",
    period: "2020 – 2024",
    role: "Bachelor of Technology — Computer Science & Engineering",
    company: "Guru Gobind Singh Indraprastha University",
    location: "New Delhi, India",
    type: "education",
    highlights: [
      "Graduated with exceptional academic standing: 9.07 / 10.0 CGPA.",
      "Awarded 29th Departmental Rank overall across the computer science cohort.",
      "President of Leaf Club/Society: organized technical hackathons, workshops, and bootcamps for 150+ students.",
      "Published IEEE research author: 'Analyzing Crop Health Using AI and UAV Technology' (ICTACS 2024)."
    ],
    metrics: "9.07 / 10.0 CGPA · 29th Rank"
  },
  {
    id: "drdo",
    year: "2023",
    period: "May 2023 – Jul 2023",
    role: "Summer Trainee",
    company: "Defence Research and Development Organisation (DRDO)",
    location: "New Delhi, India",
    url: "https://www.drdo.gov.in/",
    type: "experience",
    highlights: [
      "Designed and implemented a Java-based screen recording system capturing real-time video directly to a LAN shared directory.",
      "Built secure web playback interface enabling low-latency streaming access across authenticated LAN devices.",
      "System actively utilized by 20+ defence personnel daily for mission training and documentation purposes."
    ],
    metrics: "20+ Personnel Daily Defense Usage"
  },
  {
    id: "raised-digital",
    year: "2022",
    period: "2022",
    role: "Web Developer Intern",
    company: "Raised Digital",
    location: "India",
    type: "experience",
    highlights: [
      "Developed multi-portal job dashboards for applicant, company, and administrative management tiers.",
      "Built responsive, accessible interfaces using Laravel, PHP, MySQL, and Bootstrap.",
      "Implemented role-based permissions, job posting workflows, and resume submission processing."
    ],
    metrics: "3-Tier Job Portal Architecture"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    index: "01",
    title: "IEEE Published Author — ICTACS 2024",
    issuer: "IEEE Xplore Digital Library",
    category: "Peer-Reviewed Research Publication",
    detail: "Published research paper: 'Analyzing Crop Health Using AI and UAV Technology' (DOI: 10.1109/ICTACS62700.2024.10841199). Computer vision models for chlorophyll, xanthophyll, and nutrient deficiency detection.",
    link: "https://ieeexplore.ieee.org/document/10841199"
  },
  {
    index: "02",
    title: "Technical Speaker — GDG DevFest Jalandhar",
    issuer: "Google Developer Groups (GDG)",
    category: "Technical Keynote & Industry Talk",
    detail: "Delivered invited technical talk on modern web architectures, enterprise developer practices, and scalable front-end systems to developer attendees."
  },
  {
    index: "03",
    title: "Lead Organizer & Host — HACK2UK Hackathon",
    issuer: "Tedekstra / GMIT College",
    category: "Collegiate Hackathon Leadership",
    detail: "Framed technical problem statements, mentored 150+ student developers across 36 hours, and led technical jury evaluations."
  },
  {
    index: "04",
    title: "Co-Organizer — Hack the Mountain",
    issuer: "Hack the Mountain Community",
    category: "Technical Event Organization",
    detail: "Co-organized regional hackathon event, managing logistics, technical tracks, and mentoring collegiate participants."
  },
  {
    index: "05",
    title: "President — Leaf Club/Society",
    issuer: "Guru Gobind Singh Indraprastha University",
    category: "Student Community Leadership",
    detail: "Elected President leading student tech initiatives, organizing coding workshops, technical hackathons, and bootcamps for 150+ students."
  },
  {
    index: "06",
    title: "B.Tech in Computer Science & Engineering (Rank 29th)",
    issuer: "GGSIPU",
    category: "Academic Honours Degree",
    detail: "Graduated with 9.07 / 10.0 CGPA, ranked 29th across the departmental graduating class."
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    index: "01 / 07",
    numberValue: 1,
    numberPrefix: "",
    numberSuffix: "st",
    label: "IEEE Published Paper",
    caption: "ICTACS 2024 · AI & UAV Crop Health",
    detail: "Peer-reviewed research published on IEEE Xplore (DOI: 10.1109/ICTACS62700.2024.10841199).",
    platformOrOrg: "IEEE Xplore",
    logoKey: "ieee"
  },
  {
    index: "02 / 07",
    numberValue: 2,
    numberPrefix: "",
    numberSuffix: "nd",
    label: "Agentic AI Competition",
    caption: "2nd Place Winner",
    detail: "Designed and built collaborative multi-agent autonomous research system in a competitive hackathon.",
    platformOrOrg: "AI Competition",
    logoKey: "agent"
  },
  {
    index: "03 / 07",
    numberValue: 150,
    numberPrefix: "",
    numberSuffix: "+",
    label: "Builders Mentored",
    caption: "HACK2UK Lead & Host",
    detail: "Organized, framed problem tracks, and evaluated 150+ builders at GMIT College on behalf of Tedekstra.",
    platformOrOrg: "HACK2UK",
    logoKey: "tedekstra"
  },
  {
    index: "04 / 07",
    numberValue: 9,
    numberPrefix: "",
    numberSuffix: ".07",
    label: "Academic CGPA",
    caption: "Rank 29th in Department",
    detail: "Guru Gobind Singh Indraprastha University, B.Tech Computer Science & Engineering (2020-2024).",
    platformOrOrg: "GGSIPU",
    logoKey: "education"
  },
  {
    index: "05 / 07",
    numberValue: 3,
    numberPrefix: "",
    numberSuffix: "+",
    label: "Years in Open Source",
    caption: "Hacktoberfest & Repositories",
    detail: "Active contributor across multiple repos: bug hunting, security PR reviews, feature implementations.",
    platformOrOrg: "GitHub",
    logoKey: "github"
  },
  {
    index: "06 / 07",
    numberValue: 6,
    numberPrefix: "",
    numberSuffix: "+",
    label: "Production Deployments",
    caption: "US, UK, Africa & India",
    detail: "SolScan, SolAmi, NeZaaka, Tedekstra, Bangre-Nooma, Trade2Foreign, and Shivraj Jewellers.",
    platformOrOrg: "SolDevPath",
    logoKey: "soldevpath"
  },
  {
    index: "07 / 07",
    numberValue: 45,
    numberPrefix: "-",
    numberSuffix: "%",
    label: "Payload Reduction",
    caption: "NeZaaka West Africa",
    detail: "Optimized mobile core web vitals for 3G/4G networks in Côte d'Ivoire with WebP, CDN & offline cache.",
    platformOrOrg: "NeZaaka",
    logoKey: "nezaaka"
  }
];
