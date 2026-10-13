import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
}) {
  return <Tag className={cn("mx-auto w-full max-w-[86rem] px-5 sm:px-8 lg:px-12", className)}>{children}</Tag>;
}
