"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Check, CheckCircle2, Loader2, Mail, MessageCircle, TriangleAlert } from "lucide-react";
import { serviceOptions } from "@/data/services";
import {
  budgetOptions,
  deadlineOptions,
  projectTypeOptions,
  sourceOptions,
  validateContact,
  type ContactPayload,
  type FieldErrors,
} from "@/lib/validation";
import { siteConfig } from "@/config/site";
import { getQuoteGmailUrl, getQuoteMailtoUrl, getQuoteOutlookUrl, getQuoteText, getQuoteWhatsAppUrl } from "@/lib/contact-links";
import { sendViaFormsubmit } from "@/lib/formsubmit";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error" | "fallback";

interface FormState {
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
  consent: boolean;
  website: string;
}

const inputClass =
  "mt-2 block min-h-12 w-full rounded-xl border border-line-strong bg-ink px-4 py-3 text-base text-paper placeholder:text-mute/70 transition-colors hover:border-paper/40 focus:border-cyan aria-[invalid=true]:border-danger";

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
        {optional ? <span className="font-normal text-mute"> (opcional)</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-mute">{hint}</p>
      ) : null}
      {error ? (
        <p id={`${id}-erro`} className="mt-1.5 flex items-start gap-1.5 text-sm text-danger">
          <TriangleAlert size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({
  initialServices = [],
  initialMessage = "",
  whatsappUrl,
  mailtoUrl,
}: {
  initialServices?: string[];
  initialMessage?: string;
  whatsappUrl: string | null;
  mailtoUrl: string | null;
}) {
  const [values, setValues] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    whatsapp: "",
    services: initialServices,
    projectType: "",
    description: initialMessage,
    deadline: "",
    budget: "",
    source: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [fallback, setFallback] = useState<{ kind: "email" | "whatsapp"; data: ContactPayload } | null>(null);
  const [copied, setCopied] = useState(false);
  const channel = useRef<"email" | "whatsapp">("email");
  const startedAt = useRef<number>(Date.now());
  const summaryRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as keyof ContactPayload]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (id: string) =>
    set("services", values.services.includes(id) ? values.services.filter((s) => s !== id) : [...values.services, id]);

  const describedBy = (id: string, key: keyof FieldErrors, hasHint = false) =>
    errors[key] ? `${id}-erro` : hasHint ? `${id}-hint` : undefined;

  /** Nenhum envio automático funcionou: oferece formas de enviar que não dependem de programa instalado. */
  function goFallback(data: ContactPayload) {
    setCopied(false);
    setFallback({ kind: "email", data });
    setStatus("fallback");
  }

  async function copyRequest(data: ContactPayload) {
    const text = `Para: ${siteConfig.contact.email}\n\n${getQuoteText(data)}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      document.getElementById("pedido-texto")?.focus();
      (document.getElementById("pedido-texto") as HTMLTextAreaElement | null)?.select();
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const payload = { ...values, startedAt: startedAt.current };
    const result = validateContact(payload);
    if (!result.data) {
      setErrors(result.errors);
      setStatus("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setServerMessage("");

    if (channel.current === "whatsapp") {
      const url = getQuoteWhatsAppUrl(result.data);
      if (!url) {
        setServerMessage("O WhatsApp não está disponível no momento. Use o envio por e-mail.");
        setStatus("error");
        return;
      }
      window.open(url, "_blank", "noopener,noreferrer");
      setFallback({ kind: "whatsapp", data: result.data });
      setStatus("fallback");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: FieldErrors };

      if (res.ok && body.ok) {
        setStatus("success");
        return;
      }
      if (res.status === 400 && body.errors) {
        setErrors(body.errors);
        setStatus("idle");
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      if (res.status === 429) {
        setServerMessage("Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.");
        setStatus("error");
        return;
      }
      if (await sendViaFormsubmit(result.data)) {
        setStatus("success");
        return;
      }
      goFallback(result.data);
    } catch {
      if (await sendViaFormsubmit(result.data)) {
        setStatus("success");
        return;
      }
      goFallback(result.data);
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-cyan/50 bg-ink-2 p-8 sm:p-10">
        <CheckCircle2 size={36} aria-hidden="true" className="text-cyan" />
        <h2 className="mt-5 font-display text-3xl font-semibold">Mensagem enviada.</h2>
        <p className="mt-3 text-mute">
          Recebemos as informações do seu projeto. Vamos analisar e entrar em contato pelo e-mail ou WhatsApp que você informou.
        </p>
        <Link href="/" className="mt-8 inline-flex min-h-11 items-center text-cyan underline underline-offset-4">Voltar ao início</Link>
      </div>
    );
  }

  if (status === "fallback" && fallback) {
    const d = fallback.data;
    const btn = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors";
    const primary = `${btn} bg-blue text-ink hover:bg-cyan`;
    const secondary = `${btn} border border-line-strong hover:border-cyan hover:text-cyan`;

    if (fallback.kind === "whatsapp") {
      const url = getQuoteWhatsAppUrl(d);
      return (
        <div role="status" className="rounded-2xl border border-cyan/50 bg-ink-2 p-8 sm:p-10">
          <MessageCircle size={36} aria-hidden="true" className="text-cyan" />
          <h2 className="mt-5 font-display text-3xl font-semibold">Falta só um passo.</h2>
          <p className="mt-3 text-mute">
            Abrimos o WhatsApp com sua mensagem pronta. Se ele não abriu, toque no botão abaixo. O pedido só chega até a Visoria depois que você enviar a mensagem por lá.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" className={primary}>
                <MessageCircle size={18} aria-hidden="true" /> Abrir WhatsApp<span className="sr-only"> (abre em nova aba)</span>
              </a>
            ) : null}
            <button type="button" onClick={() => setStatus("idle")} className={secondary}>Voltar e editar</button>
          </div>
        </div>
      );
    }

    const wa = getQuoteWhatsAppUrl(d);
    return (
      <div role="status" className="rounded-2xl border border-cyan/50 bg-ink-2 p-8 sm:p-10">
        <Mail size={36} aria-hidden="true" className="text-cyan" />
        <h2 className="mt-5 font-display text-3xl font-semibold">Quase lá: finalize o envio.</h2>
        <p className="mt-3 text-mute">
          O envio automático não foi concluído, mas seu pedido está pronto. Escolha abaixo como enviá-lo para <strong className="text-paper">{siteConfig.contact.email}</strong>. O pedido só chega até a Visoria depois que você enviar.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a href={getQuoteGmailUrl(d)} target="_blank" rel="noopener noreferrer" className={primary}>
            Abrir no Gmail<span className="sr-only"> (abre em nova aba)</span>
          </a>
          <a href={getQuoteOutlookUrl(d)} target="_blank" rel="noopener noreferrer" className={secondary}>
            Abrir no Outlook<span className="sr-only"> (abre em nova aba)</span>
          </a>
          <a href={getQuoteMailtoUrl(d) ?? "#"} className={secondary}>Abrir app de e-mail</a>
          <button type="button" onClick={() => copyRequest(d)} className={secondary}>
            {copied ? "Pedido copiado!" : "Copiar pedido"}
          </button>
        </div>
        <p className="mt-3 text-sm text-mute" aria-live="polite">
          {copied ? "Cole o texto em qualquer e-mail e envie para o endereço acima." : "Se nada abrir, use “Copiar pedido” e cole em qualquer e-mail."}
        </p>
        <label htmlFor="pedido-texto" className="sr-only">Texto do pedido</label>
        <textarea id="pedido-texto" readOnly rows={6} value={`Para: ${siteConfig.contact.email}\n\n${getQuoteText(d)}`}
          onFocus={(e) => e.currentTarget.select()}
          className="mt-4 block w-full rounded-xl border border-line-strong bg-ink p-4 text-sm text-mute" />
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-cyan underline underline-offset-4">
              <MessageCircle size={16} aria-hidden="true" /> Enviar pelo WhatsApp<span className="sr-only"> (abre em nova aba)</span>
            </a>
          ) : null}
          <button type="button" onClick={() => setStatus("idle")} className="min-h-11 text-mute underline underline-offset-4 hover:text-cyan">Voltar e editar</button>
        </div>
      </div>
    );
  }

  const errorEntries = Object.entries(errors).filter(([, msg]) => Boolean(msg)) as Array<[string, string]>;
  const fieldIds: Record<string, string> = {
    name: "nome", email: "email", whatsapp: "whatsapp", services: "servicos", projectType: "tipo",
    description: "descricao", deadline: "prazo", budget: "investimento", source: "origem", consent: "consentimento",
  };

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={errorEntries.length ? "resumo-erros" : undefined} className="space-y-7">
      {errorEntries.length ? (
        <div id="resumo-erros" ref={summaryRef} tabIndex={-1} role="alert" className="rounded-xl border border-danger/60 bg-danger/10 p-5">
          <p className="font-semibold">Corrija os campos abaixo para enviar:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {errorEntries.map(([key, msg]) => (
              <li key={key}>
                <a href={`#${fieldIds[key] ?? key}`} className="underline underline-offset-2">{msg}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="nome" label="Nome" error={errors.name}>
          <input id="nome" name="name" type="text" autoComplete="name" required value={values.name}
            onChange={(e) => set("name", e.target.value)} className={inputClass}
            aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("nome", "name")} />
        </Field>
        <Field id="empresa" label="Empresa" optional>
          <input id="empresa" name="company" type="text" autoComplete="organization" value={values.company}
            onChange={(e) => set("company", e.target.value)} className={inputClass} />
        </Field>
        <Field id="email" label="E-mail" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required value={values.email}
            onChange={(e) => set("email", e.target.value)} className={inputClass}
            aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email", "email")} />
        </Field>
        <Field id="whatsapp" label="WhatsApp" optional error={errors.whatsapp} hint="Com DDD. Ex.: (11) 99999-9999">
          <input id="whatsapp" name="whatsapp" type="tel" autoComplete="tel" inputMode="tel" value={values.whatsapp}
            onChange={(e) => set("whatsapp", e.target.value)} className={inputClass}
            aria-invalid={Boolean(errors.whatsapp)} aria-describedby={describedBy("whatsapp", "whatsapp", true)} />
        </Field>
      </div>

      <fieldset aria-describedby={errors.services ? "servicos-erro" : undefined}>
        <legend id="servicos" tabIndex={-1} className="text-sm font-semibold">Serviço desejado <span className="font-normal text-mute">(escolha uma ou mais áreas)</span></legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {serviceOptions.map((opt) => {
            const checked = values.services.includes(opt.id);
            const inputId = `servico-${opt.id}`;
            return (
              <div key={opt.id}>
                <input id={inputId} type="checkbox" className="peer sr-only" checked={checked} onChange={() => toggleService(opt.id)} />
                <label
                  htmlFor={inputId}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-[0.92rem] transition-colors",
                    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan",
                    checked ? "border-blue bg-blue/15 text-paper" : "border-line-strong text-mute hover:border-paper/50",
                    errors.services && !checked && "border-danger/70",
                  )}
                >
                  {checked ? <Check size={16} aria-hidden="true" className="text-cyan" /> : null}
                  {opt.label}
                </label>
              </div>
            );
          })}
        </div>
        {errors.services ? (
          <p id="servicos-erro" className="mt-2 flex items-start gap-1.5 text-sm text-danger">
            <TriangleAlert size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
            <span>{errors.services}</span>
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="tipo" label="Tipo de projeto" error={errors.projectType}>
          <select id="tipo" name="projectType" required value={values.projectType} onChange={(e) => set("projectType", e.target.value)}
            className={inputClass} aria-invalid={Boolean(errors.projectType)} aria-describedby={describedBy("tipo", "projectType")}>
            <option value="">Selecione</option>
            {projectTypeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="prazo" label="Prazo desejado" optional>
          <select id="prazo" name="deadline" value={values.deadline} onChange={(e) => set("deadline", e.target.value)} className={inputClass}>
            <option value="">Selecione</option>
            {deadlineOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      <Field id="descricao" label="Descrição do projeto" error={errors.description} hint="Conte o que você quer fazer, para quem e o que já existe hoje. Mínimo de 20 caracteres.">
        <textarea id="descricao" name="description" rows={6} required maxLength={3000} value={values.description}
          onChange={(e) => set("description", e.target.value)} className={cn(inputClass, "resize-y")}
          aria-invalid={Boolean(errors.description)} aria-describedby={describedBy("descricao", "description", true)} />
      </Field>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="investimento" label="Faixa de investimento" optional>
          <select id="investimento" name="budget" value={values.budget} onChange={(e) => set("budget", e.target.value)} className={inputClass}>
            <option value="">Selecione</option>
            {budgetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="origem" label="Como conheceu a Visoria?" optional>
          <select id="origem" name="source" value={values.source} onChange={(e) => set("source", e.target.value)} className={inputClass}>
            <option value="">Selecione</option>
            {sourceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      {/* Campo isca contra robôs: invisível e fora da ordem de tabulação. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input id="consentimento" name="consent" type="checkbox" checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-1 size-5 shrink-0 accent-blue" aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consentimento-erro" : undefined} />
          <label htmlFor="consentimento" className="text-sm text-mute">
            Li e aceito a{" "}
            <Link href={siteConfig.legal.privacyHref} target="_blank" className="text-cyan underline underline-offset-2">
              Política de Privacidade<span className="sr-only"> (abre em nova aba)</span>
            </Link>{" "}
            e autorizo o uso dos dados informados para retorno sobre este orçamento.
          </label>
        </div>
        {errors.consent ? (
          <p id="consentimento-erro" className="mt-2 flex items-start gap-1.5 text-sm text-danger">
            <TriangleAlert size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
            <span>{errors.consent}</span>
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <div role="alert" className="rounded-xl border border-danger/60 bg-danger/10 p-5 text-sm">
          <p className="font-semibold">{serverMessage}</p>
          {whatsappUrl || mailtoUrl ? (
            <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              {whatsappUrl ? <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-cyan underline underline-offset-2">Falar pelo WhatsApp<span className="sr-only"> (abre em nova aba)</span></a> : null}
              {mailtoUrl ? <a href={mailtoUrl} className="text-cyan underline underline-offset-2">Enviar por e-mail</a> : null}
            </p>
          ) : null}
        </div>
      ) : null}

      <div>
        <p className="mb-3 text-sm text-mute">Escolha como enviar seu pedido:</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            onClick={() => { channel.current = "email"; }}
            disabled={status === "submitting"}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue px-8 py-3 font-semibold text-ink transition-colors hover:bg-cyan disabled:cursor-wait disabled:opacity-70 sm:w-auto"
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={18} aria-hidden="true" className="animate-spin" />
                Enviando…
              </>
            ) : (
              <>
                <Mail size={18} aria-hidden="true" />
                Enviar por e-mail
              </>
            )}
          </button>
          <button
            type="submit"
            onClick={() => { channel.current = "whatsapp"; }}
            disabled={status === "submitting"}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-line-strong px-8 py-3 font-semibold transition-colors hover:border-cyan hover:text-cyan disabled:opacity-70 sm:w-auto"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Enviar pelo WhatsApp
          </button>
        </div>
      </div>
    </form>
  );
}
