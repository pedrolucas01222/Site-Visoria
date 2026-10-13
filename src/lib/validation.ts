import { serviceOptions } from "@/data/services";

export const projectTypeOptions = [
  "Novo projeto",
  "Reformulação de algo existente",
  "Manutenção ou continuidade",
  "Consultoria ou diagnóstico",
  "Ainda não sei",
] as const;

export const deadlineOptions = [
  "Urgente (até 2 semanas)",
  "Até 1 mês",
  "De 1 a 3 meses",
  "Sem prazo definido",
] as const;

export const budgetOptions = [
  "Prefiro conversar sobre isso",
  "Até R$ 1.000",
  "R$ 1.000 a R$ 3.000",
  "R$ 3.000 a R$ 8.000",
  "R$ 8.000 a R$ 20.000",
  "Acima de R$ 20.000",
] as const;

export const sourceOptions = [
  "Instagram",
  "Google",
  "Indicação",
  "WhatsApp",
  "LinkedIn",
  "Outro",
] as const;

export interface ContactPayload {
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
  /** Campo isca: humanos não preenchem. */
  website: string;
  /** Timestamp (ms) de quando o formulário foi exibido. */
  startedAt: number;
}

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/;
const validServiceIds = new Set<string>(serviceOptions.map((s) => s.id));

function oneOf(value: string, list: readonly string[]): boolean {
  return list.includes(value);
}

/** Valida e normaliza. Usado no navegador (UX) e no servidor (segurança). */
export function validateContact(input: unknown): { data?: ContactPayload; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const raw = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const str = (key: string, max: number) =>
    (typeof raw[key] === "string" ? (raw[key] as string) : "").replace(/\r\n/g, "\n").trim().slice(0, max);

  const data: ContactPayload = {
    name: str("name", 120),
    company: str("company", 120),
    email: str("email", 200).toLowerCase(),
    whatsapp: str("whatsapp", 30),
    services: Array.isArray(raw.services)
      ? (raw.services as unknown[]).filter((s): s is string => typeof s === "string").slice(0, 12)
      : [],
    projectType: str("projectType", 80),
    description: str("description", 3000),
    deadline: str("deadline", 80),
    budget: str("budget", 80),
    source: str("source", 80),
    consent: raw.consent === true,
    website: str("website", 200),
    startedAt: typeof raw.startedAt === "number" ? raw.startedAt : 0,
  };

  if (data.name.length < 2) errors.name = "Informe seu nome (mínimo de 2 caracteres).";
  if (!data.email) errors.email = "Informe seu e-mail.";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Informe um e-mail válido, como nome@empresa.com.br.";

  if (data.whatsapp) {
    const digits = data.whatsapp.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) {
      errors.whatsapp = "Informe o WhatsApp com DDD, por exemplo (11) 99999-9999.";
    }
  }

  if (data.services.length === 0) errors.services = "Selecione ao menos uma área de interesse.";
  else if (!data.services.every((s) => validServiceIds.has(s))) errors.services = "Seleção de serviço inválida.";

  if (!oneOf(data.projectType, projectTypeOptions)) errors.projectType = "Escolha o tipo de projeto.";

  if (data.description.length < 20) {
    errors.description = "Descreva seu projeto com pelo menos 20 caracteres.";
  }

  if (data.deadline && !oneOf(data.deadline, deadlineOptions)) errors.deadline = "Prazo inválido.";
  if (data.budget && !oneOf(data.budget, budgetOptions)) errors.budget = "Faixa de investimento inválida.";
  if (data.source && !oneOf(data.source, sourceOptions)) errors.source = "Opção inválida.";

  if (!data.consent) errors.consent = "Para enviar, é necessário aceitar a Política de Privacidade.";

  return Object.keys(errors).length ? { errors } : { data, errors };
}
