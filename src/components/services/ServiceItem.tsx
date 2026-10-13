import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceCategoryId } from "@/types";

/**
 * Item reutilizável do catálogo: título (e descrição opcional) com chamada para orçamento.
 * O link leva ao formulário já com a área e o serviço preenchidos.
 */
export function ServiceItem({
  categoryId,
  categoryLabel,
  title,
  description,
}: {
  categoryId: ServiceCategoryId;
  categoryLabel: string;
  title: string;
  description?: string;
}) {
  const href = `/contato?servico=${categoryId}&item=${encodeURIComponent(title)}#formulario`;
  return (
    <Link
      href={href}
      aria-label={`Solicitar orçamento: ${title} (${categoryLabel})`}
      className="group flex min-h-14 items-start justify-between gap-4 border-b border-line py-4 transition-colors hover:border-cyan"
    >
      <span>
        <span className="block text-paper transition-colors group-hover:text-cyan">{title}</span>
        {description ? <span className="mt-1 block text-sm text-mute">{description}</span> : null}
      </span>
      <ArrowUpRight
        size={18}
        aria-hidden="true"
        className="mt-1 shrink-0 text-mute transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan"
      />
    </Link>
  );
}
