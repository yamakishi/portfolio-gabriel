// src/components/sections/ContactSection.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ANIMATION_CONFIG, PERSONAL_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/useMobile";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// ==============================================
// SCHEMA DE VALIDAÇÃO (Zod)
// ==============================================

const createContactSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(2, t("contact.validation.nameMin"))
      .nonempty(t("contact.validation.nameRequired")),
    email: z
      .string()
      .email(t("contact.validation.emailInvalid"))
      .nonempty(t("contact.validation.emailRequired")),
    subject: z.string().nonempty(t("contact.validation.subjectRequired")),
    message: z
      .string()
      .min(10, t("contact.validation.messageMin"))
      .nonempty(t("contact.validation.messageRequired")),
  });

type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

// ==============================================
// COMPONENTE PRINCIPAL
// ==============================================

export function ContactSection() {
  const t = useTranslations();
  const { isMobile } = useMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contactSchema = createContactSchema(t);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send");

      setSubmitStatus("success");
      reset();

      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Fallback para navegadores antigos
    }
  };

  return (
    <section
      id="contact"
      className="container-custom py-12 sm:py-16 md:py-20 scroll-mt-20"
    >
      {/* Cabeçalho */}
      <SectionHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Formulário de Contato */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-border"
        >
          <h3 className="text-lg sm:text-xl font-mono font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <Send className="w-5 h-5 text-primary" />
            {t("contact.form.send")}
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nome */}
            <FormField
              label={t("contact.form.name")}
              name="name"
              type="text"
              placeholder={t("contact.form.namePlaceholder")}
              register={register}
              error={errors.name?.message}
              disabled={isSubmitting}
            />

            {/* Email */}
            <FormField
              label={t("contact.form.email")}
              name="email"
              type="email"
              placeholder={t("contact.form.emailPlaceholder")}
              register={register}
              error={errors.email?.message}
              disabled={isSubmitting}
            />

            {/* Assunto */}
            <FormField
              label={t("contact.form.subject")}
              name="subject"
              type="text"
              placeholder={t("contact.form.subjectPlaceholder")}
              register={register}
              error={errors.subject?.message}
              disabled={isSubmitting}
            />

            {/* Mensagem */}
            <div>
              <label className="block text-sm font-mono text-muted-foreground mb-1.5">
                {t("contact.form.message")}
              </label>
              <textarea
                {...register("message")}
                placeholder={t("contact.form.messagePlaceholder")}
                disabled={isSubmitting}
                rows={isMobile ? 4 : 5}
                className={cn(
                  "w-full px-4 py-3 rounded-lg",
                  "bg-background/50 border",
                  "text-sm font-mono",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                  "transition-all duration-200 resize-none",
                  errors.message
                    ? "border-error focus:ring-error/50"
                    : "border-border focus:border-primary/50",
                )}
              />
              {errors.message && (
                <p className="text-[10px] sm:text-xs text-error mt-1 font-mono">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Status de Envio */}
            {submitStatus !== "idle" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "p-3 rounded-lg flex items-center gap-2 text-sm",
                  submitStatus === "success"
                    ? "bg-success/10 border border-success/30 text-success"
                    : "bg-error/10 border border-error/30 text-error",
                )}
              >
                {submitStatus === "success" ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    {t("contact.form.success")}
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    {t("contact.form.error")}
                  </>
                )}
              </motion.div>
            )}

            {/* Botão Enviar */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full py-3 rounded-full font-mono text-sm",
                "bg-primary text-primary-foreground",
                "hover:bg-primary/90 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center justify-center gap-2",
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("contact.form.sending")}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t("contact.form.send")}
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Informações de Contato */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Card de Informações */}
          <div className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-border">
            <h3 className="text-lg sm:text-xl font-mono font-bold mb-4 sm:mb-6">
              {t("contact.info.title")}
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <ContactInfoItem
                icon={<Mail className="w-5 h-5" />}
                label={t("contact.info.email")}
                value={PERSONAL_INFO.email}
                href={`mailto:${PERSONAL_INFO.email}`}
                copyable
                onCopy={() => copyToClipboard(PERSONAL_INFO.email, "email")}
                copied={copiedField === "email"}
              />

              {/* Telefone */}
              <ContactInfoItem
                icon={<Phone className="w-5 h-5" />}
                label={t("contact.info.phone")}
                value={PERSONAL_INFO.phone}
                href={`tel:${PERSONAL_INFO.phone.replace(/\D/g, "")}`}
                copyable
                onCopy={() => copyToClipboard(PERSONAL_INFO.phone, "phone")}
                copied={copiedField === "phone"}
              />

              {/* Localização */}
              <ContactInfoItem
                icon={<MapPin className="w-5 h-5" />}
                label={t("contact.info.location")}
                value="Hortolândia, SP - Brasil"
              />
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-border">
            <h3 className="text-lg sm:text-xl font-mono font-bold mb-4 sm:mb-6">
              {t("contact.info.social")}
            </h3>

            <div className="flex gap-3">
              <SocialButton
                href={PERSONAL_INFO.linkedin}
                icon={<FaLinkedin className="w-5 h-5" />}
                label="LinkedIn"
              />
              <SocialButton
                href={PERSONAL_INFO.github}
                icon={<FaGithub className="w-5 h-5" />}
                label="GitHub"
              />
            </div>
          </div>

          {/* Status Card */}
          <div className="glass rounded-xl sm:rounded-2xl p-5 border border-primary/20 bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-success" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-success animate-ping" />
              </div>
              <div>
                <p className="text-sm font-mono text-foreground">
                  {t("contact.status.available")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("contact.status.response")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==============================================
// SUB-COMPONENTES
// ==============================================

function SectionHeader() {
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-8 sm:mb-12"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
        <Mail className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-mono text-primary">
          {t("contact.badge")}
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono mb-3">
        <span className="text-primary">$</span> {t("contact.title")}
      </h2>

      <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
        {t("contact.description")}
      </p>
    </motion.div>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  register: any;
  error?: string;
  disabled?: boolean;
}

function FormField({
  label,
  name,
  type,
  placeholder,
  register,
  error,
  disabled,
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-mono text-muted-foreground mb-1.5">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full px-4 py-3 rounded-lg",
          "bg-background/50 border",
          "text-sm font-mono",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          "transition-all duration-200",
          error
            ? "border-error focus:ring-error/50"
            : "border-border focus:border-primary/50",
        )}
      />
      {error && (
        <p className="text-[10px] sm:text-xs text-error mt-1 font-mono">
          {error}
        </p>
      )}
    </div>
  );
}

