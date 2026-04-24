import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
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
  title: `${PERSONAL_INFO.name} | Frontend Engineer`,
  description: "Especialista em Dashboards B2B e Arquitetura Frontend",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;

  // Verifica se locale é válido
  if (!routing.locales.includes(lang as any)) {
    const defaultLocale = routing.defaultLocale;
    return null; // ou redirect
  }

  setRequestLocale(lang);

  let messages;
  try {
    const messages = (await import(`@/messages/${lang}.json`)).default;
  } catch (error) {
    console.error("Erro ao carregar mensagens:", error);
    messages = {};
  }

  return (
    <html lang={lang} className="dark" suppressHydrationWarning>
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
      </body>
    </html>
  );
}
