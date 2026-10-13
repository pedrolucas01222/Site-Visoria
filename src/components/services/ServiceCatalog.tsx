"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ServiceItem } from "@/components/services/ServiceItem";
import { serviceCategories } from "@/data/services";
import { cn } from "@/lib/utils";

type Filter = "todas" | (typeof serviceCategories)[number]["id"];

export function ServiceCatalog() {
  const [filter, setFilter] = useState<Filter>("todas");
  const shown = filter === "todas" ? serviceCategories : serviceCategories.filter((c) => c.id === filter);
  const options = [
    { id: "todas" as const, label: "Todas as áreas" },
    ...serviceCategories.map((c) => ({ id: c.id, label: c.id === "complementary" ? "Complementares" : c.brand })),
  ];

  return (
    <Container className="py-16 sm:py-24">
      <div role="group" aria-label="Filtrar serviços por área" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {options.map((o) => {
          const pressed = filter === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={pressed}
              onClick={() => setFilter(o.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-full border px-5 text-[0.95rem] font-medium transition-colors",
                pressed ? "border-blue bg-blue text-ink" : "border-line-strong text-mute hover:border-cyan hover:text-cyan",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      <p className="mt-5 text-sm text-mute">Escolha um serviço para abrir o formulário de orçamento já com ele preenchido.</p>

      <div className="mt-14 space-y-24">
        {shown.map((cat) => (
          <section key={cat.id} id={cat.id} aria-labelledby={`${cat.id}-titulo`} className="grid gap-10 lg:grid-cols-[0.85fr_1.6fr] lg:gap-20">
            <header className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex size-14 items-center justify-center rounded-xl border border-line-strong text-cyan">
                <Icon name={cat.icon} size={26} />
              </div>
              <h2 id={`${cat.id}-titulo`} className="mt-6 font-display text-3xl font-semibold sm:text-4xl">
                {cat.brand}
              </h2>
              <p className="mt-1 text-cyan">{cat.title}</p>
              <p className="mt-4 text-mute">{cat.shortDescription}</p>
              {cat.note ? (
                <p className="mt-6 flex gap-3 rounded-xl border border-line-strong bg-ink-2 p-4 text-sm text-paper/90">
                  <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-cyan" />
                  <span>{cat.note}</span>
                </p>
              ) : null}
              <ButtonLink href={`/contato?servico=${cat.id}#formulario`} variant="secondary" className="mt-8">
                Solicitar orçamento
              </ButtonLink>
            </header>

            <ul className="grid gap-x-10 border-t border-line sm:grid-cols-2">
              {cat.items.map((item) => (
                <li key={item}>
                  <ServiceItem categoryId={cat.id} categoryLabel={cat.brand} title={item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Container>
  );
}
