// src/components/sections/JourneySection.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Award,
  GraduationCap,
  Calendar,
  MapPin,
  ChevronRight,
  Trophy,
  Play,
  Star,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { journeyRepository } from "@/data/repositories/JourneyRepository";
import { ANIMATION_CONFIG } from "@/lib/constants";
import { cn, formatDate } from "@/lib/utils";
import { useMobile } from "@/hooks/useMobile";
import type { JourneyMilestone, MilestoneType } from "@/lib/types";

// ==============================================
// CONFIGURAÇÃO DE ÍCONES POR TIPO
// ==============================================

function useTypeConfig() {
  const t = useTranslations("journey.types");

  const config: Record<
    MilestoneType,
    { icon: React.ReactNode; color: string; labelKey: string }
  > = {
    work: {
      icon: <Briefcase className="w-4 h-4" />,
      color: "bg-primary/20 text-primary border-primary/30",
      labelKey: "work",
    },
    achievement: {
      icon: <Trophy className="w-4 h-4" />,
      color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
      labelKey: "achievement",
    },
    certification: {
      icon: <Award className="w-4 h-4" />,
      color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30",
      labelKey: "certification",
    },
    education: {
      icon: <GraduationCap className="w-4 h-4" />,
      color: "bg-secondary/20 text-secondary border-secondary/30",
      labelKey: "education",
    },
  };

  return { config, t };
}

// ==============================================
// COMPONENTE PRINCIPAL
// ==============================================

