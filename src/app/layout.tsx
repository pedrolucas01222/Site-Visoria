import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import { getSocialLinks } from "@/lib/contact-links";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Design, tecnologia e audiovisual`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `Logotipo ${siteConfig.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.colors.background,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Dados estruturados apenas com informações reais e configuradas (sem endereço, telefone ou avaliações).
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo-full.png`,
    description: siteConfig.description,
    ...(getSocialLinks().length ? { sameAs: getSocialLinks().map((s) => s.href) } : {}),
  };

  return (
    <html lang={siteConfig.language} className={`${sora.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only z-[60] rounded-full bg-blue px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Ir para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
