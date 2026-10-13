"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { navLinks } from "@/config/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open ? "border-b border-line bg-ink/85 backdrop-blur-md" : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between">
        <Logo priority />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[0.95rem] font-medium transition-colors hover:text-cyan",
                      active ? "text-paper" : "text-mute",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-cyan after:transition-transform after:duration-300",
                      active && "after:scale-x-100",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="/contato#formulario" className="hidden min-h-11 px-5 py-2 sm:inline-flex">
            Solicitar orçamento
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="flex size-11 items-center justify-center rounded-full border border-line-strong text-paper transition-colors hover:border-cyan hover:text-cyan lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movel"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div id="menu-movel" className="lg:hidden">
          <nav aria-label="Menu móvel" className="h-[calc(100dvh-4.5rem)] overflow-y-auto bg-ink px-5 pb-10 pt-6 sm:px-8">
            <ul className="flex flex-col">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href} className="border-b border-line">
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-16 items-center font-display text-3xl font-semibold",
                        active ? "text-cyan" : "text-paper",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ButtonLink href="/contato#formulario" className="mt-8 w-full" variant="primary">
              Solicitar orçamento
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
