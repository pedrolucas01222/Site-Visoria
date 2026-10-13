import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/validation";
import { isRateLimited } from "@/lib/rate-limit";
import { serviceOptions } from "@/data/services";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;
const MIN_FILL_MS = 2_500;

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Remove quebras de linha para impedir injeção de cabeçalhos em assunto/reply-to. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

function serviceLabels(ids: string[]): string[] {
  return ids.map((id) => serviceOptions.find((s) => s.id === id)?.label ?? id);
}

function buildMessage(d: ContactPayload) {
  const rows: Array<[string, string]> = [
    ["Nome", d.name],
    ["Empresa", d.company || "—"],
    ["E-mail", d.email],
    ["WhatsApp", d.whatsapp || "—"],
    ["Serviços", serviceLabels(d.services).join(", ")],
    ["Tipo de projeto", d.projectType],
    ["Prazo", d.deadline || "—"],
    ["Faixa de investimento", d.budget || "—"],
    ["Como conheceu", d.source || "—"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nDescrição:\n${d.description}\n`;
  const html =
    `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">` +
    rows.map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v)}</td></tr>`).join("") +
    `</table><p><strong>Descrição</strong></p><p style="white-space:pre-wrap">${esc(d.description)}</p>`;
  return { text, html };
}

async function deliver(d: ContactPayload): Promise<"sent" | "not_configured" | "failed"> {
  const { text, html } = buildMessage(d);
  const subject = oneLine(`Novo orçamento pelo site — ${d.name}`).slice(0, 150);

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL;
  const webhook = process.env.FORM_WEBHOOK_URL;

  try {
    if (resendKey && to && from) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: [to], reply_to: d.email, subject, text, html }),
        signal: AbortSignal.timeout(10_000),
      });
      return res.ok ? "sent" : "failed";
    }

    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site: siteConfig.name,
          receivedAt: new Date().toISOString(),
          ...d,
          services: serviceLabels(d.services),
          website: undefined,
          startedAt: undefined,
        }),
        signal: AbortSignal.timeout(10_000),
      });
      return res.ok ? "sent" : "failed";
    }

    // Opção sem chave de API: Formsubmit (https://formsubmit.co). Exige ativar o e-mail na primeira vez.
    if (to) {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: subject,
          _replyto: d.email,
          _template: "table",
          _captcha: "false",
          Nome: d.name,
          Empresa: d.company || "—",
          "E-mail": d.email,
          WhatsApp: d.whatsapp || "—",
          Serviços: serviceLabels(d.services).join(", "),
          "Tipo de projeto": d.projectType,
          Prazo: d.deadline || "—",
          Investimento: d.budget || "—",
          "Como conheceu": d.source || "—",
          Descrição: d.description,
        }),
        signal: AbortSignal.timeout(10_000),
      });
      const out = (await res.json().catch(() => ({}))) as { success?: boolean | string };
      return res.ok && (out.success === true || out.success === "true") ? "sent" : "failed";
    }
  } catch {
    // Nenhum dado pessoal é registrado em log.
    return "failed";
  }
  return "not_configured";
}

export async function POST(request: Request) {
  // 1. Origem: aceita apenas requisições do próprio site.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json({ ok: false, error: "forbidden" }, 403);
    } catch {
      return json({ ok: false, error: "forbidden" }, 403);
    }
  }

  // 2. Tamanho e formato.
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return json({ ok: false, error: "too_large" }, 413);
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: "too_large" }, 413);
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }

  // 3. Limite de tentativas por IP.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return json({ ok: false, error: "rate_limited" }, 429);

  // 4. Validação no servidor.
  const { data, errors } = validateContact(body);
  if (!data) return json({ ok: false, error: "validation", errors }, 400);

  // 5. Anti-spam: campo isca preenchido ou envio rápido demais → descarta em silêncio.
  const elapsed = Date.now() - data.startedAt;
  if (data.website !== "" || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return json({ ok: true });
  }

  // 6. Entrega. Só confirma sucesso se o provedor realmente aceitou.
  const result = await deliver(data);
  if (result === "sent") return json({ ok: true });
  if (result === "not_configured") return json({ ok: false, error: "not_configured" }, 503);
  return json({ ok: false, error: "delivery_failed" }, 502);
}
