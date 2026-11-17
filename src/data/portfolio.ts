// Centralized portfolio case-study data.
// Source of truth for both the Portfolio page and the chatbot knowledge base.

export interface PortfolioProject {
  id: string;
  title: string;
  category: "ai" | "web" | "mobile" | "data";
  categoryLabel: string;
  desc: string;
  tech: string[];
  challenges: string;
  results: string[];
  feedback: {
    quote: string;
    client: string;
  };
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "ai-chatbot",
    title: "Autonomous Customer Support AI Agent",
    category: "ai",
    categoryLabel: "AI & ML",
    desc: "A multi-agent AI pipeline that classifies ticket intent, queries transactional SQL databases, executes refund APIs, and drafts accurate responses.",
    tech: ["OpenAI GPT-4o", "LangChain", "Pinecone", "FastAPI", "Next.js"],
    challenges: "Handling multi-turn nested customer inquiries and maintaining state when external database endpoints returned partial payloads.",
    results: [
      "Automated 82% of standard invoice support tickets without human escalation.",
      "Average ticket resolution time decreased from 4 hours to under 45 seconds.",
      "Synced vector stores with live PostgreSQL database under 500ms latency.",
    ],
    feedback: {
      quote: "100Solutionz built a support assistant that actually reasons and acts accurately. It has saved us thousands in support operations.",
      client: "Dr. Sarah Jenkins, VP of AI Operations",
    },
  },
  {
    id: "rag-app",
    title: "Secure Enterprise RAG Knowledge Index",
    category: "ai",
    categoryLabel: "AI & ML",
    desc: "A vector search pipeline parsing 50,000 internal documents, spreadsheets, and slides to enable instant internal employee retrieval.",
    tech: ["LlamaIndex", "Qdrant", "Claude 3.5 Sonnet", "Python", "React 19"],
    challenges: "Correctly parsing embedded charts, tables, and images within long PDF documents without permission leaks.",
    results: [
      "Mapped semantic index of 50,000 docs with strict role-based access permissions.",
      "Search results return in under 0.8 seconds with verified citation links.",
      "Reduced duplicate employee research queries by 60%.",
    ],
    feedback: {
      quote: "Our research teams find verified document sources instantly now. An outstanding implementation of RAG technology.",
      client: "Arthur Pendelton, CIO",
    },
  },
  {
    id: "healthcare-ai",
    title: "Computer Vision Anomaly Scanner",
    category: "ai",
    categoryLabel: "AI & ML",
    desc: "A computer vision model training workflow designed to segment anomalies in high-resolution medical scans.",
    tech: ["PyTorch", "OpenCV", "AWS SageMaker", "Docker", "FastAPI"],
    challenges: "Overcoming extreme imbalance in training data arrays and deploying a low-latency GPU inference endpoint on AWS.",
    results: [
      "96.8% accuracy in pixel segmentation models (IOU score of 0.88).",
      "Scan rendering latency under 1.2s using GPU-accelerated instances.",
      "Fully HIPAA-compliant sandbox pipeline deployment.",
    ],
    feedback: {
      quote: "The segmentation model is remarkably precise, speeding up our initial screening workflow significantly.",
      client: "Dr. Elena Rostova, Lead Researcher",
    },
  },
  {
    id: "ecom-platform",
    title: "High-Volume Headless E-Commerce System",
    category: "web",
    categoryLabel: "Web Dev",
    desc: "A headless Shopify store built for a global brand, syncing inventory across three separate warehouse logistics APIs.",
    tech: ["Next.js 16", "Stripe", "GraphQL", "PostgreSQL", "Node.js"],
    challenges: "Preventing inventory collisions during checkout rushes and maintaining a sub-100ms Google Core Web Vitals score.",
    results: [
      "Successfully processed 15,000 checkouts per hour during flash sale events.",
      "Page load speed scored 99/100 on Google Lighthouse.",
      "Synced inventory updates instantly across warehouse management channels.",
    ],
    feedback: {
      quote: "They built a modern shop that loads instantly, handles load without server spikes, and has doubled our mobile checkouts.",
      client: "Marcello Russo, CEO",
    },
  },
  {
    id: "mobile-app",
    title: "Offline-First Mobile Payment App",
    category: "mobile",
    categoryLabel: "Mobile Apps",
    desc: "An offline-first digital wallet app allowing local peer-to-peer scanning and payment queue syncing.",
    tech: ["React Native", "SQLite", "Node.js", "GraphQL", "AWS"],
    challenges: "Resolving transaction order conflicts and validating security tokens offline on mobile devices.",
    results: [
      "Reached 100K+ monthly active users within 6 months of launching.",
      "Synced local queue events seamlessly under 1.5s when network restores.",
      "Scored 4.8 stars in Apple App Store and Google Play Store reviews.",
    ],
    feedback: {
      quote: "Perfect transaction handling, zero critical runtime failures, and an incredibly slick user interface.",
      client: "Amelie Dubois, Product Director",
    },
  },
  {
    id: "dashboard",
    title: "Real-Time Cloud Billing Dashboard",
    category: "data",
    categoryLabel: "Data Science",
    desc: "A data aggregation platform connecting to multiple cloud providers to show real-time cost telemetry.",
    tech: ["React", "D3.js", "BigQuery", "NestJS", "Kubernetes"],
    challenges: "Rendering real-time chart update streams smoothly without freezing the browser thread.",
    results: [
      "Integrated AWS, GCP, and Azure billing API feeds into one unified dashboard.",
      "Rendered charts at 60 FPS using virtualized canvas layers.",
      "Helped customers discover $4M+ in unused cloud hardware allocations.",
    ],
    feedback: {
      quote: "Our clients save thousands monthly using the cost dashboard. The data rendering speed is exceptional.",
      client: "Viktor Vane, VP of Engineering",
    },
  },
];