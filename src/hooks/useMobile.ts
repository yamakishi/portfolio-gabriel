"use client";

import { useState, useEffect } from "react";
import { BREAKPOINTS } from "@/lib/constants";

interface UseMobileReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isMobileOrTablet: boolean;
  screenWidth: number;
}

export function useMobile(): UseMobileReturn {
  // Inicializa com undefined para evitar hydration mismatch
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    // Função pura para calcular estado baseado na largura
    const handleResize = (): void => {
      setScreenWidth(window.innerWidth);
    };

    // Debounce manual para performance
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = (): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    // Inicializa
    handleResize();

    // Listener otimizado
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Calcula breakpoints (lógica pura)
  const isMobile = screenWidth < BREAKPOINTS.sm;
  const isTablet =
    screenWidth >= BREAKPOINTS.sm && screenWidth < BREAKPOINTS.lg;
  const isDesktop = screenWidth >= BREAKPOINTS.lg;
  const isMobileOrTablet = isMobile || isTablet;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isMobileOrTablet,
    screenWidth,
  };
}
