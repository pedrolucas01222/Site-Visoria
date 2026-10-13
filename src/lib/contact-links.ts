import { siteConfig, socialLabels } from "@/config/site";
import { serviceOptions } from "@/data/services";

/** Retorna a URL do WhatsApp ou null quando o número ainda não foi configurado. */
export function getWhatsAppUrl(message: string = siteConfig.contact.whatsappMessage): string | null {
  const number = siteConfig.contact.whatsappNumber;
  if (!/^\d{10,15}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getMailtoUrl(subject = "Contato pelo site da Visoria Studio"): string | null {
  const email = siteConfig.contact.email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export function getSocialLinks(): Array<{ key: string; label: string; href: string }> {
  return (Object.keys(siteConfig.social) as Array<keyof typeof siteConfig.social>)
    .map((key) => ({ key, label: socialLabels[key], href: siteConfig.social[key].trim() }))
    .filter((item) => /^https?:\/\//i.test(item.href));
}

export interface QuoteSummary {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  services: string[];
  projectType: string;
  description: string;
  deadline: string;
  budget: string;
  source: string;
}

/** Monta a URL do WhatsApp com todos os dados do pedido de orçamento já preenchidos. */
export function getQuoteWhatsAppUrl(d: QuoteSummary): string | null {
  const labels = d.services.map((id) => serviceOptions.find((s) => s.id === id)?.label ?? id).join(", ");
  const lines = [
    "Olá! Gostaria de fazer um orçamento com a Visoria.",
    "",
    `Nome: ${d.name}`,
    d.company ? `Empresa: ${d.company}` : false,
    `E-mail: ${d.email}`,
    d.whatsapp ? `WhatsApp: ${d.whatsapp}` : false,
    `Serviços: ${labels}`,
    `Tipo de projeto: ${d.projectType}`,
    d.deadline ? `Prazo: ${d.deadline}` : false,
    d.budget ? `Investimento: ${d.budget}` : false,
    d.source ? `Como conheceu: ${d.source}` : false,
    "",
    "Descrição:",
    d.description.length > 1200 ? `${d.description.slice(0, 1200)}…` : d.description,
  ].filter((l) => l !== false && l !== undefined) as string[];
  return getWhatsAppUrl(lines.join("\n"));
}
