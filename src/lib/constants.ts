import { LevelUIConfig, ProficiencyLevel, SkillCategory } from "./types";

// Informações Pessoais
export const PERSONAL_INFO = {
  name: "Gabriel Yamakishi",
  title: {
    pt: "Desenvolvedor Fullstack • React • Next.js • TypeScript • C#",
    en: "Fullstack Developer • React • Next.js • TypeScript • C#",
  },
  location: {
    pt: "Hortolândia, SP - Brasil",
    en: "Hortolândia, SP - Brazil",
  },
  email: "gabriel.yamakishi@gmail.com",
  phone: "(19) 97123-7194",
  linkedin: "https://linkedin.com/in/gabriel-yamakishi-13a6361a3",
  github: "https://github.com/yamakishi",
  portfolio: "https://yamakishi.dev",
} as const;

// Configuração de UI por nível de proficiência
export const LEVEL_CONFIG: Record<ProficiencyLevel, LevelUIConfig> = {
  expert: {
    color: "bg-primary text-primary-foreground border-primary",
    size: "text-sm sm:text-base px-4 py-2",
    label: {
      pt: "Especialista",
      en: "Expert",
    },
  },
  advanced: {
    color: "bg-primary/20 text-primary border-primary/30",
    size: "text-xs sm:text-sm px-3 py-1.5",
    label: {
      pt: "Avançado",
      en: "Advanced",
    },
  },
  intermediate: {
    color: "bg-secondary/20 text-secondary border-secondary/30",
    size: "text-xs sm:text-sm px-3 py-1.5",
    label: {
      pt: "Intermediário",
      en: "Intermediate",
    },
  },
  learning: {
    color: "bg-muted/20 text-muted-foreground border-border",
    size: "text-xs px-2.5 py-1",
    label: {
      pt: "Estudando",
      en: "Learning",
    },
  },
} as const;

// Cores por categoria
export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  frontend: "from-primary/20 to-primary/5",
  backend: "from-secondary/20 to-secondary/5",
  database: "from-emerald-500/20 to-emerald-500/5",
  tools: "from-orange-500/20 to-orange-500/5",
  devops: "from-purple-500/20 to-purple-500/5",
} as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Configurações de animação
export const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: "easeInOut" },
} as const;
