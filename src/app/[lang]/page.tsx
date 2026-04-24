// src/app/[lang]/page.tsx

import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <section id="home" className="scroll-mt-20">
        <HeroSection />
      </section>

      <section id="skills" className="scroll-mt-20">
        <SkillsSection />
      </section>

      <section id="projects" className="scroll-mt-20">
        <ProjectsSection />
      </section>

      <section id="journey" className="scroll-mt-20">
        <JourneySection />
      </section>

      <section id="contact" className="scroll-mt-20">
        <ContactSection />
      </section>
    </>
  );
}
