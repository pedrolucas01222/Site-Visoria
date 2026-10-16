import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Areas } from "@/components/home/Areas";
import { Process } from "@/components/home/Process";
import { Differentials } from "@/components/home/Differentials";
import { FinalCta } from "@/components/home/FinalCta";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — Design, tecnologia e audiovisual` },
  description:
    "A Visória Studio une design, tecnologia e audiovisual para criar marcas, sites, vídeos e soluções digitais. Solicite um orçamento.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Areas />
      <Process />
      <Differentials />
      <FinalCta />
    </>
  );
}
