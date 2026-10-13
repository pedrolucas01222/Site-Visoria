import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { intro } from "@/data/content";

export function Intro() {
  return (
    <section className="border-t border-line py-24 sm:py-32" aria-labelledby="intro-titulo">
      <Container className="grid gap-12 lg:grid-cols-12">
        <h2 id="intro-titulo" className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold lg:col-span-7">
          {intro.title}
        </h2>
        <div className="lg:col-span-5 lg:pt-3">
          <p className="text-lg text-mute sm:text-xl">{intro.text}</p>
          <ButtonLink href="/sobre" variant="ghost" className="mt-6">Conheça a Visoria</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
