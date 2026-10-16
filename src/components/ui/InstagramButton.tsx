import { Instagram } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { getSocialLinks } from "@/lib/contact-links";

/** Link para o Instagram da Visória (some automaticamente se a URL não estiver configurada). */
export function InstagramButton({
  label = "Ver no Instagram",
  variant = "ghost",
  className,
}: {
  label?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const link = getSocialLinks().find((s) => s.key === "instagram");
  if (!link) return null;
  return (
    <ButtonLink href={link.href} external variant={variant} className={className} ariaLabel={`${label} (abre em nova aba)`}>
      <Instagram size={18} aria-hidden="true" />
      {label}
    </ButtonLink>
  );
}
