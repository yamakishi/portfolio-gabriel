// src/components/sections/HeroSection.tsx

"use client";

import { motion } from "framer-motion";
import { Terminal, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { PERSONAL_INFO, ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="container-custom min-h-screen flex flex-col justify-center items-center py-6 sm:py-10 md:py-20 px-3 sm:px-4">
      <motion.div
        initial={ANIMATION_CONFIG.initial}
        animate={ANIMATION_CONFIG.animate}
        transition={ANIMATION_CONFIG.transition}
        className="glass-solid rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-10 border border-primary/20 glow max-w-3xl w-full text-center"
      >
        {/* Terminal Prompt */}
        <div className="font-mono text-primary mb-2 md:mb-4 text-[10px] sm:text-xs md:text-sm flex justify-center items-center gap-1">
          <Terminal className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{t("greeting")}</span>
          <span className="ml-1.5 h-2.5 w-1 sm:h-3 sm:w-1.5 md:h-4 md:w-2 bg-primary animate-pulse" />
        </div>

        {/* Título Principal */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-mono text-gradient mb-2 md:mb-4">
          {PERSONAL_INFO.name}_
        </h1>

        {/* Descrição - Fullstack */}
        <p className="text-muted-foreground text-xs sm:text-sm md:text-xl max-w-2xl mx-auto mb-3 md:mb-6">
          {t("role")} {t("and")} {t("architecture")}
        </p>

        {/* Stack Principal - React + C# em destaque */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mb-3 md:mb-6 text-xs sm:text-sm md:text-base">
          {["React", "Next.js", "TypeScript", "C#", "Azure", "Vue"].map(
            (tech, i, arr) => (
              <span key={tech}>
                <span
                  className={cn(
                    ["React", "Next.js", "TypeScript", "C#"].includes(tech)
                      ? "text-primary font-semibold"
                      : "text-primary/80",
                  )}
                >
                  {tech}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-muted-foreground mx-1">·</span>
                )}
              </span>
            ),
          )}
        </div>

        {/* Status LEDs */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 md:mb-6 text-[9px] sm:text-xs font-mono text-muted">
          <StatusLED
            color="bg-success"
            full={t("systemOnlineFull")}
            short={t("systemOnline")}
          />
          <StatusLED
            color="bg-primary"
            full={t("engine3dFull")}
            short={t("engine3d")}
          />
          <StatusLED
            color="bg-warning"
            full={t("buildFull")}
            short={t("build")}
          />
        </div>

        {/* Badges de Tecnologias - React/C# em destaque */}
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-1 sm:gap-2 mb-4 md:mb-6">
          {[
            "React 18+",
            "C# .NET",
            "TypeScript",
            "Next.js 15",
            "Tailwind",
            "Azure",
          ].map((badge, i) => (
            <span
              key={badge}
              className={cn(
                "px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-xs font-mono rounded-full text-center border",
                i < 2
                  ? "bg-primary/20 text-primary border-primary/30" // React e C# em destaque
                  : "bg-primary/10 text-primary border-primary/20",
              )}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Linha de Comando - Atualizada para Fullstack */}
        <div className="border-t border-border pt-3 md:pt-6 font-mono text-[9px] sm:text-xs md:text-sm text-muted-foreground">
          <p className="mb-1.5 md:mb-2">
            <span className="text-primary">$</span> {t("aboutCommand")}
          </p>
          <div className="text-left space-y-0.5 md:space-y-1">
            <span className="block">
              <span className="text-primary mr-1">&gt;</span>
              {t("about1")}
            </span>
            <span className="block">
              <span className="text-primary mr-1">&gt;</span>
              {t("about2")}
            </span>
            <span className="block">
              <span className="text-primary mr-1">&gt;</span>
              {t("about3")}
            </span>
            <span className="block">
              <span className="text-primary mr-1">&gt;</span>
              {t("about4")}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block"
      >
        <div className="w-5 md:w-6 h-8 md:h-10 rounded-full border-2 border-primary/50 flex justify-center">
          <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-primary mt-1.5 md:mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}

function StatusLED({
  color,
  full,
  short,
}: {
  color: string;
  full: string;
  short: string;
}) {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <div
        className={cn(
          "h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full animate-pulse",
          color,
        )}
      />
      <span className="hidden sm:inline">{full}</span>
      <span className="sm:hidden">{short}</span>
    </div>
  );
}
