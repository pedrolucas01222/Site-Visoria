import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Logotipo compacto para cabeçalho: símbolo + wordmark (wordmark some em telas muito pequenas). */
export function Logo({ priority = false }: { priority?: boolean }) {
  const { symbol, wordmark } = siteConfig.logo;
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${siteConfig.name} — página inicial`}>
      <Image
        src={symbol.src}
        width={symbol.width}
        height={symbol.height}
        alt=""
        priority={priority}
        className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
      />
      <span className="hidden min-[400px]:flex flex-col leading-none">
        <Image src={wordmark.src} width={wordmark.width} height={wordmark.height} alt="" priority={priority} className="h-[0.95rem] w-auto" />
        <span className="mt-1.5 block text-[0.6rem] tracking-[0.55em] text-mute" aria-hidden="true">
          STUDIO
        </span>
      </span>
    </Link>
  );
}
