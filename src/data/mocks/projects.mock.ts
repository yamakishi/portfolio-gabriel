// src/data/mocks/projects.mock.ts

import { Project } from "@/lib/types";

export const projectsMock: Project[] = [
  {
    id: "ecommerce-analytics",
    title: "E-commerce Analytics Dashboard",
    description: {
      pt: "Dashboard analítico para e-commerce com métricas de vendas, comportamento do usuário e performance de produtos. Interface responsiva com gráficos interativos e exportação de relatórios.",
      en: "Analytics dashboard for e-commerce with sales metrics, user behavior, and product performance. Responsive interface with interactive charts and report export.",
    },
    technologies: ["React", "TypeScript", "Recharts", "Tailwind CSS", "Vite"],
    githubUrl: "https://github.com/yamakishi/ecommerce-analytics-portfolio",
    demoUrl: "https://ecommerce-analytics-portfolio.vercel.app/",
    imageUrl: "/assets/Ecoanalytics.png",
    featured: true,
    createdAt: new Date("2024-10-15"),
    highlights: {
      pt: [
        "Dashboard interativo com Recharts",
        "Design responsivo mobile-first",
        "Filtros avançados por período",
        "Exportação de dados em CSV",
      ],
      en: [
        "Interactive dashboard with Recharts",
        "Mobile-first responsive design",
        "Advanced period filters",
        "CSV data export",
      ],
    },
  },
  {
    id: "wisehome-dashboard",
    title: "WiseHome - Dashboard de Automação Residencial",
    description: {
      pt: "Dashboard principal para gerenciamento de dispositivos IoT em automação residencial. Sistema complexo com controle em tempo real, upload de arquivos e wiki interna. (Código proprietário - Preview não disponível)",
      en: "Main dashboard for IoT device management in home automation. Complex system with real-time control, file uploads, and internal wiki. (Proprietary code - Preview not available)",
    },
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "SQL Server",
      "Azure",
      "REST APIs",
    ],
    githubUrl: "#",
    demoUrl: undefined,
    imageUrl: "/assets/dash.png",
    featured: true,
    createdAt: new Date("2023-09-01"),
    highlights: {
      pt: [
        "Liderança técnica do frontend",
        "Integração com APIs REST em Node.js",
        "Otimização de performance (Core Web Vitals)",
        "Arquitetura escalável para múltiplos dispositivos",
      ],
      en: [
        "Frontend technical leadership",
        "REST API integration with Node.js",
        "Performance optimization (Core Web Vitals)",
        "Scalable architecture for multiple devices",
      ],
    },
    isPrivate: true,
  },
  {
    id: "portfolio-2026",
    title: "Portfólio 3D Interativo",
    description: {
      pt: "Este portfólio que você está navegando. Construído com Next.js 15, TypeScript, Three.js e Framer Motion. Arquitetura limpa seguindo princípios SOLID e Clean Code.",
      en: "This portfolio you are browsing. Built with Next.js 15, TypeScript, Three.js, and Framer Motion. Clean architecture following SOLID principles and Clean Code.",
    },
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Three.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
    githubUrl: "https://github.com/yamakishi/portfolio-2026",
    demoUrl: "https://yamakishi.dev",
    imageUrl: "/assets/Portfolio.png",
    featured: true,
    createdAt: new Date("2026-01-01"),
    highlights: {
      pt: [
        "Arquitetura SOLID e Clean Code",
        "Renderização 3D com Three.js",
        "Internacionalização PT/EN",
        "Performance otimizada (Lighthouse 95+)",
      ],
      en: [
        "SOLID architecture and Clean Code",
        "3D rendering with Three.js",
        "PT/EN internationalization",
        "Optimized performance (Lighthouse 95+)",
      ],
    },
  },
  {
    id: "vue-migration-freelance",
    title: "Migração Vue 2 → Vue 3 (Freelance)",
    description: {
      pt: "Projeto de migração e refatoração de sistema legado de Vue 2 para Vue 3, com modernização da arquitetura e implementação de Composition API. Aumento significativo de performance e manutenibilidade.",
      en: "Migration and refactoring project from Vue 2 to Vue 3, with architecture modernization and Composition API implementation. Significant increase in performance and maintainability.",
    },
    technologies: ["Vue 3", "Composition API", "TypeScript", "Pinia", "Vite"],
    githubUrl: "#",
    demoUrl: undefined,
    imageUrl: "/assets/vue-migration.png",
    featured: false,
    createdAt: new Date("2023-06-01"),
    highlights: {
      pt: [
        "Migração completa de código legado",
        "Implementação de Composition API",
        "Melhoria de performance em 40%",
        "Criação de componentes reutilizáveis",
      ],
      en: [
        "Complete legacy code migration",
        "Composition API implementation",
        "40% performance improvement",
        "Reusable component creation",
      ],
    },
    isPrivate: true,
  },
];

Object.freeze(projectsMock);