interface ContactInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
  onCopy?: () => void;
  copied?: boolean;
}

function ContactInfoItem({
  icon,
  label,
  value,
  href,
  copyable,
  onCopy,
  copied,
}: ContactInfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-mono text-muted-foreground mb-0.5">
          {label}
        </p>
        <div className="flex items-center gap-2">
          {href ? (
            <a
              href={href}
              className="text-sm sm:text-base font-mono text-foreground hover:text-primary transition-colors truncate"
            >
              {value}
            </a>
          ) : (
            <span className="text-sm sm:text-base font-mono text-foreground">
              {value}
            </span>
          )}
          {copyable && (
            <button
              onClick={onCopy}
              className="p-1 rounded hover:bg-primary/10 transition-colors shrink-0"
              title="Copiar"
            >
              {copied ? (
                <CheckCircle className="w-3.5 h-3.5 text-success" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialButton({ href, icon, label }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex-1 flex items-center justify-center gap-2",
        "px-4 py-3 rounded-full",
        "bg-background/50 border border-border",
        "text-muted-foreground hover:text-primary",
        "hover:border-primary/50 transition-all duration-200",
        "font-mono text-sm",
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      <ExternalLink className="w-3.5 h-3.5 hidden sm:block" />
    </a>
  );
}

export default ContactSection;
