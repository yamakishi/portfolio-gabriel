/** Níveis de proficiência para skills */
export type ProficiencyLevel =
  | "expert"
  | "advanced"
  | "intermediate"
  | "learning";

/** Categorias de skills */
export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "tools"
  | "devops";

/** Tipos de milestones na jornada */
export type MilestoneType =
  | "work"
  | "achievement"
  | "certification"
  | "education";

/** Idiomas suportados */
export type Language = "pt" | "en";

// ==============================================
// ENTIDADES
// ==============================================

/** Entidade Skill - Representa uma habilidade técnica */
export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly level: ProficiencyLevel;
  readonly category: SkillCategory;
  readonly yearsOfExperience?: number;
  readonly highlight: boolean;
}

/** Entidade Project - Representa um projeto do portfólio */
export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: Record<Language, string>;
  readonly technologies: readonly string[];
  readonly githubUrl: string;
  readonly demoUrl?: string;
  readonly imageUrl: string;
  readonly featured: boolean;
  readonly createdAt: Date;
  readonly highlights: Record<Language, readonly string[]>;
  readonly isPrivate?: boolean;
}

/** Entidade JourneyMilestone */
export interface JourneyMilestone {
  readonly id: string;
  readonly title: Record<Language, string>;
  readonly company: string;
  readonly location: string;
  readonly startDate: Date;
  readonly endDate?: Date;
  readonly type: MilestoneType;
  readonly description: Record<Language, string>;
  readonly achievements: Record<Language, readonly string[]>;
  readonly technologies: readonly string[];
  readonly highlight: boolean;
  readonly isCurrent?: boolean;
  readonly media?: JourneyMedia;
}

/** Mídia associada a um milestone (vídeo ou imagem) */
export interface JourneyMedia {
  readonly type: "image" | "video";
  readonly url: string;
  readonly caption?: Record<Language, string>;
}

// ==============================================
// DTOs (Data Transfer Objects)
// ==============================================

/** DTO para formulário de contato */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** DTO para resposta da API de contato */
export interface ContactApiResponse {
  success: boolean;
  message: string;
}

// ==============================================
// CONFIGURAÇÕES DE UI (Strategy Pattern)
// ==============================================

/** Configuração visual para cada nível de proficiência */
export interface LevelUIConfig {
  readonly color: string;
  readonly size: string;
  readonly label: Record<Language, string>;
}

// ==============================================
// TIPOS PARA COMPONENTES
// ==============================================

/** Props para o componente NavLink */
export interface NavItem {
  labelKey: string;
  href: string;
  icon: React.ReactNode;
}

/** Configuração de tema */
export type Theme = "dark" | "light";

/** Status de envio do formulário */
export type SubmitStatus = "idle" | "success" | "error";

/** Estado de carregamento genérico */
export type LoadingState = "idle" | "loading" | "loaded" | "error";

// ==============================================
// TIPOS PARA REPOSITÓRIOS
// ==============================================

/** Interface base para repositórios (Dependency Inversion) */
export interface IRepository<T> {
  getAll(): T[];
  getById(id: string): T | undefined;
}

/** Interface específica para SkillsRepository */
export interface ISkillsRepository extends IRepository<Skill> {
  getByCategory(category: SkillCategory): Skill[];
  getHighlighted(): Skill[];
}

/** Interface específica para ProjectsRepository */
export interface IProjectsRepository extends IRepository<Project> {
  getFeatured(): Project[];
  getPublic(): Project[];
}

/** Interface específica para JourneyRepository */
export interface IJourneyRepository extends IRepository<JourneyMilestone> {
  getByType(type: MilestoneType): JourneyMilestone[];
  getHighlighted(): JourneyMilestone[];
  getCurrent(): JourneyMilestone | undefined;
}
