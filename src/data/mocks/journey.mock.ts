// src/data/mocks/journey.mock.ts

import { JourneyMilestone } from "@/lib/types";

export const journeyMock: JourneyMilestone[] = [
  {
    id: "freelancer-start",
    title: {
      pt: "Desenvolvedor Frontend Freelancer",
      en: "Freelance Frontend Developer",
    },
    company: "Autônomo",
    location: "Remoto",
    startDate: new Date("2022-01-01"),
    endDate: new Date("2023-08-31"),
    type: "work",
    description: {
      pt: "Iniciei minha jornada como desenvolvedor freelancer, atendendo clientes nacionais e internacionais. Foco em Vue.js e construção de dashboards personalizados.",
      en: "Started my journey as a freelance developer, serving national and international clients. Focus on Vue.js and building custom dashboards.",
    },
    achievements: {
      pt: [
        "Desenvolvimento de dashboards personalizados em Vue 2/3",
        "Migração de aplicações legadas Vue 2 para Vue 3",
        "Integração com APIs REST para visualização de dados",
        "Criação de componentes reutilizáveis e responsivos",
        "Atendimento a clientes internacionais (inglês avançado)",
      ],
      en: [
        "Custom dashboard development in Vue 2/3",
        "Legacy application migration from Vue 2 to Vue 3",
        "REST API integration for data visualization",
        "Reusable and responsive component creation",
        "International client service (advanced English)",
      ],
    },
    technologies: ["Vue.js 2/3", "JavaScript", "Vite", "Pinia", "REST APIs"],
    highlight: false,
  },
  {
    id: "wisehome-start",
    title: {
      pt: "Desenvolvedor Frontend",
      en: "Frontend Developer",
    },
    company: "WiseHome",
    location: "Hortolândia, SP",
    startDate: new Date("2023-09-01"),
    type: "work",
    description: {
      pt: "Entrei na WiseHome para atuar no desenvolvimento do dashboard principal de automação residencial. Stack principal: React, TypeScript e Node.js.",
      en: "Joined WiseHome to work on the main home automation dashboard. Main stack: React, TypeScript, and Node.js.",
    },
    achievements: {
      pt: [
        "Desenvolvimento do dashboard principal em React",
        "Implementação de visualizações interativas e upload de arquivos",
        "Integração com APIs REST em Node.js e SQL Server",
        "Otimização de performance e responsividade",
        "Colaboração com time de backend para novas features",
      ],
      en: [
        "Main dashboard development in React",
        "Implementation of interactive visualizations and file uploads",
        "REST API integration with Node.js and SQL Server",
        "Performance and responsiveness optimization",
        "Backend team collaboration for new features",
      ],
    },
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "SQL Server",
      "Azure",
      "Tailwind CSS",
    ],
    highlight: true,
    isCurrent: true,
  },
  {
    id: "wisehome-promotion",
    title: {
      pt: "Condecoração Júnior",
      en: "Junior Developer Recognition",
    },
    company: "WiseHome",
    location: "Hortolândia, SP",
    startDate: new Date("2024-09-01"),
    type: "achievement",
    description: {
      pt: "Após 1 ano de trabalho, fui reconhecido e condecorado oficialmente como Desenvolvedor Júnior, validando minha evolução técnica e contribuições para o produto.",
      en: "After 1 year of work, I was recognized and officially decorated as a Junior Developer, validating my technical evolution and contributions to the product.",
    },
    achievements: {
      pt: [
        "Reconhecimento formal da liderança técnica",
        "Liderança no desenvolvimento frontend do dashboard",
        "Contribuições significativas para o produto principal",
        "Domínio comprovado de React e TypeScript",
        "Integração efetiva com time multidisciplinar",
      ],
      en: [
        "Formal recognition from technical leadership",
        "Frontend dashboard development leadership",
        "Significant contributions to the main product",
        "Proven mastery of React and TypeScript",
        "Effective integration with multidisciplinary team",
      ],
    },
    technologies: ["React", "TypeScript", "Azure", "Node.js"],
    highlight: true,
    media: {
      type: "video",
      url: "/assets/condecoracao.mp4",
      caption: {
        pt: "Momento da condecoração como Desenvolvedor Júnior",
        en: "Junior Developer recognition moment",
      },
    },
  },
  {
    id: "azure-certification",
    title: {
      pt: "Certificação Microsoft Azure",
      en: "Microsoft Azure Certification",
    },
    company: "Microsoft",
    location: "Online",
    startDate: new Date("2024-09-01"),
    type: "certification",
    description: {
      pt: "Microsoft Certified: Azure Data Fundamentals (DP-900)",
      en: "Microsoft Certified: Azure Data Fundamentals (DP-900)",
    },
    achievements: {
      pt: [
        "Compreensão de conceitos de dados em nuvem",
        "Serviços Azure para armazenamento e processamento",
        "Preparação para arquiteturas fullstack escaláveis",
      ],
      en: [
        "Understanding of cloud data concepts",
        "Azure services for storage and processing",
        "Preparation for scalable fullstack architectures",
      ],
    },
    technologies: ["Azure", "Cloud Computing", "SQL Database", "Blob Storage"],
    highlight: false,
  },
  {
    id: "azure-database-admin",
    title: {
      pt: "Azure Database Administrator",
      en: "Azure Database Administrator",
    },
    company: "Microsoft",
    location: "Online",
    startDate: new Date("2025-02-01"),
    type: "certification",
    description: {
      pt: "Microsoft Certified: Azure Database Administrator Associate (DP-300)",
      en: "Microsoft Certified: Azure Database Administrator Associate (DP-300)",
    },
    achievements: {
      pt: [
        "Administração de bancos de dados em nuvem",
        "Otimização de performance e segurança",
        "Preparação para transição Fullstack com C#",
      ],
      en: [
        "Cloud database administration",
        "Performance and security optimization",
        "Preparation for Fullstack transition with C#",
      ],
    },
    technologies: [
      "Azure SQL",
      "Database Administration",
      "T-SQL",
      "Performance Tuning",
    ],
    highlight: true,
  },
];

Object.freeze(journeyMock);
