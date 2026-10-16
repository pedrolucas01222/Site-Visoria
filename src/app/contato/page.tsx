import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { InstagramButton } from "@/components/ui/InstagramButton";
import { ContactForm } from "@/components/contact/ContactForm";
import { serviceOptions } from "@/data/services";
import { siteConfig } from "@/config/site";
import { getMailtoUrl, getWhatsAppUrl } from "@/lib/contact-links";

export const metadata: Metadata = {
  title: "Contato e orçamento",
  description:
    "Conte sobre seu projeto e solicite um orçamento à Visória Studio: identidade visual, sites, vídeos, marketing, sistemas e consultoria.",
  alternates: { canonical: "/contato" },
  openGraph: { url: "/contato", title: "Contato e orçamento | VISÓRIA Studio" },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const validIds = new Set<string>(serviceOptions.map((s) => s.id));
  const servico = first(params.servico);
  const item = first(params.item)?.slice(0, 120).replace(/[\r\n]+/g, " ");

  const initialServices = servico && validIds.has(servico) ? [servico] : [];
  const initialMessage = item ? `Tenho interesse em: ${item}.\n\n` : "";

  const whatsappUrl = getWhatsAppUrl();
  const mailtoUrl = getMailtoUrl();

  return (
    <>
      <PageHero title="Conte sobre sua ideia.">
        Quanto mais contexto você der, melhor conseguimos entender o projeto. Preencha o formulário ou use um dos canais diretos.
      </PageHero>

      <Container className="grid gap-16 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.4fr] lg:gap-24">
        <aside className="space-y-10" aria-label="Canais de contato">
          <div>
            <h2 className="font-display text-2xl font-semibold">Canais diretos</h2>
            <div className="mt-5 flex flex-col items-start gap-3">
              <WhatsAppButton variant="secondary" />
              <InstagramButton variant="secondary" />
              {mailtoUrl ? (
                <a href={mailtoUrl} className="inline-flex min-h-12 items-center gap-2 text-paper underline decoration-line-strong underline-offset-8 transition-colors hover:text-cyan">
                  <Mail size={18} aria-hidden="true" />
                  {siteConfig.contact.email}
                </a>
              ) : null}
            </div>
            {!whatsappUrl && !mailtoUrl ? (
              <p className="mt-4 text-sm text-mute">Use o formulário para enviar seu pedido.</p>
            ) : null}
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold">O que acontece depois</h2>
            <ol className="mt-5 space-y-4 text-mute">
              <li>Analisamos as informações do seu projeto.</li>
              <li>Entramos em contato para tirar dúvidas e alinhar o escopo.</li>
              <li>Enviamos uma proposta com etapas, prazos e valores.</li>
            </ol>
          </div>
        </aside>

        <section id="formulario" aria-labelledby="form-titulo">
          <h2 id="form-titulo" className="mb-8 font-display text-3xl font-semibold">Solicitar orçamento</h2>
          <ContactForm
            key={`${servico ?? ""}|${item ?? ""}`}
            initialServices={initialServices}
            initialMessage={initialMessage}
            whatsappUrl={whatsappUrl}
            mailtoUrl={mailtoUrl}
          />
        </section>
      </Container>
    </>
  );
}
