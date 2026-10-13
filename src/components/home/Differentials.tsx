import { Container } from "@/components/ui/Container";
import { differentials } from "@/data/content";

export function Differentials() {
  return (
    <section className="border-t border-line py-24 sm:py-32" aria-labelledby="diferenciais-titulo">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
        <div>
          <h2 id="diferenciais-titulo" className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-semibold">
            Como trabalhamos.
          </h2>
          <p className="mt-5 max-w-sm text-lg text-mute">
            Não prometemos resultados garantidos. Prometemos método, transparência e cuidado em cada entrega.
          </p>
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {differentials.map((d) => (
            <li key={d.title} className="border-t border-line py-7">
              <h3 className="font-display text-xl font-semibold">{d.title}</h3>
              <p className="mt-2 text-mute">{d.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
