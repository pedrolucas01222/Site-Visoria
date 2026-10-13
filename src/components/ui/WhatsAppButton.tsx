import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/contact-links";

/**
 * Abre o WhatsApp com a mensagem predefinida quando NEXT_PUBLIC_WHATSAPP_NUMBER está configurado.
 * Enquanto o número não existir, leva ao formulário de contato (nunca a um link quebrado).
 */
export function WhatsAppButton({
  label = "Falar pelo WhatsApp",
  variant = "secondary",
  className,
}: {
  label?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const url = getWhatsAppUrl();
  return (
    <ButtonLink
      href={url ?? "/contato#formulario"}
      external={Boolean(url)}
      variant={variant}
      className={className}
      ariaLabel={url ? `${label} (abre em nova aba)` : `${label}: indisponível, use o formulário de contato`}
    >
      <MessageCircle size={18} aria-hidden="true" />
      {label}
    </ButtonLink>
  );
}