export function JourneySection() {
  const { isMobile } = useMobile();
  const milestones = journeyRepository.getAll();
  const currentMilestone = journeyRepository.getCurrent();
  const highlightedMilestones = journeyRepository.getHighlighted();

  return (
    <section
      id="journey"
      className="container-custom py-12 sm:py-16 md:py-20 scroll-mt-20"
    >
      <SectionHeader />

      {currentMilestone && <CurrentPositionCard milestone={currentMilestone} />}

      {highlightedMilestones.length > 0 && (
        <div className="mb-8 sm:mb-12">
          <HighlightsHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {highlightedMilestones.map((milestone) => (
              <HighlightCard key={milestone.id} milestone={milestone} />
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary/50 via-border to-border -translate-x-1/2" />

        <div className="space-y-6 sm:space-y-8">
          {milestones.map((milestone, index) => (
            <TimelineItem
              key={milestone.id}
              milestone={milestone}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      <JourneyStats />
    </section>
  );
}

// ==============================================
// SUB-COMPONENTES
// ==============================================

function SectionHeader() {
  const t = useTranslations("journey");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-8 sm:mb-12"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
        <Trophy className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-mono text-primary">{t("badge")}</span>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono mb-3">
        <span className="text-primary">$</span> {t("title")}
      </h2>

      <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
        {t("description")}
        <br className="hidden sm:block" />
        {t("description2")}
      </p>
    </motion.div>
  );
}

function HighlightsHeader() {
  const t = useTranslations("journey");

  return (
    <h3 className="text-lg sm:text-xl font-mono font-bold mb-4 flex items-center gap-2">
      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
      <span className="text-gradient">{t("highlights")}</span>
    </h3>
  );
}

function CurrentPositionCard({ milestone }: { milestone: JourneyMilestone }) {
  const { config, t } = useTypeConfig();
  const locale = useLocale();
  const journeyT = useTranslations("journey");
  const typeConfigItem = config[milestone.type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-solid rounded-xl sm:rounded-2xl p-5 sm:p-6 mb-8 border border-primary/30 glow"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("p-2.5 rounded-full border", typeConfigItem.color)}>
          {typeConfigItem.icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
              {journeyT("current")}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {t(typeConfigItem.labelKey)}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-mono font-bold">
            {milestone.title[locale as "pt" | "en"]} @ {milestone.company}
          </h3>
        </div>
      </div>

      <p className="text-muted-foreground text-sm mb-4">
        {milestone.description[locale as "pt" | "en"]}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {milestone.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 text-[10px] sm:text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function HighlightCard({ milestone }: { milestone: JourneyMilestone }) {
  const { config, t } = useTypeConfig();
  const locale = useLocale();
  const journeyT = useTranslations("journey");
  const typeConfigItem = config[milestone.type];
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "glass rounded-xl p-5 border transition-all duration-300",
        milestone.type === "achievement"
          ? "border-yellow-500/30 hover:border-yellow-500/50"
          : "border-border hover:border-primary/30",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "p-2 rounded-full border shrink-0",
            typeConfigItem.color,
          )}
        >
          {typeConfigItem.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-mono font-bold">
              {milestone.title[locale as "pt" | "en"]}
            </h4>
            <span className="text-[10px] font-mono text-muted-foreground">
              {formatDate(milestone.startDate, locale as "pt" | "en")}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {milestone.company} • {milestone.location}
          </p>

          {/* Player de Vídeo Integrado */}
          {milestone.media?.type === "video" && (
            <div className="mt-3">
              {!isVideoOpen ? (
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="relative w-full rounded-lg overflow-hidden bg-black/30 border border-yellow-500/20 group cursor-pointer"
                >
                  <div className="aspect-video flex items-center justify-center bg-linear-to-br from-black/50 to-black/80">
                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 border-2 border-yellow-500/50 flex items-center justify-center group-hover:bg-yellow-500/30 group-hover:scale-110 transition-all duration-300">
                      <Play className="w-8 h-8 text-yellow-500 fill-yellow-500 ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/80 to-transparent">
                    <p className="text-xs font-mono text-yellow-500">
                      {journeyT("video")}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {milestone.media.caption?.[locale as "pt" | "en"] ||
                        journeyT("videoDesc")}
                    </p>
                  </div>
                </button>
              ) : (
                <div className="relative rounded-lg overflow-hidden border border-yellow-500/30 bg-black">
                  <video
                    controls
                    autoPlay
                    className="w-full aspect-video"
                    src={milestone.media.url}
                  >
                    Seu navegador não suporta vídeos HTML5.
                  </video>

                  <button
                    onClick={() => setIsVideoOpen(false)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                    aria-label="Fechar vídeo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TimelineItem({
  milestone,
  index,
  isMobile,
}: {
  milestone: JourneyMilestone;
  index: number;
  isMobile: boolean;
}) {
  const { config, t } = useTypeConfig();
  const locale = useLocale();
  const journeyT = useTranslations("journey");
  const typeConfigItem = config[milestone.type];
  const isEven = index % 2 === 0;

  const period = milestone.endDate
    ? `${formatDate(milestone.startDate, locale as "pt" | "en")} - ${formatDate(milestone.endDate, locale as "pt" | "en")}`
    : `${formatDate(milestone.startDate, locale as "pt" | "en")} - ${journeyT("present")}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? 0 : isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative",
        !isMobile && "md:w-1/2",
        !isMobile && !isEven && "md:ml-auto md:pl-8",
        !isMobile && isEven && "md:pr-8",
      )}
    >
      {!isMobile && (
        <div
          className={cn(
            "hidden md:block absolute top-6 w-4 h-4 rounded-full border-2 border-background",
            typeConfigItem.color.split(" ")[0],
            isEven ? "-right-2" : "-left-2",
          )}
        >
          <div className="absolute inset-0 rounded-full animate-pulse bg-current opacity-50" />
        </div>
      )}

      <div
        className={cn(
          "glass rounded-xl p-4 sm:p-5 border transition-all duration-300",
          milestone.highlight ? "border-yellow-500/30" : "border-border",
          "hover:border-primary/30",
        )}
      >
        <div className="flex items-start gap-3 mb-3">
          <div
            className={cn(
              "p-2 rounded-full border shrink-0",
              typeConfigItem.color,
            )}
          >
            {typeConfigItem.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="font-mono font-bold text-sm sm:text-base truncate">
                {milestone.title[locale as "pt" | "en"]}
              </h4>
              {milestone.isCurrent && (
                <span className="px-1.5 py-0.5 text-[9px] font-mono rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 shrink-0">
                  {journeyT("current")}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{milestone.company}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3 text-[10px] sm:text-xs text-muted-foreground font-mono">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {milestone.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {period}
          </span>
        </div>

        <ul className="space-y-1 mb-3">
          {milestone.achievements[locale as "pt" | "en"]
            .slice(0, isMobile ? 2 : 3)
            .map((achievement, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs">
                <ChevronRight className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{achievement}</span>
              </li>
            ))}
          {milestone.achievements[locale as "pt" | "en"].length >
            (isMobile ? 2 : 3) && (
            <li className="text-[10px] text-muted-foreground ml-5">
              +
              {milestone.achievements[locale as "pt" | "en"].length -
                (isMobile ? 2 : 3)}{" "}
              {journeyT("moreAchievements")}
            </li>
          )}
        </ul>

        <div className="flex flex-wrap gap-1">
          {milestone.technologies.slice(0, isMobile ? 3 : 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono rounded-full bg-primary/5 text-primary/80 border border-primary/10"
            >
              {tech}
            </span>
          ))}
          {milestone.technologies.length > (isMobile ? 3 : 4) && (
            <span className="px-2 py-0.5 text-[9px] font-mono text-muted-foreground">
              +{milestone.technologies.length - (isMobile ? 3 : 4)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function JourneyStats() {
  const t = useTranslations("journey.stats");
  const milestones = journeyRepository.getAll();
  const workMilestones = journeyRepository.getByType("work");
  const achievements = journeyRepository.getByType("achievement");
  const certifications = journeyRepository.getByType("certification");

  const totalExperience = workMilestones.reduce((acc, m) => {
    const end = m.endDate || new Date();
    const months =
      (end.getFullYear() - m.startDate.getFullYear()) * 12 +
      (end.getMonth() - m.startDate.getMonth());
    return acc + months;
  }, 0);

  const years = Math.floor(totalExperience / 12);
  const months = totalExperience % 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <StatItem
          value={`${years}+`}
          label={t("experience")}
          sublabel={`${months} ${t("months")}`}
        />
        <StatItem value={workMilestones.length} label={t("positions")} />
        <StatItem
          value={achievements.length + certifications.length}
          label={t("achievements")}
        />
        <StatItem
          value={new Set(milestones.flatMap((m) => m.technologies)).size}
          label={t("technologies")}
        />
      </div>
    </motion.div>
  );
}

function StatItem({
  value,
  label,
  sublabel,
}: {
  value: string | number;
  label: string;
  sublabel?: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl sm:text-3xl font-bold font-mono text-gradient">
        {value}
      </span>
      <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      {sublabel && (
        <span className="text-[9px] text-muted-foreground/60">{sublabel}</span>
      )}
    </div>
  );
}

export default JourneySection;
