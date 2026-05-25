// ===== COMPANY INFO =====
export const COMPANY = {
  name: "BKNETWORK SERVICES PVT. LTD.",
  shortName: "BKNETWORK",
  tagline: "Partners in Growth",
  description:
    "An IT solutions company focused on delivering innovative IT services, strategic consulting, and cutting-edge technology implementations.",
  phone: "01204502546",
  email: "sale@bknetwork.in",
  location: "GF-5, 10/17, Addharshila, Sahibabad, Ghaziabad, Uttar Pradesh, Pincode - 201005, India",
  website: "https://bknetwork.in",
  linkedin: "https://www.linkedin.com/company/bknetwork-services-pvt-ltd/",
};

// ===== OFFICES =====
export const OFFICES = [
  {
    type: "Registered Office",
    address:
      "GF-5, 10/17, Addharshila, Sahibabad, Ghaziabad, Uttar Pradesh, Pincode - 201005, India",
  },
];

// ===== BUSINESS HOURS =====
export const BUSINESS_HOURS = [
  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
  { day: "Saturday", time: "10:00 AM – 2:00 PM" },
  { day: "Sunday", time: "Closed" },
];

// ===== NAVIGATION =====
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Services", href: "/services" },
  { label: "Partners in Growth", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

// ===== SERVICES =====
export const SERVICES = [
  {
    id: "it-consulting",
    title: "IT Consulting",
    description:
      "Strategic IT advisory to align technology with your business objectives and drive digital transformation.",
    icon: "Lightbulb",
    features: [
      "Technology Assessment",
      "Digital Strategy",
      "IT Roadmapping",
      "Vendor Selection",
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description:
      "Comprehensive security solutions to protect your digital assets against evolving cyber threats.",
    icon: "Shield",
    features: [
      "Threat Analysis",
      "Penetration Testing",
      "Security Audits",
      "Compliance Management",
    ],
  },
  {
    id: "cloud-services",
    title: "Cloud Services",
    description:
      "End-to-end cloud solutions including migration, management, and optimization across all major platforms.",
    icon: "Cloud",
    features: [
      "Cloud Migration",
      "Multi-Cloud Management",
      "Cost Optimization",
      "Hybrid Solutions",
    ],
  },
  {
    id: "devops-ai",
    title: "DevOps & AI",
    description:
      "Accelerate development cycles with CI/CD pipelines and leverage AI for intelligent automation.",
    icon: "Cpu",
    features: [
      "CI/CD Pipelines",
      "Infrastructure as Code",
      "ML Model Deployment",
      "Process Automation",
    ],
  },
  {
    id: "support",
    title: "24/7 Support",
    description:
      "Round-the-clock technical support ensuring your systems run smoothly with minimal downtime.",
    icon: "Headphones",
    features: [
      "Help Desk",
      "Remote Monitoring",
      "Incident Response",
      "SLA Management",
    ],
  },
  {
    id: "live-streaming",
    title: "Live Streaming",
    description:
      "Professional live streaming infrastructure for corporate events, webinars, and virtual conferences.",
    icon: "Video",
    features: [
      "Event Streaming",
      "Multi-Platform",
      "Studio Setup",
      "Recording & Archival",
    ],
  },
];

// ===== SOLUTIONS =====
export const SOLUTIONS = [
  {
    title: "Enterprise IT Infrastructure",
    description:
      "Build robust, scalable IT infrastructure tailored for enterprise-grade performance and reliability.",
    icon: "Server",
  },
  {
    title: "Digital Transformation",
    description:
      "Modernize legacy systems and processes to drive innovation and operational efficiency.",
    icon: "Zap",
  },
  {
    title: "Business Continuity",
    description:
      "Comprehensive disaster recovery and business continuity planning to safeguard operations.",
    icon: "ShieldCheck",
  },
  {
    title: "Scalable Cloud Architecture",
    description:
      "Design and deploy cloud-native architectures that scale seamlessly with your business growth.",
    icon: "Layers",
  },
  {
    title: "Data Center Solutions",
    description:
      "End-to-end data center design, deployment, and management for optimal performance.",
    icon: "Database",
  },
  {
    title: "Managed IT Services",
    description:
      "Fully managed IT operations letting you focus on core business while we handle technology.",
    icon: "Settings",
  },
];

// ===== PARTNERS =====
export const TECHNOLOGY_PARTNERS = [
  { name: "Acer", logo: "/acer.png" },
  { name: "Lenovo", logo: "/lenovo.png" },
  { name: "Logitech", logo: "/logitech.png" },
  { name: "Hewlett Packard", logo: "/hewlett packard.png" },
  { name: "LG", logo: "/LG.png" },
  { name: "MaxHub", logo: "/Maxhub.png" },
  { name: "Cisco", logo: "/cisco.png" },
  { name: "Wacom", logo: "/wacom.png" },
  { name: "IBM", logo: "/ibm.png" },
  { name: "Hewlett Packard Enterprise", logo: "/Hewlett Packard enterprise.png" },
  { name: "Red Hat", logo: "/redhat.png" },
  { name: "Dell", logo: "/dell.png" },
];

// ===== CLIENTS =====
export const CORPORATE_CLIENTS = [
  "Tata Powers",
  "Patanjali Group",
  "Greenlam Industries",
  "Hitachi Systems MICRO Clinic Pvt. Ltd",
  "Krishna Maruti Limited",
  "Uno Minda",
  "Step by Step Schools, Noida",
];

export const GOVERNMENT_CLIENTS = [
  "Honorable High Court of Madhya Pradesh",
  "Honorable High Court of Bihar",
  "Honorable High Court of Sikkim",
  "Honorable High Court of West Bengal",
  "Honorable High Court of Punjab & Haryana",
  "Lokpal of India",
];

// ===== STATS =====
export const STATS = [
  { label: "Clients Served", value: 150, suffix: "+" },
  { label: "Projects Delivered", value: 500, suffix: "+" },
  { label: "Uptime Guaranteed", value: 99.9, suffix: "%" },
  { label: "Years of Experience", value: 10, suffix: "+" },
];

// ===== FORM OPTIONS =====
export const REQUIRED_SERVICES = [
  "IT Consulting & Strategy",
  "Live Streaming Setup",
  "Network Infrastructure",
  "AI & Machine Learning",
  "IT Support & Maintenance",
  "Cloud Migration & Management",
  "Data Center Setup",
  "DevOps & CI/CD",
  "Software Development",
];

export const PREFERRED_TECHNOLOGIES = [
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "React",
  "Node.js",
  "Python",
  "Java",
  ".NET",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Jenkins",
  "GitLab CI",
  "Terraform",
  "Ansible",
];

export const TARGET_PLATFORMS = [
  "Web Applications",
  "Mobile Apps",
  "Desktop Applications",
  "Cloud Platforms",
  "On-Premise Solutions",
  "Hybrid Solutions",
  "Microservices",
  "Serverless",
  "Container Orchestration",
];

export const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export const BUDGET_RANGES = [
  "Under ₹5 Lakhs",
  "₹5 – ₹15 Lakhs",
  "₹15 – ₹50 Lakhs",
  "₹50 Lakhs – ₹1 Crore",
  "Above ₹1 Crore",
  "To Be Discussed",
];

export const SERVICE_OPTIONS = [
  "IT Consulting",
  "Cybersecurity",
  "Cloud Services",
  "DevOps & AI",
  "24/7 Support",
  "Live Streaming",
  "Enterprise Solutions",
  "Other",
];
