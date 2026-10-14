import { siteConfig } from "@/config/site";
import { serviceOptions } from "@/data/services";
import type { QuoteSummary } from "@/lib/contact-links";

/**
 * Segunda tentativa automática: envia o pedido direto do navegador ao Formsubmit,
 * que repassa ao e-mail comercial. Só retorna true se o serviço confirmar o envio.
 */
export async function sendViaFormsubmit(d: QuoteSummary): Promise<boolean> {
  const to = siteConfig.contact.email.trim();
  if (!to) return false;
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `Novo orçamento pelo site — ${d.name}`.slice(0, 150),
        _replyto: d.email,
        _template: "table",
        _captcha: "false",
        Nome: d.name,
        Empresa: d.company || "—",
        "E-mail": d.email,
        WhatsApp: d.whatsapp || "—",
        Serviços: d.services.map((id) => serviceOptions.find((s) => s.id === id)?.label ?? id).join(", "),
        "Tipo de projeto": d.projectType,
        Prazo: d.deadline || "—",
        Investimento: d.budget || "—",
        "Como conheceu": d.source || "—",
        Descrição: d.description,
      }),
    });
    const out = (await res.json().catch(() => ({}))) as { success?: boolean | string };
    return res.ok && (out.success === true || out.success === "true");
  } catch {
    return false;
  }
}
