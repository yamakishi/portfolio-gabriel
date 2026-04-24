// src/components/sections/SkillsSection.tsx

"use client";

import { motion } from "framer-motion";
import { Code2, Database, Server, Wrench, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { skillsRepository } from "@/data/repositories/SkillsRepository";
import { LEVEL_CONFIG, ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/useMobile";
import type { Skill, ProficiencyLevel } from "@/lib/types";

/**
 * SkillsSection - Vitrine de habilidades técnicas
 * SOLID:
 * - Single Responsibility: Apenas exibe e organiza skills
 * - Open/Closed: Fácil adicionar novas categorias
 * - Dependency Inversion: Depende do Repository (abstração)
 */
export function SkillsSection() {
  const { isMobile } = useMobile();
  const t = useTranslations("skills");

  // Dados via Repository Pattern
  const allSkills = skillsRepository.getAll();
  const frontendSkills = skillsRepository.getByCategory("frontend");
  const backendSkills = skillsRepository.getByCategory("backend");
  const databaseSkills = skillsRepository.getByCategory("database");
  const toolsSkills = skillsRepository.getByCategory("tools");
  const devopsSkills = skillsRepository.getByCategory("devops");

  return (
    <section
      id="skills"
      className="container-custom py-12 sm:py-16 md:py-20"
      aria-labelledby="skills-heading"
    >
      <SectionHeader />

      <motion.div
        initial={ANIMATION_CONFIG.initial}
        whileInView={ANIMATION_CONFIG.animate}
        viewport={{ once: true, margin: "-50px" }}
        transition={ANIMATION_CONFIG.transition}
        className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-primary/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* FRONTEND - Especialidade (2 colunas) */}
          <div className="lg:col-span-2">
            <CategorySection
              title={t("frontend")}
              subtitle={t("frontendSubtitle")}
              icon={<Code2 className="w-5 h-5" />}
              skills={frontendSkills}
              variant="primary"
            />
          </div>

          {/* BACKEND - C# / Node.js */}
          <CategorySection
            title={t("backend")}
            subtitle={t("backendSubtitle")}
            icon={<Server className="w-5 h-5" />}
            skills={backendSkills}
            variant="secondary"
          />

          {/* DATABASE */}
          <CategorySection
            title={t("database")}
            subtitle={t("databaseSubtitle")}
            icon={<Database className="w-5 h-5" />}
            skills={databaseSkills}
            variant="secondary"
          />

          {/* TOOLS + DEVOPS (2 colunas) */}
          <div className="lg:col-span-2">
            <CategorySection
              title={t("tools")}
              subtitle={t("toolsSubtitle")}
              icon={<Wrench className="w-5 h-5" />}
              skills={[...toolsSkills, ...devopsSkills]}
              variant="secondary"
            />
          </div>
        </div>

        <Legend />
        <Stats totalSkills={allSkills.length} />
      </motion.div>
    </section>
  );
}

// ==============================================
// SUB-COMPONENTES (Composition Pattern)
// ==============================================

function SectionHeader() {
  const t = useTranslations("skills");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-8 sm:mb-12"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
        <TrendingUp className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-mono text-primary">{t("badge")}</span>
      </div>

      <h2
        id="skills-heading"
        className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono mb-3"
      >
        <span className="text-primary">$</span> {t("title")}
      </h2>

      <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
        {t("description")}{" "}
        <span className="text-primary font-semibold">3+ anos</span>{" "}
        {t("description2")}
      </p>
    </motion.div>
  );
}

// ==============================================
// CATEGORY SECTION
// ==============================================

interface CategorySectionProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  skills: Skill[];
  variant: "primary" | "secondary";
}

function CategorySection({
  title,
  subtitle,
  icon,
  skills,
  variant,
}: CategorySectionProps) {
  // Strategy Pattern: Ordenação por nível
  const sortedSkills = [...skills].sort((a, b) => {
    const levelOrder: Record<ProficiencyLevel, number> = {
      expert: 0,
      advanced: 1,
      intermediate: 2,
      learning: 3,
    };
    return (
      levelOrder[a.level] - levelOrder[b.level] || a.name.localeCompare(b.name)
    );
  });

  return (
    <div
      className={cn(
        "rounded-lg p-4 sm:p-6 h-full",
        variant === "primary"
          ? "bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20"
          : "bg-card/50 border border-border",
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            "p-2 rounded-lg",
            variant === "primary"
              ? "bg-primary/20 text-primary"
              : "bg-secondary/20 text-secondary",
          )}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-mono font-bold">{title}</h3>
          <p className="text-xs text-muted-foreground">
            {subtitle} • {skills.length}{" "}
            {skills.length === 1 ? "tecnologia" : "tecnologias"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {sortedSkills.map((skill, index) => (
          <SkillBadge key={skill.id} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}

// ==============================================
// SKILL BADGE (Átomo)
// ==============================================

interface SkillBadgeProps {
  skill: Skill;
  index: number;
}

function SkillBadge({ skill, index }: SkillBadgeProps) {
  const config = LEVEL_CONFIG[skill.level];
  const t = useTranslations("skills.legend");

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className={cn(
        "inline-flex items-center justify-center",
        "font-mono font-medium",
        "rounded-full border",
        "transition-all duration-300",
        "hover:scale-105 hover:shadow-lg",
        "cursor-default",
        config.color,
        config.size,
        skill.highlight &&
          "ring-2 ring-primary/30 ring-offset-2 ring-offset-background",
      )}
      title={`${skill.name} - ${t(skill.level)}${skill.yearsOfExperience ? ` • ${skill.yearsOfExperience} anos` : ""}`}
      role="listitem"
    >
      {skill.name}
      {skill.yearsOfExperience && skill.level !== "learning" && (
        <span className="ml-1.5 text-[10px] opacity-70">
          {skill.yearsOfExperience}y
        </span>
      )}
    </motion.span>
  );
}

// ==============================================
// LEGEND
// ==============================================

function Legend() {
  const t = useTranslations("skills.legend");
  const levels: ProficiencyLevel[] = [
    "expert",
    "advanced",
    "intermediate",
    "learning",
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
      {levels.map((level) => {
        const config = LEVEL_CONFIG[level];
        return (
          <div
            key={level}
            className="flex items-center gap-1.5 sm:gap-2"
            title={t(level)}
          >
            <div
              className={cn(
                "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full",
                config.color.split(" ")[0],
              )}
            />
            <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">
              {t(level)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ==============================================
// STATS
// ==============================================

function Stats({ totalSkills }: { totalSkills: number }) {
  const t = useTranslations("skills.stats");
  const expertCount = skillsRepository
    .getAll()
    .filter((s) => s.level === "expert").length;
  const highlightedCount = skillsRepository.getHighlighted().length;

  return (
    <div className="mt-6 pt-4 border-t border-border">
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center">
        <StatItem value={totalSkills} label={t("technologies")} />
        <StatItem value={expertCount} label={t("specialist")} highlight />
        <StatItem value={highlightedCount} label={t("highlights")} />
        <StatItem value={3} label={t("yearsFrontend")} highlight />
      </div>
    </div>
  );
}

function StatItem({
  value,
  label,
  highlight = false,
}: {
  value: number;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={cn(
          "text-xl sm:text-2xl font-bold font-mono",
          highlight ? "text-primary" : "text-foreground",
        )}
      >
        {value}
      </span>
      <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default SkillsSection;
