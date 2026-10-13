import { Container } from "@/components/ui/Container";
import { processSteps } from "@/data/content";

export function Process() {
  return (
    <section className="border-t border-line bg-ink-2 py-24 sm:py-32" aria-labelledby="processo-titulo">
      <Container>
        <h2 id="processo-titulo" className="max-w-2xl font-display text-[clamp(2rem,4.6vw,3.5rem)] font-semibold">
          Um processo claro, do primeiro contato à entrega.
        </h2>
        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {processSteps.map((step, i) => (
            <li key={step.title} className="relative border-t border-line-strong pt-6 lg:pr-8">
              <span aria-hidden="true" className="absolute -top-[5px] left-0 size-2.5 rounded-full bg-cyan" />
              <span className="font-display text-5xl font-semibold text-blue" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold">
                <span className="sr-only">Etapa {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 text-mute">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
