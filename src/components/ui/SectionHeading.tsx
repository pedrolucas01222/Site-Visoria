import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  children,
  as: Tag = "h2",
  className,
}: {
  title: string;
  children?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Tag className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold">{title}</Tag>
      {children ? <div className="mt-5 max-w-2xl text-lg text-mute">{children}</div> : null}
    </div>
  );
}
