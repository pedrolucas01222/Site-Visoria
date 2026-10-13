import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.98] focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary: "bg-blue text-ink hover:bg-cyan",
  secondary: "border border-line-strong text-paper hover:border-cyan hover:text-cyan",
  ghost: "px-2 text-paper underline decoration-line-strong decoration-1 underline-offset-8 hover:decoration-cyan hover:text-cyan",
};

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Links externos abrem em nova aba com rel seguro. */
  external?: boolean;
  ariaLabel?: string;
}

export function ButtonLink({ href, children, variant = "primary", className, external, ariaLabel }: ButtonLinkProps) {
  const classes = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
