// src/app/[lang]/layout.tsx

import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PERSONAL_INFO } from "@/lib/constants";
import AnimatedBackground from "@/components/three/AnimatedBackground";
import { Header } from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gabriel Yamakishi | Fullstack Developer",
    template: "%s | Gabriel Yamakishi",
  },
  description:
    "Fullstack Developer - React, Next.js, TypeScript & C#. Especialista em Dashboards B2B e Arquitetura Frontend.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#09090b",
  colorScheme: "dark",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { lang } = await params;

  if (!routing.locales.includes(lang as "pt" | "en")) {
    notFound();
  }

  setRequestLocale(lang);

  const messages = await getMessages();

  return (
    <html lang={lang} className="dark" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          inter.variable,
          firaCode.variable,
        )}
      >
        <NextIntlClientProvider messages={messages} locale={lang}>
          <AnimatedBackground />
          <Header />
          <main className="relative z-10">{children}</main>
        </NextIntlClientProvider>
        <div id="modal-portal" />
      </body>
    </html>
  );
}
