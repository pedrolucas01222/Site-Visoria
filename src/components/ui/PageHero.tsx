import { Container } from "@/components/ui/Container";

/** Abertura padrão das páginas internas. Cada página tem exatamente um h1. */
export function PageHero({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-36 pb-16 sm:pt-44 sm:pb-24">
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <Container className="relative">
        <h1 className="rise max-w-4xl font-display text-[clamp(2.4rem,7vw,5.25rem)] font-semibold">{title}</h1>
        {children ? (
          <div className="rise mt-6 max-w-2xl text-lg text-mute sm:text-xl" style={{ "--d": "120ms" } as React.CSSProperties}>
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
