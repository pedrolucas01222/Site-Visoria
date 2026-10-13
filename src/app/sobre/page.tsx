import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Process } from "@/components/home/Process";
import { FinalCta } from "@/components/home/FinalCta";
import { about } from "@/data/content";
import { mainAreas } from "@/data/services";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a Visoria Studio: propósito, visão de futuro, valores e filosofia de trabalho de um estúdio que une criatividade, comunicação e tecnologia.",
  alternates: { canonical: "/sobre" },
  openGraph: { url: "/sobre", title: "Sobre | VISORIA Studio" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="Criatividade, comunicação e tecnologia no mesmo lugar." />

      <section className="py-20 sm:py-28" aria-label="Apresentação">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 text-lg text-mute sm:text-xl lg:col-span-7">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28" aria-label="Propósito e visão">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Propósito</h2>
            <p className="mt-5 text-lg text-mute">{about.purpose}</p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Visão de futuro</h2>
            <p className="mt-5 text-lg text-mute">{about.vision}</p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-ink-2 py-20 sm:py-28" aria-labelledby="valores">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
          <h2 id="valores" className="font-display text-3xl font-semibold sm:text-4xl lg:sticky lg:top-28 lg:self-start">
            Valores
          </h2>
          <ul className="border-t border-line">
            {about.values.map((v) => (
              <li key={v.title} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <h3 className="font-display text-xl font-semibold">{v.title}</h3>
                <p className="text-mute">{v.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28" aria-labelledby="filosofia">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
          <h2 id="filosofia" className="font-display text-3xl font-semibold sm:text-4xl lg:sticky lg:top-28 lg:self-start">
            Filosofia de trabalho
          </h2>
          <div className="max-w-2xl space-y-6 text-lg text-mute">
            {about.philosophy.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28" aria-labelledby="areas-sobre">
        <Container>
          <h2 id="areas-sobre" className="font-display text-3xl font-semibold sm:text-4xl">Áreas de atuação</h2>
          <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {mainAreas.map((a) => (
              <li key={a.id}>
                <Link href={`/servicos#${a.id}`} className="group flex items-start gap-4 border-t border-line py-6 transition-colors hover:border-cyan">
                  <span className="text-cyan"><Icon name={a.icon} size={24} /></span>
                  <span>
                    <span className="block font-display text-xl font-semibold transition-colors group-hover:text-cyan">{a.brand}</span>
                    <span className="mt-1 block text-sm text-mute">{a.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Process />

      <section className="border-t border-line py-20 sm:py-28" aria-labelledby="compromisso">
        <Container>
          <h2 id="compromisso" className="max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Compromisso com qualidade, clareza e evolução.
          </h2>
          <ul className="mt-12 grid gap-x-10 md:grid-cols-3">
            {about.commitments.map((c) => (
              <li key={c.title} className="border-t border-line py-6">
                <h3 className="font-display text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-mute">{c.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
