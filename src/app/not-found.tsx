import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-24">
      <div className="hairline-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <p className="font-display text-[clamp(5rem,20vw,12rem)] font-semibold leading-none text-blue" aria-hidden="true">404</p>
        <h1 className="mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold">
          Essa página não existe ou foi movida.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-mute">Verifique o endereço ou volte para um destes caminhos.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Voltar ao início</ButtonLink>
          <ButtonLink href="/servicos" variant="secondary">Conhecer os serviços</ButtonLink>
          <ButtonLink href="/contato" variant="ghost">Falar com a Visória</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
