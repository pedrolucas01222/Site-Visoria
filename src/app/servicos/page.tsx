import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceCatalog } from "@/components/services/ServiceCatalog";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Catálogo de serviços da Visória Studio: design e identidade visual, audiovisual, sites e e-commerce, marketing e tecnologia.",
  alternates: { canonical: "/servicos" },
  openGraph: { url: "/servicos", title: "Serviços | VISÓRIA Studio" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Serviços para marcas que querem ir além do básico.">
        Do logotipo ao sistema, do vídeo à campanha. Navegue pelas áreas da Visória e escolha o ponto de partida do seu projeto.
      </PageHero>
      <ServiceCatalog />
      <FinalCta />
    </>
  );
}
