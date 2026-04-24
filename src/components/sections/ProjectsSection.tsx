// src/components/sections/ProjectsSection.tsx

"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Lock,
  Calendar,
  Award,
  ChevronRight,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { projectsRepository } from "@/data/repositories/ProjectsRepository";
import { ANIMATION_CONFIG } from "@/lib/constants";
import { cn, formatDate } from "@/lib/utils";
import { useMobile } from "@/hooks/useMobile";
import type { Project } from "@/lib/types";
import { FaGithub } from "react-icons/fa";

// ==============================================
// COMPONENTE PRINCIPAL
// ==============================================

export function ProjectsSection() {
  const { isMobile } = useMobile();
  const t = useTranslations("projects");
  const featuredProjects = projectsRepository.getFeatured();
  const otherProjects = projectsRepository.getAll().filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="container-custom py-12 sm:py-16 md:py-20 scroll-mt-20"
    >
      <SectionHeader />

      {/* Projetos em Destaque */}
      <div className="space-y-8 sm:space-y-12">
        {featuredProjects.map((project, index) => (
          <FeaturedProjectCard
            key={project.id}
            project={project}
            index={index}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Outros Projetos (Grid) */}
      {otherProjects.length > 0 && (
        <>
          <h3 className="text-xl sm:text-2xl font-mono font-bold mt-12 sm:mt-16 mb-6">
            <span className="text-primary">$</span> {t("otherProjects")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {otherProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

// ==============================================
// SUB-COMPONENTES
// ==============================================

function SectionHeader() {
  const t = useTranslations("projects");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-8 sm:mb-12"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
        <Award className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-mono text-primary">{t("badge")}</span>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono mb-3">
        <span className="text-primary">$</span> {t("title")}
      </h2>

      <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
        {t("description")}
        <br className="hidden sm:block" />
        <span className="text-primary/80">🔒 {t("private")}</span>{" "}
        {t("privateDesc")}
      </p>
    </motion.div>
  );
}

interface FeaturedProjectCardProps {
  project: Project;
  index: number;
  isMobile: boolean;
}

function FeaturedProjectCard({
  project,
  index,
  isMobile,
}: FeaturedProjectCardProps) {
  const t = useTranslations("projects");
  const locale = useLocale();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "glass-solid rounded-xl sm:rounded-2xl overflow-hidden border",
        project.featured ? "border-primary/30 glow" : "border-border",
      )}
    >
      <div
        className={cn(
          "grid gap-6 p-5 sm:p-6",
          isMobile ? "grid-cols-1" : "grid-cols-2",
        )}
      >
        {/* Conteúdo Textual */}
        <div
          className={cn(
            "flex flex-col justify-between",
            !isMobile && !isEven && "order-2",
          )}
        >
          <div>
            {/* Badge de Projeto Privado */}
            {project.isPrivate && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning/10 border border-warning/30 mb-3">
                <Lock className="w-3 h-3 text-warning" />
                <span className="text-[10px] font-mono text-warning">
                  {t("proprietary")}
                </span>
              </div>
            )}

            {/* Título e Data */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-xl sm:text-2xl font-mono font-bold">
                {project.title}
              </h3>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono shrink-0">
                <Calendar className="w-3 h-3" />
                {formatDate(project.createdAt, "pt")}
              </span>
            </div>

            {/* Descrição - Traduzida */}
            <p className="text-muted-foreground text-sm mb-4">
              {project.description[locale as "pt" | "en"]}
            </p>

            {/* Destaques - Traduzidos */}
            <ul className="space-y-1.5 mb-4">
              {project.highlights[locale as "pt" | "en"].map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs sm:text-sm"
                >
                  <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Tecnologias */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[10px] sm:text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-wrap gap-3">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-mono hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {t("livePreview")}
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/20 text-muted-foreground text-sm font-mono cursor-not-allowed"
                title={t("previewUnavailable")}
              >
                <Lock className="w-4 h-4" />
                {t("previewUnavailable")}
              </button>
            )}

            {project.githubUrl && project.githubUrl !== "#" ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-muted-foreground text-sm font-mono hover:border-primary/50 hover:text-primary transition-colors"
              >
                <FaGithub className="w-4 h-4" />
                {t("code")}
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-muted-foreground text-sm font-mono cursor-not-allowed"
                title={t("privateCode")}
              >
                <Lock className="w-4 h-4" />
                {t("privateCode")}
              </button>
            )}
          </div>
        </div>

        {/* Imagem do Projeto */}
        <div
          className={cn(
            "relative rounded-lg overflow-hidden border border-border bg-card/30",
            "min-h-50 sm:min-h-62.5",
            !isMobile && !isEven && "order-1",
          )}
        >
          {project.isPrivate ? (
            <PrivateProjectPlaceholder project={project} />
          ) : (
            <Image
              src={project.imageUrl}
              alt={`Screenshot do projeto ${project.title}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PrivateProjectPlaceholder({ project }: { project: Project }) {
  const t = useTranslations("projects.privatePlaceholder");

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-linear-to-br from-warning/5 to-warning/10">
      <div className="w-16 h-16 rounded-full bg-warning/10 border border-warning/30 flex items-center justify-center mb-4">
        <Lock className="w-8 h-8 text-warning" />
      </div>
      <p className="text-sm font-mono text-warning mb-2">{t("title")}</p>
      <p className="text-xs text-muted-foreground">
        {t("production")} {project.title.split(" - ")[0]}
      </p>
      <p className="text-xs text-muted-foreground mt-2">{t("confidential")}</p>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations("projects");
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300"
    >
      {/* Imagem do Projeto */}
      <div className="relative h-40 sm:h-48 bg-card/30">
        {project.isPrivate ? (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-warning/5 to-warning/10">
            <Lock className="w-8 h-8 text-warning/50" />
          </div>
        ) : (
          <Image
            src={project.imageUrl}
            alt={`Screenshot do projeto ${project.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>

      <div className="p-5">
        <h4 className="font-mono font-bold mb-2">{project.title}</h4>

        {/* Descrição - Traduzida */}
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {project.description[locale as "pt" | "en"]}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[9px] font-mono rounded-full bg-primary/5 text-primary/80 border border-primary/10"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-0.5 text-[9px] font-mono text-muted-foreground">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Botões */}
        <div className="flex gap-2">
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-primary hover:underline inline-flex items-center gap-1"
            >
              Preview <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
              <Lock className="w-3 h-3" /> {t("privateCode")}
            </span>
          )}

          {project.githubUrl && project.githubUrl !== "#" ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-muted-foreground hover:text-primary inline-flex items-center gap-1"
            >
              GitHub <FaGithub className="w-3 h-3" />
            </a>
          ) : (
            <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
              <Lock className="w-3 h-3" /> {t("privateCode")}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectsSection;
