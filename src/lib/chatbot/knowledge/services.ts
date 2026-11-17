// Verified services extracted from src/app/services/page.tsx

export interface ServiceItem {
  id: string;
  label: string;
  title: string;
  tagline: string;
  subServices: { name: string; desc: string }[];
  tech: string[];
}

export const servicesKnowledge: ServiceItem[] = [
  {
    id: "ai",
    label: "AI & Machine Learning",
    title: "Enterprise Artificial Intelligence & Autonomous Systems",
    tagline: "Supercharge workflows with semantic indexing, natural dialogue, and autonomous agent loops.",
    subServices: [
      { name: "Autonomous AI Agents", desc: "Multi-agent pipelines that retrieve data, execute external APIs, and self-correct." },
      { name: "Enterprise RAG Architectures", desc: "Connect LLMs safely to your corporate databases and documentation with zero training leakage." },
      { name: "Fine-Tuned Domain Models", desc: "Custom model weights optimized for domain terminology, compliance, and reduced inference cost." },
      { name: "Computer Vision & OCR", desc: "Document entity parsing, contract analysis, and real-time visual inspection." },
      { name: "Natural Language Processing (NLP)", desc: "Sentiment analysis, entity extraction, auto-summarization, and multi-lingual translation." },
    ],
    tech: ["GPT-4o", "Claude 3.5 Sonnet", "LangChain", "LlamaIndex", "Pinecone", "Qdrant", "FastAPI"],
  },
  {
    id: "web",
    label: "Web & SaaS Development",
    title: "High-Performance Web Platforms & SaaS Architectures",
    tagline: "Scalable frontend structures combined with high-throughput database endpoints.",
    subServices: [
      { name: "Multi-Tenant SaaS Dashboards", desc: "Subscription billing, team organizations, usage analytics, and role-based permissions." },
      { name: "Corporate & Marketing Portals", desc: "Fast-loading landing experiences with modern typography, dynamic animations, and complete SEO." },
      { name: "Custom E-Commerce Engines", desc: "Multi-currency checkout pipelines, automated warehouse sync, and headless architectures." },
    ],
    tech: ["Next.js 16 (Turbopack)", "React 19", "TypeScript", "Tailwind CSS v4", "Node.js", "PostgreSQL"],
  },
  {
    id: "mobile",
    label: "Mobile Development",
    title: "Native & Cross-Platform Mobile Applications",
    tagline: "Fluid gesture tracking, offline synchronization, and native ecosystem integrations.",
    subServices: [
      { name: "Native iOS Applications", desc: "Swift & SwiftUI engineering optimized for performance, widgets, and background sync." },
      { name: "Native Android Applications", desc: "Kotlin architectures built with modern Material guidelines and robust services." },
      { name: "Cross-Platform Frameworks", desc: "High-efficiency React Native or Flutter setups to target iOS and Android with unified code." },
    ],
    tech: ["React Native", "Flutter", "SwiftUI", "Kotlin", "Firebase", "SQLite", "GraphQL"],
  },
  {
    id: "data",
    label: "Data Science & BI",
    title: "Advanced Business Intelligence & Predictive Analytics",
    tagline: "Aggregate unstructured events into metrics boards and predictive analytics models.",
    subServices: [
      { name: "Interactive Business Dashboards", desc: "React analytics visual decks connecting directly to internal server databases." },
      { name: "Predictive Analytics & Forecasting", desc: "Machine learning algorithms modeling customer churn, revenue projections, and demand." },
      { name: "Automated Data Ingestion Pipelines", desc: "Scrapers and ETL data channels compiling disparate databases into unified lakes." },
    ],
    tech: ["Python", "Pandas & NumPy", "Apache Kafka", "PostgreSQL", "Snowflake", "Chart.js"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    title: "Scalable Cloud Hosting & Automated CI/CD Infrastructure",
    tagline: "Infrastructure as Code, dockerized containers, and horizontal auto-scalers.",
    subServices: [
      { name: "Cloud Architecture (AWS / GCP / Azure)", desc: "High-availability networks, serverless edge functions, and secure firewalls." },
      { name: "DevOps CI/CD Automation", desc: "GitHub Actions, automated test runs, linting gates, and zero-downtime releases." },
      { name: "Kubernetes Container Clustering", desc: "Self-healing Docker stacks with dynamic ingress routing and resource caps." },
    ],
    tech: ["AWS (EKS, RDS, S3)", "Google Cloud", "Docker & Kubernetes", "Terraform", "GitHub Actions"],
  },
];