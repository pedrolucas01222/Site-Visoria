import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { privacy } from "@/data/content";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Visoria Studio trata os dados pessoais enviados por meio deste site.",
  alternates: { canonical: "/politica-de-privacidade" },
  openGraph: { url: "/politica-de-privacidade", title: "Política de Privacidade | VISORIA Studio" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Política de Privacidade." />
      <Container className="max-w-3xl py-16 sm:py-24">
        <p className="mb-10 flex gap-3 rounded-xl border border-line-strong bg-ink-2 p-4 text-sm">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-cyan" />
          <span>{privacy.updatedAt}</span>
        </p>
        <p className="text-lg text-mute">{privacy.intro}</p>
        <div className="mt-12 space-y-12">
          {privacy.sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
              <div className="mt-3 space-y-4 text-mute">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
