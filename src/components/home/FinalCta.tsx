import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { InstagramButton } from "@/components/ui/InstagramButton";
import { finalCta } from "@/data/content";
import { siteConfig } from "@/config/site";

export function FinalCta() {
  const { symbol } = siteConfig.logo;
  return (
    <section className="px-0 pb-24 sm:pb-32" aria-labelledby="cta-titulo">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl border border-line-strong bg-ink-2 px-6 py-16 sm:px-12 sm:py-24">
          <Image
            src={symbol.src}
            width={symbol.width}
            height={symbol.height}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-1/2 -z-10 h-[130%] w-auto -translate-y-1/2 opacity-[0.16] sm:right-0 sm:opacity-30"
          />
          <h2 id="cta-titulo" className="max-w-3xl font-display text-[clamp(2.2rem,6vw,4.75rem)] font-semibold">
            {finalCta.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-mute sm:text-xl">{finalCta.text}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contato#formulario">Solicitar orçamento</ButtonLink>
            <WhatsAppButton />
            <InstagramButton variant="secondary" />
          </div>
        </div>
      </Container>
    </section>
  );
}
