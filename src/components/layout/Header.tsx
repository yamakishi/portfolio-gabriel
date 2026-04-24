// src/components/layout/Header.tsx

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Code2, Briefcase, User, Mail } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PERSONAL_INFO } from "@/lib/constants";

// ==============================================
// TIPOS
// ==============================================

interface NavItem {
  labelKey: string;
  href: string;
  icon: React.ReactNode;
}

// ==============================================
// HOOK: useScrollSpy (IntersectionObserver)
// ==============================================

function useScrollSpy(items: NavItem[], offset: number = 100): string {
  const [activeSection, setActiveSection] = useState<string>(
    items[0]?.href || "#home",
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
          const id = `#${visibleEntries[0].target.id}`;
          setActiveSection(id);
        }
      },
      {
        rootMargin: `-${offset}px 0px -50% 0px`,
        threshold: 0.1,
      },
    );

    const elements: Element[] = [];
    items.forEach((item) => {
      const id = item.href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        elements.push(element);
      }
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [items, offset]);

  return activeSection;
}

// ==============================================
// HOOK: useScrollPosition
// ==============================================

function useScrollPosition(threshold: number = 20): boolean {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return hasScrolled;
}

// ==============================================
// FUNÇÃO: scrollToSection (Scroll Suave Nativo)
// ==============================================

function scrollToSection(href: string): void {
  const id = href.replace("#", "");
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// ==============================================
// COMPONENTE PRINCIPAL
// ==============================================

export function Header() {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasScrolled = useScrollPosition(20);

  const NAV_ITEMS: NavItem[] = [
    { labelKey: "home", href: "#home", icon: <Home className="w-4 h-4" /> },
    {
      labelKey: "skills",
      href: "#skills",
      icon: <Code2 className="w-4 h-4" />,
    },
    {
      labelKey: "projects",
      href: "#projects",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      labelKey: "journey",
      href: "#journey",
      icon: <User className="w-4 h-4" />,
    },
    {
      labelKey: "contact",
      href: "#contact",
      icon: <Mail className="w-4 h-4" />,
    },
  ];

  const activeSection = useScrollSpy(NAV_ITEMS);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToSection(href);
      closeMenu();
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          hasScrolled ? "py-2 sm:py-3" : "py-4 sm:py-6",
        )}
      >
        <div className="container-custom">
          <nav
            className={cn(
              "glass rounded-full px-4 sm:px-6 transition-all duration-300",
              hasScrolled ? "py-2" : "py-3",
            )}
          >
            {/* 
              ORDEM CORRETA: Logo (esquerda) | Navegação (centro) | Idioma (direita)
              Usando grid de 3 colunas para garantir o layout correto
            */}
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
              {/* COLUNA 1: Logo (Esquerda) */}
              <button
                onClick={() => {
                  scrollToSection("#home");
                  closeMenu();
                }}
                className="font-mono text-sm sm:text-base font-bold text-gradient hover:opacity-80 transition-opacity cursor-pointer select-none whitespace-nowrap"
                aria-label="Ir para Home"
              >
                GY_
              </button>

              {/* COLUNA 2: Navegação (Centro) */}
              <ul className="hidden md:flex items-center justify-center gap-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-full",
                        "text-sm font-mono",
                        "transition-all duration-200",
                        "cursor-pointer select-none whitespace-nowrap",
                        activeSection === item.href
                          ? "bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(0,229,255,0.15)]"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                      )}
                      aria-current={
                        activeSection === item.href ? "page" : undefined
                      }
                    >
                      <span
                        className={cn(
                          "transition-transform duration-200",
                          activeSection === item.href && "scale-110",
                        )}
                      >
                        {item.icon}
                      </span>
                      <span>{t(item.labelKey)}</span>
                      {activeSection === item.href && (
                        <span className="ml-1 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>

              {/* COLUNA 3: Idioma + Menu Mobile (Direita) */}
              <div className="flex items-center justify-end gap-2">
                <div className="hidden md:block">
                  <LanguageSwitcher />
                </div>
                <button
                  onClick={toggleMenu}
                  className="md:hidden p-2 rounded-full hover:bg-primary/10 transition-colors cursor-pointer"
                  aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5 text-primary" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Menu Mobile Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            items={NAV_ITEMS}
            onClose={closeMenu}
            activeSection={activeSection}
            onNavClick={handleNavClick}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ==============================================
// LANGUAGE SWITCHER (CORRIGIDO)
// ==============================================

function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (newLocale: string) => {
    // CORREÇÃO: Remove o locale corretamente
    // Ex: /pt#skills -> #skills  ou  /en#projects -> #projects
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const newPath = `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}${hash}`;

    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
      <button
        onClick={() => switchLanguage("pt")}
        className={cn(
          "px-2.5 py-0.5 text-xs font-mono rounded-full transition-all duration-200",
          "cursor-pointer select-none",
          locale === "pt"
            ? "bg-primary text-primary-foreground shadow-[0_0_8px_rgba(0,229,255,0.3)]"
            : "text-muted-foreground hover:text-primary hover:bg-primary/5",
        )}
        aria-label="Português"
      >
        PT
      </button>
      <button
        onClick={() => switchLanguage("en")}
        className={cn(
          "px-2.5 py-0.5 text-xs font-mono rounded-full transition-all duration-200",
          "cursor-pointer select-none",
          locale === "en"
            ? "bg-primary text-primary-foreground shadow-[0_0_8px_rgba(0,229,255,0.3)]"
            : "text-muted-foreground hover:text-primary hover:bg-primary/5",
        )}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}

// ==============================================
// MOBILE MENU
// ==============================================

interface MobileMenuProps {
  items: NavItem[];
  onClose: () => void;
  activeSection: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

function MobileMenu({
  items,
  onClose,
  activeSection,
  onNavClick,
}: MobileMenuProps) {
  const t = useTranslations("navigation");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 md:hidden"
    >
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="relative h-full flex flex-col"
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <LanguageSwitcher />

          <ul className="space-y-6 text-center">
            {items.map((item, index) => {
              const isActive = activeSection === item.href;
              return (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => onNavClick(e, item.href)}
                    className={cn(
                      "flex items-center justify-center gap-3 text-2xl font-mono transition-colors",
                      "cursor-pointer select-none",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.icon}
                    <span>{t(item.labelKey)}</span>
                    {isActive && (
                      <span className="ml-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div className="py-8 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            {PERSONAL_INFO.email}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Header;
