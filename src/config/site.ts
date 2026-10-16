/**
 * Configuração central da VISÓRIA Studio.
 * Informações de contato vêm de variáveis de ambiente (ver .env.example).
 * Campos vazios são omitidos do site automaticamente — nada é exibido como contato real
 * enquanto não for configurado.
 */
export const siteConfig = {
  name: "VISÓRIA Studio",
  shortName: "VISÓRIA",
  tagline: "Ideias que ganham forma. Marcas que vão além.",
  description:
    "Estúdio criativo e digital que une design, tecnologia e audiovisual para ajudar empresas e profissionais a construir uma presença digital sólida.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, ""),
  locale: "pt_BR",
  language: "pt-BR",

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "studiovisoria@gmail.com",
    /** Somente dígitos, com DDI e DDD. Ex.: 5511999999999 */
    whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5544998185425").replace(/\D/g, ""),
    whatsappMessage: "Olá! Gostaria de fazer um orçamento com a Visória.",
  },

  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/visoria_studio",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "",
  },

  logo: {
    symbol: { src: "/brand/symbol.webp", width: 680, height: 700 },
    wordmark: { src: "/brand/wordmark.webp", width: 980, height: 135 },
    full: { src: "/brand/logo-full.webp", width: 980, height: 925 },
  },

  colors: { primary: "#087EFF", accent: "#20C4FF", background: "#050505" },

  legal: { privacyHref: "/politica-de-privacidade" },
} as const;

export const navLinks = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
] as const;

export const socialLabels: Record<keyof typeof siteConfig.social, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};
