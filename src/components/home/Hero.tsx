import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { HeroVisual } from "@/components/home/HeroVisual";
import { hero } from "@/data/content";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-12 lg:pt-24">
      <div className="hairline-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <Container className="grid items-center gap-12 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-0">
        <div>
          <h1 className="font-display text-[clamp(2.6rem,7.4vw,6rem)] font-semibold leading-[1.02]">
            <span className="rise block" style={delay(100)}>Ideias que ganham forma.</span>
            <span className="rise mt-1 block bg-gradient-to-r from-blue to-cyan bg-clip-text text-transparent" style={delay(260)}>
              Marcas que vão além.
            </span>
          </h1>
          <p className="rise mt-8 max-w-xl text-lg text-mute sm:text-xl" style={delay(480)}>
            {hero.text}
          </p>
          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={delay(640)}>
            <ButtonLink href="/servicos" variant="primary">Conheça nossos serviços</ButtonLink>
            <ButtonLink href="/contato#formulario" variant="secondary">Solicite um orçamento</ButtonLink>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[34rem] lg:max-w-none">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
