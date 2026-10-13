import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/config/site";
import { mainAreas } from "@/data/services";
import { getMailtoUrl, getSocialLinks, getWhatsAppUrl } from "@/lib/contact-links";

const linkClass = "inline-block py-1.5 text-mute transition-colors hover:text-cyan";

export function Footer() {
  const social = getSocialLinks();
  const whatsapp = getWhatsAppUrl();
  const mailto = getMailtoUrl();
  const { full } = siteConfig.logo;

  return (
    <footer className="border-t border-line bg-ink-2">
      <Container className="grid gap-14 py-16 lg:grid-cols-[1.2fr_2fr] lg:py-20">
        <div>
          <Link href="/" aria-label={`${siteConfig.name} — página inicial`} className="inline-block">
            <Image src={full.src} width={full.width} height={full.height} alt={`Logotipo ${siteConfig.name}`} className="h-auto w-44" />
          </Link>
          <p className="mt-6 max-w-sm text-mute">{siteConfig.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          <nav aria-label="Rodapé: páginas">
            <h2 className="font-display text-base font-semibold">Páginas</h2>
            <ul className="mt-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Rodapé: áreas de atuação">
            <h2 className="font-display text-base font-semibold">Áreas de atuação</h2>
            <ul className="mt-3">
              {mainAreas.map((a) => (
                <li key={a.id}>
                  <Link href={`/servicos#${a.id}`} className={linkClass}>{a.brand}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-base font-semibold">Contato</h2>
            <ul className="mt-3">
              <li><Link href="/contato#formulario" className={linkClass}>Solicitar orçamento</Link></li>
              {whatsapp ? (
                <li>
                  <a href={whatsapp} className={linkClass} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </li>
              ) : null}
              {mailto ? (
                <li>
                  <a href={mailto} className={`${linkClass} break-all`}>{siteConfig.contact.email}</a>
                </li>
              ) : null}
            </ul>
          </div>

          {social.length ? (
            <div>
              <h2 className="font-display text-base font-semibold">Redes sociais</h2>
              <ul className="mt-3">
                {social.map((s) => (
                  <li key={s.key}>
                    <a href={s.href} className={linkClass} target="_blank" rel="noopener noreferrer">
                      {s.label}
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-6 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.</p>
          <Link href={siteConfig.legal.privacyHref} className="transition-colors hover:text-cyan">
            Política de Privacidade
          </Link>
        </Container>
      </div>
    </footer>
  );
}
