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

function quoteLines(d: QuoteSummary): string[] {
  const labels = d.services.map((id) => serviceOptions.find((s) => s.id === id)?.label ?? id).join(", ");
  return [
    `Nome: ${d.name}`,
    d.company ? `Empresa: ${d.company}` : "",
    `E-mail: ${d.email}`,
    d.whatsapp ? `WhatsApp: ${d.whatsapp}` : "",
    `Serviços: ${labels}`,
    `Tipo de projeto: ${d.projectType}`,
    d.deadline ? `Prazo: ${d.deadline}` : "",
    d.budget ? `Investimento: ${d.budget}` : "",
    d.source ? `Como conheceu: ${d.source}` : "",
  ].filter(Boolean);
}

/** Abre o programa de e-mail do visitante com o pedido completo, endereçado ao e-mail comercial. */
export function getQuoteMailtoUrl(d: QuoteSummary): string | null {
  const to = siteConfig.contact.email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return null;
  const desc = d.description.length > 1500 ? `${d.description.slice(0, 1500)}…` : d.description;
  const body = `${quoteLines(d).join("\r\n")}\r\n\r\nDescrição:\r\n${desc.replace(/\r?\n/g, "\r\n")}`;
  return `mailto:${to}?subject=${encodeURIComponent(`Pedido de orçamento — ${d.name}`)}&body=${encodeURIComponent(body)}`;
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

/** Texto completo do pedido (para copiar e colar em qualquer e-mail). */
export function getQuoteText(d: QuoteSummary): string {
  return `${quoteLines(d).join("\n")}\n\nDescrição:\n${d.description}`;
}

function composeBody(d: QuoteSummary): string {
  const desc = d.description.length > 1500 ? `${d.description.slice(0, 1500)}…` : d.description;
  return `${quoteLines(d).join("\n")}\n\nDescrição:\n${desc}`;
}

/** Abre o Gmail na web (funciona em qualquer navegador, sem programa de e-mail instalado). */
export function getQuoteGmailUrl(d: QuoteSummary): string {
  const q = new URLSearchParams({ view: "cm", fs: "1", to: siteConfig.contact.email, su: `Pedido de orçamento — ${d.name}`, body: composeBody(d) });
  return `https://mail.google.com/mail/?${q.toString()}`;
}

/** Abre o Outlook na web. */
export function getQuoteOutlookUrl(d: QuoteSummary): string {
  const q = new URLSearchParams({ to: siteConfig.contact.email, subject: `Pedido de orçamento — ${d.name}`, body: composeBody(d) });
  return `https://outlook.live.com/mail/0/deeplink/compose?${q.toString()}`;
}
