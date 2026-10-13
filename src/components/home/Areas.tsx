import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { mainAreas } from "@/data/services";

export function Areas() {
  return (
    <section className="border-t border-line bg-ink-2 py-24 sm:py-32" aria-labelledby="areas-titulo">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="areas-titulo" className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-semibold">
            Cinco áreas, uma mesma direção.
          </h2>
          <p className="mt-5 max-w-sm text-lg text-mute">
            Cada projeto pode combinar áreas diferentes, porque marca, conteúdo e tecnologia funcionam melhor quando
            são pensados juntos.
          </p>
        </div>

        <ul className="border-t border-line">
          {mainAreas.map((area) => (
            <li key={area.id} className="group relative border-b border-line">
              <div className="grid gap-5 py-8 transition-colors duration-300 group-hover:bg-paper/[0.02] sm:grid-cols-[3.5rem_1fr] sm:gap-8 sm:px-4 sm:py-10">
                <div className="flex size-14 items-center justify-center rounded-xl border border-line-strong text-cyan transition-colors duration-300 group-hover:border-cyan">
                  <Icon name={area.icon} size={26} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold sm:text-3xl">
                    <Link href={`/servicos#${area.id}`} className="after:absolute after:inset-0 after:content-['']">
                      {area.brand}
                      <span className="sr-only">: ver serviços completos</span>
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-cyan">{area.title}</p>
                  <p className="mt-3 max-w-xl text-mute">{area.shortDescription}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Serviços de ${area.brand}`}>
                    {area.highlights.map((h) => (
                      <li key={h} className="rounded-full border border-line px-3 py-1 text-sm text-paper/85">
                        {h}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-paper transition-colors group-hover:text-cyan" aria-hidden="true">
                    Ver serviços completos
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
