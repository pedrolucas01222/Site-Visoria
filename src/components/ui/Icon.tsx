import { Clapperboard, Compass, Cpu, Globe, Layers, Megaphone, Palette, type LucideProps } from "lucide-react";
import type { IconName } from "@/types";

const icons = {
  palette: Palette,
  clapperboard: Clapperboard,
  globe: Globe,
  megaphone: Megaphone,
  cpu: Cpu,
  compass: Compass,
  layers: Layers,
} as const;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" strokeWidth={1.5} {...props} />;
}
