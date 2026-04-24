// src/data/repositories/ProjectsRepository.ts

import { Project } from "@/lib/types";
import { projectsMock } from "../mocks/projects.mock";

/**
 * Repository Pattern - Abstração da fonte de dados de projetos
 * SOLID: Dependency Inversion
 */
export interface IProjectsRepository {
  getAll(): Project[];
  getFeatured(): Project[];
  getById(id: string): Project | undefined;
  getPublic(): Project[];
}

export class ProjectsRepository implements IProjectsRepository {
  private projects: Project[];

  constructor(projects: Project[] = projectsMock) {
    // Ordena por data (mais recente primeiro) e depois por destaque
    this.projects = [...projects].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }

  getAll(): Project[] {
    return this.projects;
  }

  getFeatured(): Project[] {
    return this.projects.filter((p) => p.featured);
  }

  getById(id: string): Project | undefined {
    return this.projects.find((p) => p.id === id);
  }

  // Retorna apenas projetos que podem ser exibidos publicamente
  getPublic(): Project[] {
    return this.projects;
  }
}

export const projectsRepository = new ProjectsRepository();
