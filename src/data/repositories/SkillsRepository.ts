import { Skill, SkillCategory } from "@/lib/types";
import { skillsMock } from "../mocks/skills.mock";

export interface ISkillsRepository {
  getAll(): Skill[];
  getByCategory(category: SkillCategory): Skill[];
  getHighlighted(): Skill[];
  getById(id: string): Skill | undefined;
}

/**
 * Implementação concreta do repositório
 * Atualmente usa dados mockados, mas pode facilmente migrar para API
 */
export class SkillsRepository implements ISkillsRepository {
  private skills: Skill[];

  constructor(skills: Skill[] = skillsMock) {
    this.skills = skills;
  }

  /**
   * Retorna todas as skills
   * O(1) - Acesso direto ao array
   */
  getAll(): Skill[] {
    return this.skills;
  }

  /**
   * Filtra skills por categoria
   * O(n) - Onde n é o número de skills
   */
  getByCategory(category: SkillCategory): Skill[] {
    return this.skills.filter((skill) => skill.category === category);
  }

  /**
   * Retorna apenas skills destacadas
   * Útil para seções de destaque
   */
  getHighlighted(): Skill[] {
    return this.skills.filter((skill) => skill.highlight);
  }

  /**
   * Busca skill por ID
   * O(n) - Poderia ser O(1) com Map, mas array pequeno não justifica
   */
  getById(id: string): Skill | undefined {
    return this.skills.find((skill) => skill.id === id);
  }
}

// Singleton instance (opcional, mas útil)
export const skillsRepository = new SkillsRepository();
